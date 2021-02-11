import React, {useState} from "react";
import algorithms, {NO_HEURISTIC, NO_WEIGHTS} from "./constants/Algorithms";
import heuristics from "./constants/Heuristics";

const ConfigMenu = ({userOptions, updateUserOptions, disabledAlgorithms}) => {

    const [selectedAlgorithm, setSelectedAlgorithm] = useState(userOptions.selectedAlgorithm);
    const [selectedHeuristic, setSelectedHeuristic] = useState(userOptions.selectedHeuristic);
    const [heatMapsSelectable, setHeatMapsSelectable] = useState(userOptions.useHeatMap);
    const [selectedHeatMap, setSelectedHeatMap] = useState(userOptions.selectedHeatMap);
    const [useDiagonals, setUseDiagonals] = useState(userOptions.visitDiagonals);


    /**
     * Maps a list of inputted labels to a single group of radio input elements
     *
     * @param buttonNames {string[]} mapped to the label of each individual radio button
     * @param groupName {string} name attribute of radio group
     * @param setDisabled {function} returns true if a given radio button should
     * be disabled
     * @param checkedName {string} name of radio button that should be checked by default
     * @returns {*}
     */
    const makeRadioGroup = (buttonNames, groupName, setDisabled, checkedName) => {
        return buttonNames.map(buttonName => {
            return(
                <label key={buttonName}>
                    <input type={"radio"}
                           value={buttonName}
                           name={groupName}
                           disabled={setDisabled(buttonName)}
                           defaultChecked={checkedName === buttonName}
                    />
                    {buttonName}
                </label>
            )
        })
    }


    const prepareUserOptions = () => {
        const newUserOptions = {
            selectedAlgorithm: selectedAlgorithm,
            selectedHeuristic: selectedHeuristic,
            useHeatMap: heatMapsSelectable,
            selectedHeatMap: selectedHeatMap,
            visitDiagonals: useDiagonals
        }

        updateUserOptions(newUserOptions);
    }


    return (
        <div>
            <div className={"header"}>
                Algorithm
            </div>
            <div className={"radio-group"} onChange={ev => setSelectedAlgorithm(ev.target.value)}>
                {makeRadioGroup(algorithms, "algorithm",
                    name => disabledAlgorithms.includes(name), selectedAlgorithm)}
            </div>
            <div className={"header"}>
                Heuristic
            </div>
            <div className={"radio-group"} onChange={ev => setSelectedHeuristic(ev.target.value)}>
                {makeRadioGroup(heuristics, "heuristic",
                    () => NO_HEURISTIC.includes(selectedAlgorithm), selectedHeuristic)}
            </div>
            <div className={"warning"}>
                <span className={"warning-text"}>
                    Changing the algorithm or heuristic while a visualization is in progress
                    will clear that visualization.
                </span>
            </div>
            <hr/>
            <div>
                <label>
                    <input type={"checkbox"}
                           onChange={() => setHeatMapsSelectable(!heatMapsSelectable)}
                           defaultChecked={heatMapsSelectable}
                    />
                    Heatmap
                </label>
            </div>
            <div className={"radio-group"}
                 onChange={ev => setSelectedHeatMap(ev.target.value)}>

                {
                    makeRadioGroup(["Cost", "Heuristic"], "heatmap",
                    name =>
                        !heatMapsSelectable ||
                        (name === "Heuristic" && NO_HEURISTIC.includes(selectedAlgorithm)),
                        selectedHeatMap
                    )
                }
            </div>
            <div>
                <label>
                    <input type={"checkbox"} checked={useDiagonals}
                           onChange={() => setUseDiagonals(!useDiagonals)}/>
                    Diagonals
                </label>
            </div>
            <div>
                <button>Clear Walls</button>
                <button>Clear Weighted Nodes</button>
            </div>
            <hr/>
            <div >
                <button>Cancel</button>
                <button onClick={prepareUserOptions}>Save</button>
            </div>

        </div>
    )
};

export default ConfigMenu;
