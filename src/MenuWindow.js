import React from "react";
import "./MenuWindow.css";

class MenuWindow extends React.Component {

    constructor(props) {
        super(props);

        this.backDrop = React.createRef();
        this.backDropClick = this.backDropClick.bind(this);
    }

    render() {
        return (
            <div ref={this.backDrop} className={"backdrop"} onClick={this.backDropClick}>
                <div className={"window-container"}>
                    {this.props.children}
                </div>

            </div>
        )
    }

    backDropClick(ev) {
        if (ev.target === this.backDrop.current) {
            this.props.closeSubmenu();
        }
    }
}

export default MenuWindow;