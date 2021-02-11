import React, {useEffect} from "react";
import {ALL_NAMES, NAME_TO_COLOR} from "./constants/EntityNames";

const EntitySelector = ({currSelectedEntity, disabledEntities, updateUserOptions}) => {

    // const [selectedEntity, setSelectedEntity] = useState("");

    // const buttonNames = ["wall", "Low Weight", "Medium Weight", "High Weight"]
    const updateSelectedEntity = ev => {
        updateUserOptions({selectedEntity: ev.target.value});
    }

    useEffect(() => console.log(currSelectedEntity));


    return(
        <div className={"button-container"} onChange={updateSelectedEntity}>
            {
                ALL_NAMES.map(name => {

                    let entityValue = NAME_TO_COLOR.get(name);

                    return(
                        <label>
                            <input
                                type={"radio"}
                                value={entityValue}
                                name={"entity-selector"}
                                disabled={disabledEntities.includes(name)}
                                defaultChecked={entityValue === currSelectedEntity}
                            />
                            {name}
                        </label>
                    )}
                )
            }
        </div>
    )
}

export default EntitySelector;