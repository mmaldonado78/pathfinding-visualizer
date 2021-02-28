import React from "react";
import './Menu.css';
import MenuItem from "./MenuItem";
import {CONFIG, ENTITY_SELECTOR} from "./constants/Submenus";

class Menu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id={"menu"}>
                <MenuItem itemName={"Run"}
                          action={this.props.runAlgorithm}
                />
                <MenuItem itemName={"Step Forward"}/>
                <MenuItem itemName={"Step Backward"}/>
                <MenuItem itemName={ENTITY_SELECTOR}
                          actionArgs={[ENTITY_SELECTOR]}
                          action={this.props.handleSubmenuChange}
                />
                <MenuItem itemName={"Eraser"}/>
                <MenuItem itemName={CONFIG}
                          actionArgs={[CONFIG]}
                          action={this.props.handleSubmenuChange}
                />
                <MenuItem
                    action={this.props.clearGridObstacles}
                    itemName={"Clear Obstacles"}
                />
            </div>
        )
    }


}

export default Menu;