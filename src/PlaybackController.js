import React from "react";
import MenuItem from "./MenuItem";

const PlaybackController = ({running, runAlgorithm, pauseAlgorithm, playBackControlEnabled}) => {

    return(
        <MenuItem action={running ? pauseAlgorithm : runAlgorithm}
                  itemName={running ? "Pause" : "Run"}
                  disabled={!playBackControlEnabled}
        />
    )
}

export default PlaybackController;