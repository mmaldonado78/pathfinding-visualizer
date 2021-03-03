import React from "react";
import './Menu.css';
import MenuItem from "./MenuItem";
import {CONFIG, ENTITY_SELECTOR} from "./constants/Submenus";
import PlaybackController from "./PlaybackController";

class Menu extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id={"menu"}>
                <PlaybackController
                    running={this.props.runningAlgorithm}
                    runAlgorithm={this.props.runAlgorithm}
                    pauseAlgorithm={this.props.pauseAlgorithm}
                    playBackControlEnabled={this.props.playBackControlEnabled}
                />
                <MenuItem itemName={"Step Forward"}
                          action={this.props.stepForward}
                          disabled={
                              !this.props.playBackControlEnabled ||
                              !this.props.stepsEnabled
                          }
                />
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
                    itemName={"Remove Terrain"}
                />
            </div>
        )
    }


}

export default Menu;