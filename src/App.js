import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from './Grid.js'
import Menu from './Menu.js'
import {GOAL, NORMAL, OBSTACLE, START} from "./constants/NodeTypes";

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
        this.lastChanged = null;
        this.setup();

        this.addingEntities = false;
        this.removingEntitues = false;

        this.state = {
            layout: clone(this.layout),
            changingStart: false,
            changingGoal: false,
            addingObstacle: false,

            // type of node that was clicked and could possibly be dragged
            selectedType: null,
            selected: null,

            // what normal nodes should change into
            selectedEntity: OBSTACLE,

            // node currently hovered over
            hovered: null,

            mouseDownPos: [null, null]
        };

        console.log(this.state.layout);

        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.setDraggedOverNode = this.setDraggedOverNode.bind(this);
        this.addSelectedEntityAt = this.addSelectedEntityAt.bind(this);
        this.clearGridObstacles = this.clearGridObstacles.bind(this);
        this.boundMouseDowns = {};
        this.boundMouseUps = {};

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

        if (this.LOG_MOUSEDOWN) {
            console.log("Mousedown");
            console.log(arguments);
        }

        let selected = null;
        let layout = this.state.layout.slice();
        const selectedType = layout[i][j].type;

        // TODO: Add changes for weighted nodes and erasing
        if (selectedType === NORMAL) {
            layout[i] = layout[i].slice();
            layout[i][j] = Object.assign({}, layout[i][j], {type: this.state.selectedEntity});
            this.addingEntities = true;
        }
        else {
            selected = [i, j];
        }

        this.setState({
            layout: layout,
            selectedType: selectedType,
            selected: selected,
            mouseDownPos: [ev.clientX, ev.clientY]
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

            if (row && col) {
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

        this.addingEntities = false;


    }

    /**
     * Simulates hovering over a node when the mouse moves off of the grid while
     * dragging another node.
     *
     * @param row
     * @param col
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

        console.log(this.addingEntities);

        if (!this.addingEntities) return;

        let currNodeType = this.state.layout[i][j].type;
        console.log(currNodeType);

        if (currNodeType === NORMAL) {
            let layout = this.state.layout.slice()
            layout[i] = layout[i].slice()

            layout[i][j] = Object.assign({},
                layout[i][j],
                {type: this.state.selectedEntity})

            this.setState({
                layout: layout
            })
        }
    }


    // #####################################################################
    // #####################################################################

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

    // #                                                                   #
    // #####################################################################
    render() {
        return (
          <div id={"main"}>
            <Grid
                rows={this.ROWS}
                cols={this.COLS}
                nodeSize={this.NODESIZE}
                handleMouseDown={this.handleMouseDown}
                handleMouseUp={this.handleMouseUp}
                setDraggedOverNode={this.setDraggedOverNode}
                addSelectedEntity={this.addSelectedEntityAt}
                layout={this.state.layout}
                draggedOver={this.state.draggedOver}
                selected={this.state.selected}
                selectedType={this.state.selectedType}
                mouseDownPos={this.state.mouseDownPos}
            />
            <Menu
                clearGridObstacles={this.clearGridObstacles}
            />
          </div>


        );
    }

}

export default App;
