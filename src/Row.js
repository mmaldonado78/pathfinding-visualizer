import React from "react";
import Node from "./Node";

class Row extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            this.props.row.map((node, ind) => {
                    return (
                        <Node
                            key={node.ox.toString() + node.oy.toString()}
                            // node={node}
                            size={this.props.nodeSize}
                            x={node.x}
                            y={node.y}
                            row={node.row}
                            col={node.col}
                            type={node.type}
                            draggedOver={
                                !!this.props.draggedOver &&
                                this.props.draggedOver[0] === node.row &&
                                this.props.draggedOver[1] === node.col
                            }
                            selected={
                                !!this.props.selected &&
                                this.props.selected[0] === node.row &&
                                this.props.selected[1] === node.col
                            }

                            // onMouseMove={this.handleMouseMove}
                            onMouseDown={this.props.onMouseDown}
                            addSelectedEntity={this.props.addSelectedEntity}
                            addOrRemove={this.props.addOrRemove}
                            onMouseUp={this.props.onMouseUp}
                        />
                    )
                }

            )
        )
    }

}

export default Row;