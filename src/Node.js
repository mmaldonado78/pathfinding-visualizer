import React, {PureComponent} from "react";
import {Raphael, Rect} from "react-raphael";
import LightenDarkenColor from  "./lightenDarken.js"

class Node extends React.PureComponent {

    // NORMAL = "#D3D3D3";
    // OBSTACLE = "#36454F";
    // START = "#77DD77";
    // GOAL = "#F54A67";

    constructor(props) {
        super(props);
        // this.fill = ;
        this.rect = React.createRef();

        this.state = {
            hovering: false
        };

        this.handleHover = this.handleHover.bind(this);
        this.mouseDown = this.mouseDown.bind(this);

    }

    componentDidMount() {
        console.log("Node mounted");
    }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //
    //     return (this.props.node !== nextProps.node || nextState !== this.state);
    // }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    handleMouseMove(ev, x, y) {
        console.log("Mousemove");
        console.log(arguments);
        if (!this.props.node.dragged) return;


        this.setState({
            x: x - 10,
            y: y - 10
        })

    }

    handleHover() {
        this.setState(prevState => {
            return {hovering: !prevState.hovering}
        });
    }

    mouseDown(ev) {
        console.log("Node 'this'");
        console.log(this);
        console.log(arguments)
        let row = this.props.row;
        let col = this.props.col;
        this.props.onMouseDown(row, col, ev);
    }



    render() {
        console.log(`Node ${this.props.x + this.props.y} rendered`);
        // console.log(`Dragged over: ${this.props.draggedOver}`);


        let fill = this.props.type;

        if (this.props.selected) {
            fill = LightenDarkenColor(fill, 50)
        }
        if (this.state.hovering || this.props.draggedOver) {
            fill = LightenDarkenColor(fill, -25);
        }




        // const dragged = this.props.node.dragged;
        // const opacity = this.props.node.dragged ? .7 : 1;


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

                onMouseOver={this.handleHover}
                onMouseOut={this.handleHover}
                onMouseDown={this.mouseDown}
                // onMouseMove={this.props.onMouseMove}
            >

            </rect>
        )}



}

export default Node