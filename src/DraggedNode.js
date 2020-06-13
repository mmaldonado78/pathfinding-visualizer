import React from 'react';
import Node from "./Node";
import LightenDarkenColor from "./lightenDarken";

class DraggedNode extends React.PureComponent {

    render() {

        let fill = this.props.type;
        fill = LightenDarkenColor(fill, 30);
        let offset = Math.round(this.props.size / 2);
        return (
            <Node
                x={this.props.x - offset}
                y={this.props.y - offset}
                size={this.props.size}
                type={fill}
            />
            );

    }

    componentWillUnmount() {
        console.log("Will unmount");
    }
}

export default DraggedNode;