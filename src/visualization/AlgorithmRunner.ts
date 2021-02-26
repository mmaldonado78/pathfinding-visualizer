import IProcessedNode from "../interfaces/IProcessedNode";
import Algorithm from "../interfaces/Algorithm";
import AlgorithmPayload from "./AlgorithmPayload";
import NodeState from "../constants/NodeState";
import {FRINGED, VISITED, VISITED_OBSTACLE, PATH} from "../constants/NodeTypes";

class AlgorithmRunner {

    private stateColor: Map<NodeState, string>;

    constructor() {
        this.stateColor = new Map([
            [NodeState.VISITED, VISITED],
            [NodeState.FRINGED, FRINGED],
            [NodeState.VISITED_OBSTACLE, VISITED_OBSTACLE]
        ])
    }

    getAlgorithmFrameData(algorithm: Algorithm): AlgorithmPayload[][][] {
        let frameData: AlgorithmPayload[][][] = [];

        let currStep: IProcessedNode[][] = algorithm.step();
        while (!(algorithm.goalFound() || currStep.length === 0)) {
            frameData.push(

                // mapping a processed node state to its corresponding color
                // in the view grid
                currStep.map(substep => {
                    return substep.map(({node, state}) => {
                        const [row, col] = node;
                        return {
                            row: row,
                            col: col,
                            type: this.stateColor.get(state) || "",
                        }
                    })
                })
            )

            currStep = algorithm.step();
        }

        if (algorithm.goalFound()) {
            const path: Index2D[] = algorithm.constructPath();

            frameData.push(path.map(index => {
                const [row, col] = index;
                return [
                    {
                        row: row,
                        col: col,
                        type: PATH
                    }
                ]
            }))
        }
        return frameData;
    }




}

export default AlgorithmRunner;