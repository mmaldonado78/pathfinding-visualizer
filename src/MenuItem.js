import React from "react";
import "./MenuItem.css"

class MenuItem extends React.Component {

    constructor(props) {
        super(props);

        this.setState({
            active: false
        })
    }

    render() {
        return (
            <div id={"menu-item"}>
                <button>
                    {this.props.itemName}
                </button>
            </div>
        )
    }
}

export default MenuItem;