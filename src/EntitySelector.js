import React, {useState} from "react";
import {ALL_NAMES, NAME_TO_COLOR} from "./constants/EntityNames";

const EntitySelector = ({currSelectedEntity, setSelectedEntity}) => {

    // const [selectedEntity, setSelectedEntity] = useState("");

    // const buttonNames = ["wall", "Low Weight", "Medium Weight", "High Weight"]

    return(
        <div className={"button-container"}>
            {
                ALL_NAMES.map(name => {
                    return(
                        <label>
                            <input type={"radio"} value={NAME_TO_COLOR.get(name)} name={"entity-selector"}/>
                            {name}
                        </label>
                    )}
                )
            }
        </div>
    )
}

export default EntitySelector;