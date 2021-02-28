import React from 'react';
import './App.css';
import Grid from './Grid.js'
import Menu from './Menu.js'
import {GOAL, NORMAL, NORMAL as ERASER, OBSTACLE, LO_WEIGHT, MED_WEIGHT, HI_WEIGHT, START} from "./constants/NodeTypes";
import MenuWindow from "./MenuWindow";
import ConfigMenu from "./ConfigMenu";
import EntitySelector from "./EntitySelector";
import {CONFIG, ENTITY_SELECTOR} from "./constants/Submenus";
import {A_STAR, NO_WEIGHTS} from "./constants/Algorithms";
import {EUCLIDEAN} from "./constants/Heuristics";
import {WEIGHTS} from "./constants/EntityNames";
import VisualizationController from "./visualization/VisualizationController";

const clone =  require('rfdc')();


class App extends React.Component {

    // ===============================
    // ===============================
    // =========== DEBUG =============

    LOG_MOUSEOVER = false;
    LOG_MOUSEDOWN = false;
    LOG_MOUSEMOVE = false;
    LOG_MOUSEOUT = false;
    LOG_MOUSEUP = true;

    // ================================

    constructor(props) {
        super(props);

        this.ROWS = 20;
        this.COLS = 30;
        this.NODESIZE = 30;

        this.startNode = [5, 15];
        this.goalNode = [19, 29];
        this.layout = [];
        this.setup();

        this.addingEntities = false;
        this.removingEntities = false;

        this.currentSubmenuName = null;


        this.state = {
            layout: clone(this.layout),

            // type of node that was clicked and could possibly be dragged
            selectedType: null,
            selected: null,

            userOptions: {
                selectedEntity: OBSTACLE,
                selectedAlgorithm: A_STAR,
                selectedHeuristic: EUCLIDEAN,
                useHeatMap: false,
                selectedHeatMap: null,
                visitDiagonals: true
            },

            mouseDownPos: [null, null],

            // menu control
            menuOpen: false,
            currentSubmenu: null,

            addingEntities: false,
            removingEntities: false

        };


        console.log(this.state.layout);

        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.setDraggedOverNode = this.setDraggedOverNode.bind(this);
        this.addSelectedEntityAt = this.addSelectedEntityAt.bind(this);
        this.removeEntityAt = this.removeEntityAt.bind(this);
        this.clearGridObstacles = this.clearGridObstacles.bind(this);
        this.closeSubmenu = this.closeSubmenu.bind(this);
        this.handleSubmenuChange = this.handleSubmenuChange.bind(this);
        this.updateUserOptions = this.updateUserOptions.bind(this);
        this.renderEntitySelector = this.renderEntitySelector.bind(this);
        this.renderConfigMenu = this.renderConfigMenu.bind(this);
        this.updateVisualizationFrame = this.updateVisualizationFrame.bind(this);
        this.initializeVisualization = this.initializeVisualization.bind(this);
        this.runAlgorithm = this.runAlgorithm.bind(this);

        this.visualizationController = new VisualizationController(this.updateVisualizationFrame);

        this.submenuComponents = new Map(
            [
                [CONFIG, this.renderConfigMenu],
                [ENTITY_SELECTOR, this.renderEntitySelector]
            ]
        );

        window.addEventListener('mouseup', this.handleMouseUp);
    }

    // TODO: Give default grid as prop
    setup() {
        console.log("Setup");

        for (let row = 0; row < this.ROWS; row++) {
            let currRow = [];
            for (let col = 0; col < this.COLS; col++) {
                currRow.push({
                    x: col * this.NODESIZE,
                    y: row * this.NODESIZE,
                    ox: col * this.NODESIZE,
                    oy: row * this.NODESIZE,
                    type: NORMAL,
                    hovering: false,
                    dragged: false,
                    row: row,
                    col: col
                });
            }
            this.layout.push(currRow);
        }

        let [i, j]  = this.startNode;
        this.layout[i][j].type = START;

        [i, j] = this.goalNode;
        this.layout[i][j].type = GOAL;
        console.log(this.layout)
    }

    // #################################################################
    // #                   * Layout Update Methods *                   #
    // #################################################################
    // TODO: Move to Redux

    handleMouseDown(i, j, ev) {

        //TODO: Set adding/removingEntities while processing result from EntitySelector

        if (this.LOG_MOUSEDOWN) {
            console.log("Mousedown");
            console.log(arguments);
        }

        let selected = null;
        let addingEntities = this.state.addingEntities;
        let removingEntities = this.state.removingEntities;
        let layout = this.state.layout.slice();
        const selectedType = layout[i][j].type;

        // TODO: Add changes for weighted nodes and erasing
        if (selectedType === NORMAL
            && this.state.userOptions.selectedEntity !== ERASER) {
            // layout[i] = layout[i].slice();
            // layout[i][j] = Object.assign({}, layout[i][j], {type: this.state.userOptions.selectedEntity});
            this.addSelectedEntityAt(i, j);

            addingEntities = true;
        }
        else if (selectedType !== GOAL && selectedType !== START &&
            this.state.userOptions.selectedEntity === ERASER) {

            this.removeEntityAt(i, j);

            removingEntities = true;

        }
        else {
            selected = [i, j];
        }

        this.setState({
            // layout: layout,
            selectedType: selectedType,
            selected: selected,
            mouseDownPos: [ev.clientX, ev.clientY],
            addingEntities: addingEntities,
            removingEntities: removingEntities
        });
    }

    handleMouseUp(ev, row = null, col = null) {
        if (this.LOG_MOUSEUP) {
            console.log("Mouseup");
            console.log(arguments);
        }

        const selectedType = this.state.selectedType;

        if (this.state.selected) {

            console.log("row", row);
            console.log("col", col);
            console.log(row && col);

            let i, j;

            if (row !== null && col !== null) {
                [i, j] = [row, col];
            }
            else {
                [i, j] = this.state.draggedOver;
            }

            let layout = this.state.layout.slice();

            console.log(layout[i][j]);

            // TODO: Account for selected in Component state possibly being null
            if (layout[i][j].type === NORMAL) {
                layout[i] = layout[i].slice();
                layout[i][j] = Object.assign({}, layout[i][j],
                    {
                        type: selectedType
                    });

                const [si, sj] = this.state.selected;
                layout[si] = layout[si].slice();
                layout[si][sj] = Object.assign({},
                    layout[si][sj],
                    {
                        type: NORMAL
                    });
            }

            this.setState({
                layout: layout,
                selectedType: null,
                selected: null,
                draggedOver: null
            });
        }

        this.setState({
            addingEntities: false,
            removingEntities: false
        });


    }

    /**
     * Tracks the node along any grid edge that should be hovered over
     * when the mouse moves off of the grid while dragging
     * another node.
     *
     * @param row of Node
     * @param col of Node
     */
    setDraggedOverNode(row, col) {

        let draggedOver = this.state.draggedOver;
        let dragi, dragj;
        if (draggedOver) {
            [dragi, dragj] = draggedOver;
        }


        if (row === this.ROWS - 1 || row === 0||
            col === this.COLS - 1 || col === 0) {

            if (!draggedOver || dragi !== row || dragj !== col) {
                draggedOver = [row, col];
            }

        }
        else if (draggedOver !== null){
            draggedOver = null;
        }

        this.setState({
            draggedOver: draggedOver
        })

    }

    addSelectedEntityAt(i, j) {

        // console.log(this.addingEntities);

        // if (!this.addingEntities) return;

        let currNodeType = this.state.layout[i][j].type;
        console.log(currNodeType);

        if (currNodeType === NORMAL) {
            let layout = this.state.layout.slice()
            layout[i] = layout[i].slice()

            layout[i][j] = Object.assign({},
                layout[i][j],
                {type: this.state.userOptions.selectedEntity})

            this.setState({
                layout: layout
            })
        }
    }

    removeEntityAt(row, col) {

        let currNodeType = this.state.layout[row][col].type;

        console.log(currNodeType);

        if (currNodeType !== NORMAL && currNodeType !== GOAL
            && currNodeType !== START) {

            let layout = this.state.layout.slice()
            layout[row] = layout[row].slice();

            layout[row][col] = Object.assign({}, layout[row][col],
                {type: NORMAL});

            this.setState({
                layout: layout
            });
        }
    }

    updateVisualizationFrame(frameData) {
        let layout = this.state.layout.map(row => {
            return row.slice();
        });

        frameData.forEach(({row, col, type}) => {
            layout[row][col] = Object.assign({}, layout[row][col], {type: type});
        })

        this.setState({
            layout: layout
        });
    }

    initializeVisualization() {
        this.visualizationController.initialize(
            this.state.layout, this.startNode, this.goalNode,
            "Depth First Search")
    }

    runAlgorithm() {
        this.initializeVisualization();
        this.visualizationController.run();
    }

    // #####################################################################
    // #                    * Menu Actions *                               #
    // #####################################################################

    /**
     * Sets the type of a node to NORMAL if it is a weighted node or a wall.
     */
    clearGridObstacles() {
        const obstacles = new Set([OBSTACLE])

        let layout = this.state.layout.map(row => {
            return row.map(node => {
                if (obstacles.has(node.type)) {
                    return Object.assign({}, node, {type: NORMAL});
                }
                else {
                    return node;
                }
            });
        });

        this.setState({
            layout: layout
        });
    }

    usingWeights() {
        return this.state.layout.some(row => {
            return row.some(node => {
                return [LO_WEIGHT, MED_WEIGHT, HI_WEIGHT].includes(node.type);
            });

        });
    }


    closeSubmenu() {
        this.currentSubmenuName = null;
        this.setState({
            menuOpen: false
        });
    }

    handleSubmenuChange(submenuName) {

        console.log(submenuName, this.currentSubmenuName)

        let currSubmenu = this.currentSubmenuName;

        if (submenuName === currSubmenu) {
            this.closeSubmenu();
        }
        else {
            this.currentSubmenuName = submenuName;
            this.setState({
                menuOpen: true,
                currentSubmenu: this.submenuComponents.get(submenuName)()
            });
        }
    }

    renderConfigMenu() {
        return(
            <ConfigMenu
                userOptions={this.state.userOptions}
                updateUserOptions={this.updateUserOptions}
                disabledAlgorithms={
                    this.usingWeights() ?
                        NO_WEIGHTS : []
                }
            />
        )
    }

    renderEntitySelector() {
        return(
            <EntitySelector
                currSelectedEntity={this.state.userOptions.selectedEntity}
                disabledEntities={
                    NO_WEIGHTS.includes(this.state.userOptions.selectedAlgorithm) ?
                        WEIGHTS : []
                }
                updateUserOptions={this.updateUserOptions}
            />
        );
    }

    // ########################################################################
    // #                       * Update User Options *                        #
    // ########################################################################

    updateUserOptions(newUserOptions) {

        this.setState({
            userOptions: Object.assign({}, this.state.userOptions,
                newUserOptions)
        });
    }


    render() {

        let addOrRemove = null;

        if (this.state.addingEntities) {
            addOrRemove = this.addSelectedEntityAt
        }

        else if (this.state.removingEntities) {
            addOrRemove = this.removeEntityAt
        }

        return (
          <div id={"main"}>
            <Menu
                clearGridObstacles={this.clearGridObstacles}
                handleSubmenuChange={this.handleSubmenuChange}
                runAlgorithm={this.runAlgorithm}

            />
            <div className={"editable-container"}>
              <Grid
                rows={this.ROWS}
                cols={this.COLS}
                nodeSize={this.NODESIZE}
                handleMouseDown={this.handleMouseDown}
                handleMouseUp={this.handleMouseUp}
                setDraggedOverNode={this.setDraggedOverNode}
                addSelectedEntity={this.addSelectedEntityAt}
                addOrRemove={addOrRemove}
                layout={this.state.layout}
                draggedOver={this.state.draggedOver}
                selected={this.state.selected}
                selectedType={this.state.selectedType}
                mouseDownPos={this.state.mouseDownPos}
              />
                {
                    this.state.menuOpen &&
                    <MenuWindow closeSubmenu={this.closeSubmenu}>
                        {this.state.currentSubmenu}
                    </MenuWindow>
                }
            </div>
          </div>


        );
    }

}

export default App;
