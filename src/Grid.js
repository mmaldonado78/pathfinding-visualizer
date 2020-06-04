import React from 'react';
import Node from "./Node.js"
import {NORMAL, START, GOAL, OBSTACLE} from "./constants/NodeTypes";

const clone =  require('rfdc')();


class Grid extends React.Component {

    NODESIZE = 30;

    // ===============================
    // ===============================
    // =========== DEBUG =============

    LOG_MOUSEOVER = false;
    LOG_MOUSEDOWN = true;
    LOG_MOUSEMOVE = false;
    LOG_MOUSEOUT = false;
    LOG_MOUSEUP = false;

    // ================================


    constructor(props) {
        super(props);
        this.startNode = [5, 15];
        this.goalNode = [19, 29];
        this.layout = [];
        // console.log(this.layout);
        this.setup();

        this.state = {
            layout: clone(this.layout),
            changingStart: false,
            changingGoal: false,
            addingObstacle: false,

            // type of node that was clicked
            selectedType: null,
            selected: null,

            // what normal nodes should change into
            selectedEntity: OBSTACLE,

            // node currently hovered over
            hovered: null
        };

        console.log(this.state.layout);
        this.hovEnevents = 0;

        // this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.boundMouseDowns = {};
        this.boundMouseUps = {};


    }

    componentDidMount() {
        console.log("Grid mounted");
    }


    // shouldComponentUpdate(nextProps, nextState, nextContext) {
        // console.log("Grid update: " + (this.state.layout !== nextState.layout).toString());
        // console.log(this.state);
        // return (this.state.layout !== nextProps.layout);
    // }

    renderNode(ind) {
        const node = this.state.layout[ind];
        // console.log(node);

        if (!this.boundMouseDowns[ind]) {
            this.boundMouseDowns[ind] = this.handleMouseDown.bind(this, ind);
        }

        if (!this.boundMouseUps[ind]) {
            this.boundMouseUps[ind] = this.handleMouseUp.bind(this, ind);
        }

        return(
            <Node
                key={node.ox.toString() + node.oy.toString()}
                // node={node}
                size={this.NODESIZE}
                x={node.x}
                y={node.y}
                type={node.type}

                onMouseMove={this.handleMouseMove}
                onMouseDown={this.boundMouseDowns[ind]}
                onMouseUp={this.boundMouseUps[ind]}
            />
        );
    }


    // TODO: Give default grid as prop
    setup() {
        console.log("Setup");

        for (let row = 0; row < this.props.rows; row++) {
            // let currRow = [];
            let type = NORMAL;
            for (let node = 0; node < this.props.cols; node++) {
                this.layout.push({
                    x: node * this.NODESIZE,
                    y: row * this.NODESIZE,
                    ox: node * this.NODESIZE,
                    oy: row * this.NODESIZE,
                    type: type,
                    hovering: false,
                    dragged: false
                        });
            }
        }
        let [i, j]  = this.startNode;
        let start = this.flattenCoords(i, j);
        this.layout[start].type = START;

        [i, j] = this.goalNode;
        let goal = this.flattenCoords(i, j);
        this.layout[goal].type = GOAL;
        console.log(this.layout)
    }

    flattenCoords(i, j) {
        return this.props.cols * i + j;
    }

    handleMouseDown(ind, ev) {

        if (this.LOG_MOUSEDOWN) {
            console.log("Mousedown");
            console.log(arguments);
        }
        console.log(ev.clientX, ev.clientY);
        console.log(document.elementFromPoint(ev.clientX, ev.clientY));

        // ev.preventDefault();

        let layout = this.state.layout.slice();

        const selectedType = layout[ind].type;

        // TODO: Add changes for weighted nodes and erasing
        if (selectedType === NORMAL) {
            layout[ind] = Object.assign({}, layout[ind], {type: this.state.selectedEntity})
        }
        // else { // Temporary: prevents changed node from instantly being draggable
        //     layout[this.state.hovered] = Object.assign({}, layout[this.state.hovered], {dragged: true});
        // }

         this.setState({
             layout: layout,
             selectedType: selectedType,
             selected: 0
         });
    }

    handleMouseOver(ind, ev) {
        if (this.LOG_MOUSEOVER) {
            ev.persist();
            console.log("Mouseover");
            console.log(arguments);
        }


        // if (!this.state.selectedType) {
        // }
        // this.updateNodeType();
        // this.handleHoverIn(ind);
        let newType = this.updateNodeType(ind);

        let layout = this.state.layout.slice();
        layout[ind] = Object.assign({}, layout[ind], {hovering: true, type: newType});
        this.setState({hovered: ind, layout: layout});


    }

    handleMouseOut(ind, ev) {
        if (this.LOG_MOUSEOUT) {
            ev.persist();
            console.log("Mouseout");
            console.log(arguments);
        }

        const currentType = this.state.layout[ind].type;
        const newType = (this.state.selectedType === currentType) ? 'normal' : currentType;

        let layout = this.state.layout.slice();
        layout[ind] = Object.assign({}, layout[ind], {hovering: false, type: newType});
        this.setState({layout: layout});

        console.log(`\tUpdating on hover out - Current type: ${currentType}, updated type: ${newType}`);


    }

    handleMouseUp(ind, ev) {
        if (this.LOG_MOUSEUP) {
            console.log("Mouseup");
            console.log(arguments);
        }
        const selectedType = this.state.selectedType;

        if (selectedType) {

            this.setState({
                selectedType: null,
                selected: null
            });
        }


    }

    //TODO: Add mousemove handler for paper instead of each square
    handleMouseMove(ev) {

        if (this.LOG_MOUSEMOVE) {
            console.log("Mousemove");
            ev.persist();
            console.log(arguments);
        }
        if (!this.state.selectedType) return;

        if (this.state.selectedType === 'normal') {
            // TODO: drag and make selectedEntity type nodes
            return
        }


        // ====================================================
        // ====== Drag selected node ============================

        // let layout = this.state.layout.slice();
        // let selected = this.state.selected;
        // layout[selected] = Object.assign({}, layout[selected],
        //     {
        //         x: ev.clientX - 10,
        //         y: ev.clientY - 10
        //     });
        //
        // this.setState({layout: layout});

        // =========================================================

    }

    /**
     * Returns the new type of the node that user hovered over if it should be changed
     * @returns {string|null}
     */
    updateNodeType(ind) {
        const selectedType = this.state.selectedType;
        const currNode = this.state.hovered;
        const currType = this.state.layout[ind].type;

        if (selectedType && currType === 'normal') {

            let newType;

            if (selectedType === 'normal') {
                newType = this.state.selectedEntity;
            }
            else {
                newType = selectedType
            }

            console.log(`Updating node to type ${newType}`);

            return newType;
        }

        // console.log(`currNode: ${currNode}`);
        return currType;


    }

    render() {
        let layout = [];

        layout = this.state.layout.map((node, ind) => {
            return this.renderNode(ind);
        });

       return(
        // <div onMouseDown={this.handleMouseDown}>
          <svg
            width={this.props.cols * this.NODESIZE}
            height={this.props.rows * this.NODESIZE}
          >
            <g>
                {
                    layout
                }
            </g>
          </svg>
        // </div>
       )


    }
}


export default Grid
