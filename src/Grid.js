import React, {useEffect} from 'react';
// const {Raphael, Paper, Rect} = require('react-raphael');
import {Raphael, Set, Paper, Rect} from 'react-raphael';
import Node from "./Node.js"
const clone =  require('rfdc')();


class Grid extends React.Component {

    NODESIZE = 30;


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
            selectedType: null,
            selected: null
        };

        console.log(this.state.layout);
        this.hovEnevents = 0;


    }

    componentDidMount() {
        console.log("Grid mounted");
    }


    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("Grid update: " + (this.state.layout !== nextState.layout).toString());
        console.log(this.state);
        return (this.state.layout !== nextProps.layout);
    }

    renderNode(i, j) {
        const node = this.state.layout[i][j];
        return(
            <Node key={node.ox.toString() + node.oy.toString()} node={node} size={this.NODESIZE}
                  // onHover={this.handleHoverIn.bind(this, i, j)}
                  // onHoverOut={this.handleHoverOut.bind(this, i, j)}
                  // onDragStart={this.handleDragStart.bind(this, i, j)}
                  // onDrag={this.handleDrag.bind(this, i, j,)}
                  // onDragEnd={this.handleDragEnd.bind(i, j)}
                onMouseMove={this.handleMouseMove.bind(this, i, j)}
                onMouseOver={this.handleMouseOver.bind(this, i, j)}
                onMouseOut={this.handleMouseOut.bind(this, i, j)}
                onMouseDown={this.handleMouseDown.bind(this, i, j)}
                onMouseUp={this.handleMouseUp.bind(this, i, j)}
                addOrRemoveObstacles={this.handleClick.bind(this, i, j)}
            />
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
                    ox: node * this.NODESIZE,
                    oy: row * this.NODESIZE,
                    type: type,
                    hovering: false,
                    dragged: false
                        });
            }
            this.layout.push(currRow)
        }
        let [i, j]  = this.startNode;
        this.layout[i][j].type = 'start';

        [i, j] = this.goalNode;
        this.layout[i][j].type = 'goal';
        console.log(this.layout)
    }

                    // for (let item of row)
                // });
            // });
        // });
        // console.log(this.layout)

    handleHoverIn(i, j) {

        // this.hovEnevents++;
        // console.log(this.hovEnevents);

        // console.log("hovering?");
        console.log("Hover in");
        // console.log(this.items)
        let layout = clone(this.state.layout);
        layout[i][j].hovering = true;
        // console.log("Testing immutability: " + (Object.is(layout, this.state.layout)).toString());

        this.setState({layout: layout});
    }

    handleHoverOut(i, j) {

        // this.hovEnevents++;
        // console.log(this.hovEnevents);
        // if (this.state.changingStart) return;

        console.log("hovering out");
        // console.log("Hover event");
        // console.log(this.items)
        let layout = clone(this.state.layout);
        layout[i][j].hovering = false;
        // console.log("Testing immutability: " + (Object.is(layout, this.state.layout)).toString());

        this.setState({layout: layout});
    }

    handleMouseDown(i, j, ev) {
        // layout = clone(this.)
        console.log("Mousedown");
        console.log(arguments);
        ev.preventDefault();

        let layout = clone(this.state.layout);

        let selectedType = layout[i][j].type;
        if (selectedType === 'normal') return;

        layout[i][j].dragged = true;

         this.setState({
             layout: layout,
             selectedType: selectedType,
             selected: [i, j]
         })


        // let layout = clone(this.state.layout);
        // let dragged = layout[i][j];
        // dragged.hovering = false;
        // dragged.x
        // this.setState({changingStart: true});
    }

    handleDrag(i, j, movX, movY, x, y, ev) {

        console.log("Drag");
        // console.log(arguments);
        // let coords;

        // if (this.state.addingObstacle) coords = this.state.obstacleCoords;
        // else if (this.state.changingStart) coords = this.startNode;
        // else if (this.state.changingGoal) coords = this.goalNode;

        let i0, j0;
        [i0, j0] = this.state.coords;

        if (i !== i0 && j !== j0) {
            let layout = clone(this.state.layout);


            layout[i][j].type = this.state.selectedType;
            layout[i0][j0].type = 'normal';

            this.setState({layout: layout})
        }

        // console.log(ev);
    }

    handleDragEnd(i, j, ev) {
        console.log("Dragend");
        console.log(arguments)

    }

    handleMouseOver(i, j) {
        console.log("Mouseover");
        console.log(arguments);

        // if (this.state.selectedType && (i === this.state.selected[0] &&
        //     j === this.state.selected[1])) {
        //
        //     // if (i === this.state.selected[0] &&
        //     //     j === this.state.selected[1]) return;
        //
        //     let layout = clone(this.state.layout);
        //     layout[i][j].type = this.state.selectedType;
        //     this.setState({layout: layout});
        // }
        // else {
        if (!this.state.selectedType) {
            this.handleHoverIn(i, j)
        }
    }

    handleMouseOut(i, j) {
        console.log("Mouseout");
        console.log(arguments);

        // if (this.state.selectedType && (i === this.state.selected[0] &&
        //         j === this.state.selected[1])){
        //
        //
        //     let layout = clone(this.state.layout);
        //     layout[i][j].type = 'normal';
        //     this.setState({layout: layout});
        // }
        if (!this.state.selectedType) {
            this.handleHoverOut(i, j)
        }
    }

    handleMouseUp(i, j, ev) {
        console.log("Mouseup");
        console.log(arguments);
        const selectedType = this.state.selectedType;

        let row, col;
        if (selectedType) {
            [row, col] = this.state.selected;
            let layout  = clone(this.state.layout);
            layout[row][col].dragged = false;


            this.setState({
                layout: layout,
                selectedType: null,
                selected: null
            });
        }


    }

    //TODO: Add mousemove handler for paper instead of each square
    handleMouseMove(i, j, ev, x, y) {
        // console.log("Mousemove");
        // console.log(arguments);
        if (!this.state.selectedType) return;

        let layout = clone(this.state.layout);
        let row, col;
        [row, col] = this.state.selected;
        layout[row][col].x = ev.clientX - 10;
        layout[row][col].y = ev.clientY - 10;

        this.setState({layout: layout})

    }

    handleClick(i, j) {
        console.log("Click");
        let clicked = this.state.layout[i][j].type;

        let layout;
        if (clicked === 'normal' || clicked === 'obstacle') {
            layout = clone(this.state.layout);
        }

        if (clicked === 'normal') {
            layout[i][j].type = 'obstacle';
            this.setState({layout: layout});
        }
        else if (clicked === 'obstacle') {
            layout[i][j].type = 'normal';
            this.setState({layout: layout})
        }
    }

    render() {
        // console.log(this.state.layout.flat());
        let layout = [];

        // if (this.state.selected) {
        //     console.log("I ran");
        //     // let layout = [];
        //     let di, dj;
        //     [di, dj] = this.state.selected;
        //     console.log(di, dj);
        //     this.state.layout.flat().forEach((node, ind) => {
        //         console.log(ind, di * this.props.cols + dj);
        //         if (ind !== di * this.props.cols + dj) {
        //             let j = ind % this.props.cols;
        //             let i = (ind - j) / this.props.cols;
        //             layout.push(this.renderNode(i, j))
        //         }
        //     });
        //     layout.push(this.renderNode(di, dj));
        //     console.log(layout)
        //
        // }
        // else {
            layout = this.state.layout.flat().map((node, ind) => {
                let j = ind % this.props.cols;
                const i = (ind - j)/ this.props.cols;
                // if (i === 5 && j === 15) return null;
                return(
                    this.renderNode(i, j)

                )
            });

            // layout = layout.filter(node => node !== null);
        // }

        // console.log(layout);

        // if (this.state.selected) {
        //     let di, dj;
        //     [di, dj] = this.state.selected;
        //     layout.splice(di * this.props.cols + dj, 1);
        //     console.log("Redrawing node");
        //     layout.unshift(dragged[0]);
            // layout.push(this.renderNode(di, dj))
        // }
        // console.log(layout);
       return(

           // <Paper key="paper" width={this.props.cols * this.NODESIZE} height={this.props.rows * this.NODESIZE}>
           //     {
           //         layout
           //     }
           // </Paper>)
        <svg
            // viewBox={`0 0 ${this.props.cols * this.NODESIZE} ${this.props.rows * this.NODESIZE}`}
            width={this.props.cols * this.NODESIZE}
            height={this.props.rows * this.NODESIZE}
        >
            <g>
                {
                    layout
                }
            </g>
        </svg>
       )


    }
}





export default Grid
