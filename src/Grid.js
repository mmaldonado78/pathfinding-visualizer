import React from 'react';
import {NORMAL, START, GOAL, OBSTACLE} from "./constants/NodeTypes";
import DraggedNode from "./DraggedNode";
import Row from "./Row"
import "./Grid.css"



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


    handleMouseMove(ev) {

        if (!(this.props.selected)) return;

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
                    addOrRemove={this.props.addOrRemove}
                />);
        });

       return(
          <svg className={"grid-container"}
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
              {this.props.selected && this.props.selectedType && this.props.selectedType !== NORMAL && this.renderDraggedNode()}
            </g>
          </svg>

       )


    }
}

export default Grid;
