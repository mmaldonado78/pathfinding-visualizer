import React from "react";
import "./MenuItem.css"

class MenuItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
    }

    render() {
        return (
            <div id={"menu-item"}>
                <button onClick={this.props.action}>
                    {this.props.itemName}
                </button>
            </div>
        )
    }
}

export default MenuItem;