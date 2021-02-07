import React from "react";
import "./MenuItem.css"

class MenuItem extends React.Component {

    constructor(props) {
        super(props);
        this.performAction = this.performAction.bind(this);
        this.state = {
            active: false
        };
    }

    performAction() {
        this.props.action(...this.props.actionArgs);
    }

    render() {
        return (
            <div id={"menu-item"}>
                <button className={"menu-button"} onClick={this.performAction}>
                    {this.props.itemName}
                </button>
            </div>
        )
    }
}

MenuItem.defaultProps = {
    actionArgs: []
}

export default MenuItem;