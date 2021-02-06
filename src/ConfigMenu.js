import React, {useState} from "react";
import algorithms, {NO_HEURISTIC, NO_WEIGHTS} from "./constants/Algorithms";
import heuristics from "./constants/Heuristics";

const algButtons = algorithms.map(algName => {
    return(
        <label>
             <input type={"radio"} value={algName} name={"algorithm"}/>
             {algName}
         </label>

)});

const ConfigMenu = ({updateAlgorithmOptions}) => {

    const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
    const [selectedHeuristic, setSelectedHeuristic] = useState("");
    const [heatMapsSelectable, setHeatMapsSelectable] = useState(false);
    const [selectedHeatMap, setSelectedHeatMap] = useState("");
    const [useDiagonals, setUseDiagonals] = useState(false);


    const makeRadioGroup = (optionNames, groupName) => {
        return optionNames.map(optionName => {
            return(
                <label>
                    <input type={"radio"} value={optionName} name={groupName}/>
                    {optionName}
                </label>
            )
        })
    }

    // const algButtons = [DFS, BFS, UCS, A_STAR].map(algName => {
    //     return(
    //         <label>
    //             <input type={"radio"} value={algName} name={"algorithm"}/>
    //             {algName}
    //         </label>
    //     )
    // });

    // const heurButtons = heuristics.map(heur => {
    //     ret
    // })

    return (
        <div>
            <div className={"header"}>
                Algorithm
            </div>
            <div className={"radio-group"} onChange={ev => setSelectedAlgorithm(ev.target.value)}>
                {makeRadioGroup(algorithms, "algorithm")}
            </div>
            <div className={"header"}>
                Heuristic
            </div>
            <div className={"radio-group"} onChange={ev => setSelectedHeuristic(ev.target.value)}>
                {makeRadioGroup(heuristics, "heuristic")}
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
                           onChange={() => setHeatMapsSelectable(!heatMapsSelectable)}/>
                    Heatmap
                </label>
            </div>
            <div className={"radio-group"}
                 onChange={ev => setSelectedHeatMap(ev.target.value)}>
                <label>
                    <input type={"radio"} value={"Cost"} name={"heatmap"}
                           disabled={!heatMapsSelectable}/>
                    Cost
                </label>
                <label>
                    <input type={"radio"} value={"Heuristic"} name={"heatmap"}
                           disabled={!heatMapsSelectable || NO_HEURISTIC.includes(selectedAlgorithm)}/>
                    Heuristic
                </label>
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
                <button>Save</button>
            </div>
            <div>
                {selectedAlgorithm} {<br/>}
                {selectedHeuristic} {<br/>}
                {heatMapsSelectable.toString()}

            </div>

        </div>
    )
};

export default ConfigMenu;
