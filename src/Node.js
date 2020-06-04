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



    render() {
        console.log(`Node ${this.props.x + this.props.y} rendered`);


        //TODO: Move node types up to Grid and pass as props
        let fill = this.props.type;

        if (this.state.hovering) fill = LightenDarkenColor(fill, -20);




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
                rx={3}
                ry={3}

                // onMouseOver={this.props.onMouseOver.bind(this)}
                // onMouseOut={this.props.onMouseOut.bind(this)}
                onMouseOver={this.handleHover}
                onMouseOut={this.handleHover}
                onMouseUp={this.props.onMouseUp}
                onMouseDown={this.props.onMouseDown}
                onMouseMove={this.props.onMouseMove}
            >

            </rect>
        )}



}

export default Node