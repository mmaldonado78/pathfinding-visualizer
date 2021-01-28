import React from 'react';
import Node from "./Node.js"
import {NORMAL, START, GOAL, OBSTACLE} from "./constants/NodeTypes";
import DraggedNode from "./DraggedNode";
import Row from "./Row"



class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.grid = React.createRef();
        this.clearDraggedCoords = this.clearDraggedCoords.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        document.addEventListener('mousemove', this.handleMouseMove);

        this.state = {
            draggedCoords: null
        }

    }



    componentDidMount() {
        console.log("Grid mounted");

    }

    /**
     * Not in use
     *
     * @param ind
     * @returns {JSX.Element}
     */
    renderNode(ind) {
        const node = this.state.layout[ind];
        // console.log(node);

        if (!this.boundMouseDowns[ind]) {
            this.boundMouseDowns[ind] = this.handleMouseDown.bind(this, ind);
        }

        // if (!this.boundMouseUps[ind]) {
        //     this.boundMouseUps[ind] = this.handleMouseUp.bind(this, ind);
        // }

        // console.log(`Dragged over condition: ${!!this.state.draggedOver && this.state.draggedOver === ind}`)

        return(
            <Node
                key={node.ox.toString() + node.oy.toString()}
                // node={node}
                size={this.NODESIZE}
                x={node.x}
                y={node.y}
                type={node.type}
                draggedOver={!!this.state.draggedOver && this.state.draggedOver === ind}
                selected={!!this.state.selected && this.state.selected === ind}

                onMouseMove={this.handleMouseMove}
                onMouseDown={this.boundMouseDowns[ind]}
                // onMouseUp={this.boundMouseUps[ind]}
            />
        );
    }

    renderDraggedNode() {

        console.log(this.props.selectedType !== NORMAL);

        let x, y;
        if (this.state.draggedCoords) {
            [x, y] = this.state.draggedCoords;
        }
        else {
            let gridRect = this.grid.current.getBoundingClientRect();
            [x, y] = this.props.mouseDownPos;
            x -= gridRect.left;
            y -= gridRect.top;
        }

        return(
            <DraggedNode
                x={x}
                y={y}
                size={Math.round(this.props.nodeSize / 2)}
                type={this.props.selectedType}
                clearDraggedCoords={this.clearDraggedCoords}
            />
        );
    }

    clearDraggedCoords() {
        this.setState({
            draggedCoords: null
        })
    }


    flattenCoords(i, j) {
        return this.props.cols * i + j;
    }



    /**
     * Not in use
     *
     * @param ind
     * @param ev
     */
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

    /**
     *  Not in use
     *
     * @param ind
     * @param ev
     */
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


    handleMouseMove(ev) {

        if (!(this.props.selectedType && this.props.selectedType !== NORMAL)) return;

        if (this.LOG_MOUSEMOVE) {
            console.log("Mousemove");
            // ev.persist();
            // console.log(arguments);
            console.log(`Coords: ${ev.clientX}, ${ev.clientY}`);
        }

        let newState = {};

        let [x, y] = [ev.clientX, ev.clientY];

        // this.draggedCoords = [x, y];

        //TODO: Replace hard-coded coordinates with actual grid coordinates
        let gridRect = this.grid.current.getBoundingClientRect();
        x = x - gridRect.left;
        y = y - gridRect.top;

        let nodeSize = this.props.nodeSize;

        if (x < nodeSize / 2) {
            x = nodeSize / 2;
        }

        if (y < nodeSize / 2) {
            y = nodeSize / 2;
        }

        if (x > gridRect.right - gridRect.left - nodeSize / 2) {
           x = gridRect.right - gridRect.left - nodeSize / 2;
        }

        if (y > gridRect.bottom - gridRect.top - nodeSize / 2) {
            y = gridRect.bottom - gridRect.top - nodeSize / 2;
        }

        let row = Math.floor(y / nodeSize);
        let col = Math.floor(x / nodeSize);

        if (row > this.props.rows - 1) {
            row = this.props.rows - 1;
        }

        if (col > this.props.cols - 1) {
            col = this.props.cols - 1
        }

        console.log(row, col);

        this.props.setDraggedOverNode(row, col);

        this.setState({
            draggedCoords: [x, y]
        });

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


        layout = this.props.layout.map((row, ind) => {
            return (
                <Row
                    key={ind}
                    row={row}
                    nodeSize={this.props.nodeSize}
                    onMouseDown={this.props.handleMouseDown}
                    onMouseUp={this.props.handleMouseUp}
                    // onMouseMove={this.handleMouseMove}
                    draggedOver={this.props.draggedOver}
                    selected={this.props.selected}
                    addSelectedEntity={this.props.addSelectedEntity}
                />);
        });

       return(
          <svg
            width={this.props.cols * this.props.nodeSize}
            height={this.props.rows * this.props.nodeSize}
            ref={this.grid}
          >
            <g>
                {
                    layout
                }
            </g>
            <g style={{pointerEvents: "none"}}>
              {this.props.selectedType && this.props.selectedType !== NORMAL && this.renderDraggedNode()}
            </g>
          </svg>

       )


    }
}

export default Grid;
