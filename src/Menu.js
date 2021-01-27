import React from "react";
import './Menu.css';
import MenuItem from "./MenuItem";

class Menu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id={"menu"}>
                <MenuItem itemName={"Run"}/>
                <MenuItem itemName={"Step Forward"}/>
                <MenuItem itemName={"Step Backward"}/>
                <MenuItem itemName={"Change Node"}/>
                <MenuItem itemName={"Eraser"}/>
                <MenuItem itemName={"Configure Algorithm"}/>
                <MenuItem
                    action={this.props.clearGridObstacles}
                    itemName={"Clear Obstacles"}
                />
            </div>
        )
    }


}

export default Menu;