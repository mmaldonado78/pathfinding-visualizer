import React from "react";
import {Raphael, Rect} from "react-raphael";
import LightenDarkenColor from  "./lightenDarken.js"

class Node extends React.Component {

    NORMAL = "#D3D3D3";
    OBSTACLE = "#36454F";
    START = "#77DD77";
    GOAL = "#F54A67";

    constructor(props) {
        super(props);
        // this.fill = ;
        this.rect = React.createRef();
        // this.state = {
        //     dragging: true
        // origin: {x: this.props.node.x, y: this.props.node.y},
        // x: this.props.node.x,
        // y: this.props.node.y,
        // }
    }

    componentDidMount() {
        console.log("Node mounted");
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {


        return (this.props.node.type !== nextProps.node.type ||
            this.props.node.hovering !== nextProps.node.hovering ||
            this.props.node.x !== nextProps.node.x ||
            // this.state !== nextState ||
            this.props.node.dragged !== nextProps.node.dragged
        );
        // return this.props.node !== nextProps.node;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    // useEffect() {
    //     this.animate = false;
    // }

    handleMouseMove(ev, x, y) {
        console.log("Mousemove");
        console.log(arguments);
        if (!this.props.node.dragged) return;

        // let layout = clone(this.state.layout);
        // let row, col;
        // [row, col] = this.state.selected;
        // layout[row][col].x = x;
        // layout[row][col].y = y;

        this.setState({
            x: x - 10,
            y: y - 10
        })

    }



    render() {
        // console.log("Node rendered");
        // console.log("Ref");
        // console.log(this.rect.refs.current?.refs?.element);

        //TODO: Move node types up to Grid and pass as props
        let fill = this.NORMAL;
        if (this.props.node.type === 'start') fill = this.START;
        else if (this.props.node.type === 'goal') fill = this.GOAL;
        else if (this.props.node.type === 'obstacle') fill = this.OBSTACLE;

        if (this.props.node.hovering) fill = LightenDarkenColor(fill, -20);
        else if (this.props.node.dragged) fill = LightenDarkenColor(fill, 40);
        // console.log(fill);

        const draggable = ['start', 'obstacle','goal'].includes(this.props.node.type);
        const changeAnimation = Raphael.animation({
                x: this.props.node.x,
                y: this.props.node.y,
                height: this.props.size,
                width: this.props.size},
            350, ">"
        );
        // const dragFuncs = {start: this.props.onDragStart.bind(this),
        //     move: this.props.onDrag.bind(this),
        //     end: this.props.onDragEnd.bind(this)
        // };

        // const dragFuncs = {start: this.handleDragStart.bind(this),
        //     move: this.handleDrag.bind(this),
        //     end: this.handleDragEnd.bind(this)
        // };

        const self = this;
        // console.log(this.props.node);
        const dragged = this.props.node.dragged;
        const opacity = this.props.node.dragged ? .7 : 1;


        // TODO: Account for animations with one Rect
        const node = (this.animate ?
            <Rect /*key={this.props.node.x.toString() + this.props.node.y.toString()}*/
                x={this.props.node.x + this.props.size/2}
                y={this.props.node.y + this.props.size/2}
                width={0}
                height={0}
                attr={{
                    "fill": fill,
                    "stroke-linejoin": "round",
                    "stroke": "#FFF",
                    "stroke-width": 1,
                    "fill-opacity": opacity
                }}
                animate={changeAnimation}
                // toFront={dragged}
                toBack={true}

                // draggable={['start', 'obstacle','goal'].includes(this.props.node.type)}
                // drag={{start: this.props.onDragStart.bind(this),
                //     move: this.props.onDrag.bind(this),
                //     end: this.props.onDragEnd.bind(this)
                // }}
                // {...( draggable && {drag: {dragFuncs}})}
                // drag={draggable ? dragFuncs : undefined}
                // mousemove={draggable ? this.handleMouseMove.bind(this) : undefined}
                mousemove={this.props.onMouseMove}
                mouseover={this.props.onMouseOver.bind(this)}
                mouseout={this.props.onMouseOut.bind(this)}
                mouseup={this.props.onMouseUp}
                mousedown={this.props.onMouseDown}
                // click={this.props.addOrRemoveObstacles}

                ref={this.rect}



                r={3}
                // hover={{in: self.props.onHover, out: self.props.onHoverOut}}
            />

            :

            <Rect /*key={this.props.node.x.toString() + this.props.node.y.toString()}*/
                x={this.props.node.x}
                y={this.props.node.y}
                width={this.props.size}
                height={this.props.size}
                attr={{
                    "fill": fill,
                    "stroke-linecap": "round",
                    "stroke": "#FFF",
                    "stroke-width": 1,
                    "fill-opacity": opacity

                }}
                r={3}
                // {...( draggable && {drag: {dragFuncs}})}
                // drag={draggable ? dragFuncs : undefined}
                // mosemove={this.props.onMouseMove.bind(this)}
                toBack={true}

                mousemove={this.props.onMouseMove}
                // mousemove={this.handleMouseMove.bind(this)}
                // mousemove={draggable ? this.handleMouseMove.bind(this) : undefined}


                mouseover={this.props.onMouseOver.bind(this)}
                mouseout={this.props.onMouseOut.bind(this)}
                mouseup={this.props.onMouseUp}
                mousedown={this.props.onMouseDown}
                // click={this.props.addOrRemoveObstacles}


                ref={this.rect}


                // hover={{in: self.props.onHover, out: self.props.onHoverOut}}
            />);

        // dummyNode
        //  console.log(this.props.node);



        return(
            // <Rect /*key={this.props.node.x.toString() + this.props.node.y.toString()}*/
            //       x={this.props.node.x + (hovering ? 0 : this.props.size/2)}
            //       y={this.props.node.y + (hovering ? 0 : this.props.size/2)}
            //       width={(hovering ? this.props.size : 0)}
            //       height={(hovering ? this.props.size : 0)}
            //       attr={{
            //           "fill": fill,
            // "stroke-linejoin": "round",
            // "stroke": "#FFF",
            // "stroke-width": 1,
            // rx: 20,
            // ry: 20
            // }}
            // animate={{}}
            //
            //
            // r={3}
            //
            // hover={{in: self.props.onHover, out: self.props.onHoverOut}}
            // />

            // <Rect /*key={this.props.node.x.toString() + this.props.node.y.toString()}*/
            //     x={this.props.node.x}
            //     y={this.props.node.y}
            // x={this.state.origin.x}
            // y={this.state.origin.y}
            // width={this.props.size}
            // height={this.props.size}
            // attr={{
            //     "fill": fill,
            //     "stroke-linecap": "round",
            //     "stroke": "#FFF",
            //     "stroke-width": 1,
            // }}
            //
            //
            // r={3}
            // drag={draggable ? dragFuncs : undefined}
            // mosemove={this.props.onMouseMove.bind(this)}

            // mouseover={this.props.onHover}
            // mouseout={this.props.onHoverOut}
            // hover={{in: self.props.onHover, out: self.props.onHoverOut}}
            // />
            // node
            <rect
                x={this.props.node.x}
                y={this.props.node.y}
                width={this.props.size}
                height={this.props.size}
                fill={fill}
                strokeLinecap={"round"}
                stroke={"#FFF"}
                strokeWidth={1}
                rx={3}
                ry={3}

                onMouseOver={this.props.onMouseOver.bind(this)}
                onMouseOut={this.props.onMouseOut.bind(this)}
                onMouseUp={this.props.onMouseUp}
                onMouseDown={this.props.onMouseDown}
                onMouseMove={this.props.onMouseMove}
            >

            </rect>
        )}



}

export default Node