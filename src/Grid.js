import React from 'react';
// const {Raphael, Paper, Rect} = require('react-raphael');
import {Raphael, Set, Paper, Rect} from 'react-raphael';
const clone =  require('rfdc')();


class Grid extends React.Component {

    NODESIZE = 30;

    constructor(props) {
        super(props);
        this.layout = [];
        // console.log(this.layout);
        this.setup();

        this.state = {
            layout: clone(this.layout)
        };
        console.log(this.state.layout)


    }


    componentDidMount() {
    }

    renderNode(i, j) {
        const node = this.state.layout[i][j];
        return(
            <Node key={node.x.toString() + node.y.toString()} node={node} size={this.NODESIZE}
                  onHover={() => this.handleHoverIn(i, j)}
                  onHoverOut={() => this.handleHoverOut(i, j)}/>
        );
    }



    setup() {
        console.log("Setup");

        for (let row = 0; row < this.props.rows; row++) {
            let currRow = [];
            let type = 'normal';
            for (let node = 0; node < this.props.cols; node++) {
                currRow.push({
                    x: node * this.NODESIZE,
                    y: row * this.NODESIZE,
                    type: type,
                    hovering: false
                        });
            }
            this.layout.push(currRow)
        }
        console.log(this.layout)
    }

                    // for (let item of row)
                // });
            // });
        // });
        // console.log(this.layout)

    handleHoverIn(i, j) {
        // console.log("hovering?");
        console.log("Hover event");
        // console.log(this.items)
        let layout = clone(this.state.layout);
        layout[i][j].hovering = true;
        // console.log("Testing immutability: " + (Object.is(layout, this.state.layout)).toString());

        this.setState({layout: layout});
        // console.log(this.refs.node);
        // this.refs.node.props.attr["opacity"] =  .5;
    }

    handleHoverOut(i, j) {
        // console.log("hovering out");
        console.log("Hover event");
        // console.log(this.items)
        let layout = clone(this.state.layout);
        layout[i][j].hovering = false;
        // console.log("Testing immutability: " + (Object.is(layout, this.state.layout)).toString());

        this.setState({layout: layout});
    }


    render() {
       return(
           <Paper key="paper" width={this.props.cols * this.NODESIZE} height={this.props.rows * this.NODESIZE}>
               {
                   this.state.layout.map((row, rowNum) => {
                       return row.map((node, nodeNum) => {
                           // console.log(node);
                           // const self = this
                           return this.renderNode(rowNum, nodeNum);
                           // return(
                           //     <Node key={node.x.toString() + node.y.toString()}
                           //         x={node.x} y={node.y} type={node.type} size={this.NODESIZE} />
                               // <Rect ref="node" key={node.x.toString() + node.y.toString()}
                               //       x={node.x}
                               //       y={node.y}
                               //       width={this.NODESIZE}
                               //       height={this.NODESIZE}
                               //       attr={{
                               //           "fill": "#D3D3D3",
                               //           "stroke-linecap": "round",
                               //           // "stroke-linejoin": "round",
                               //           "stroke": "#FFF",
                               //           "stroke-width": 1,
                               //           // rx: 20,
                               //           // ry: 20
                               //       }}
                               //       r={3}
                               //
                               //       hover={{in: this.hover.bind(this)}}
                               // glow={{
                               //     width: 1
                               // }}


                               // />
                           // )
                       })
                   })
               }
           </Paper>)


    }
}

class Node extends React.Component {

    NORMAL = "#D3D3D3";
    OBSTACLE = "#000";
    START = "#A57BB6";
    GOAL = "#F54A67";

    constructor(props) {
        super(props);
        // this.fill = ;
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        // console.log(this.props);
        // console.log(nextProps);
        // console.log("Are we the same? " + Object.is(this.props.node, nextProps.node).toString());
        // console.log(this.props.node.type !== nextProps.node.type ||
        //     this.props.node.hovering !== nextProps.node.hovering);
        return (this.props.node.type !== nextProps.node.type ||
            this.props.node.hovering !== nextProps.node.hovering);
    }


    render() {
        // console.log("Node rendered");


        //TODO: Move node types up to Grid and pass as props
        let fill = this.NORMAL;
        if (this.props.node.type === 'start') fill = this.START;
        else if (this.props.node.type === 'goal') fill = this.GOAL;
        else if (this.props.node.type === 'obstacle') fill = this.OBSTACLE;
        else if (this.props.node.hovering) fill = LightenDarkenColor(fill, -20);

        const hovering = this.props.node.hovering;
        const changeAnimation = Raphael.animation({
                x: this.props.node.x,
                y: this.props.node.y,
                height: this.props.size,
                width: this.props.size},
            350, ">"
        );

        const self = this;


        return(
            // <Rect /*key={this.props.node.x.toString() + this.props.node.y.toString()}*/
            //       x={this.props.node.x + (hovering ? 0 : this.props.size/2)}
            //       y={this.props.node.y + (hovering ? 0 : this.props.size/2)}
            //       width={(hovering ? this.props.size : 0)}
            //       height={(hovering ? this.props.size : 0)}
            //       attr={{
            //           "fill": fill,
            //           "stroke-linecap": "round",
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
            <Rect /*key={this.props.node.x.toString() + this.props.node.y.toString()}*/
                x={this.props.node.x}
                y={this.props.node.y}
                width={this.props.size}
                height={this.props.size}
                attr={{
                    "fill": fill,
                    "stroke-linecap": "round",
                    // "stroke-linejoin": "round",
                    "stroke": "#FFF",
                    "stroke-width": 1,
                }}


                r={3}

                hover={{in: self.props.onHover, out: self.props.onHoverOut}}
            />
        )}



}

/**
 * @return {string}
 * From https://css-tricks.com/snippets/javascript/lighten-darken-color/
 */
function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] === "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

}

export default Grid
