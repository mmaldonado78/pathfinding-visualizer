import React from "react";
import "./MenuWindow.css";

class MenuWindow extends React.Component {

    render() {
        return (
            <div className={"backdrop"}
                // style={{
                // backgroundColor: "rgba(0, 0, 0, .8)",
                // backdropFilter: "blur(4px)",
                // opacity: .75,
                // height: "100%",
                // width: "100%",
                // display: "flex",
                // alignItems: "center",
                // justifyContent: "center",
                // position: "absolute"

            // }}
            >
                <div className={"window-container"}
                    // style={{
                    // minHeight: "200px",
                    // minWidth: "300px",
                    // backgroundColor: "darkgrey",
                    // borderRadius: "10px"
                // }}
                >
                    {this.props.children}
                </div>

            </div>
        )
    }
}

export default MenuWindow;