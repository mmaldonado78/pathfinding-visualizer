import React from "react";
import LightenDarkenColor from  "./lightenDarken.js"

class Node extends React.PureComponent {

    constructor(props) {
        super(props);
        this.rect = React.createRef();

        this.state = {
            hovering: false
        };

        this.handleHover = this.handleHover.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    componentDidMount() {
        console.log("Node mounted");
    }

    handleMouseOver() {

        if (this.props.addOrRemove) {
            this.props.addOrRemove(this.props.row, this.props.col);
        }
        this.handleHover();
    }

    handleHover() {
        this.setState(prevState => {
            return {hovering: !prevState.hovering}
        });
    }

    mouseDown(ev) {
        let row = this.props.row;
        let col = this.props.col;
        this.props.onMouseDown(row, col, ev);
    }

    mouseUp(ev) {
        ev.stopPropagation();
        this.props.onMouseUp(
            ev,
            this.props.row,
            this.props.col
            );
    }


    render() {

        let fill = this.props.type;

        if (this.props.selected) {
            fill = LightenDarkenColor(fill, 50)
        }
        if (this.state.hovering || this.props.draggedOver) {
            fill = LightenDarkenColor(fill, -25);
        }


        return(

            <rect
                x={this.props.x}
                y={this.props.y}
                shapeRendering={"geometricPrecision"}
                width={this.props.size}
                height={this.props.size}
                fill={fill}
                strokeLinecap={"round"}
                stroke={"#FFF"}
                strokeWidth={1}
                rx={1}
                ry={1}

                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleHover}
                onMouseDown={this.mouseDown}
                onMouseUp={this.mouseUp}
            >

            </rect>
        )}



}

export default Node