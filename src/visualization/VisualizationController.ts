import AlgorithmOptions from "../interfaces/AlgorithmOptions";
import AlgorithmPayload from "./AlgorithmPayload";
import {DFS} from "../constants/Algorithms";
import DFSPathFinder from "../algorithms/DFSPathFinder";
import Algorithm from "../interfaces/Algorithm";
import Graph2D from "./Graph2D";
import AlgorithmRunner from "./AlgorithmRunner";

class VisualizationController {

    private updateView: Function;
    private frameData: AlgorithmPayload[][][];
    private algorithms: {[algName: string]: Algorithm};
    private algorithmRunner: AlgorithmRunner;
    private currentFrame: number;
    private stepTimer: NodeJS.Timeout | null;

    constructor(updateViewCallback: Function) {
        this.updateView = updateViewCallback;
        this.frameData = []
        this.algorithms = {
            [DFS]: new DFSPathFinder([])
        }
        this.algorithmRunner = new AlgorithmRunner();
        this.currentFrame = 0;
        this.stepTimer = null;

        this.runSteps = this.runSteps.bind(this);
        this.runSubsteps = this.runSubsteps.bind(this);
    }

    initialize(layout: Layout, start: NodeIdentifier, goal: NodeIdentifier,
               algorithmName: string, algOptions?: AlgorithmOptions) {

        if (this.frameData.length === 0) {

            this.frameData.push([
                layout.reduce(
                    (accumulator: AlgorithmPayload[] , row, rowNum ) => {
                        return accumulator.concat(
                            row.map((nodeData, colNum) => {
                                return {
                                    row: rowNum,
                                    col: colNum,
                                    type: nodeData.type
                                }
                            })
                        )}, [])
            ]);
            const graph: Graph2D = new Graph2D(layout, start, goal);

            const algorithm: Algorithm = this.algorithms[algorithmName];
            algorithm.initialize(graph);
            this.frameData = this.frameData.concat(this.algorithmRunner.getAlgorithmFrameData(algorithm));
            console.log("Frame data");
            console.log(this.frameData);
            this.currentFrame = 0;




        }

    }

    run() {

        if (this.currentFrame >= this.frameData.length) {
            this.currentFrame = 0;
        }

        this.runSteps();

    }

    runSteps(startFrame: number = 0) {

        const _this: VisualizationController = this;
        this.stepTimer = setTimeout(async function callRunSubsteps() {
            await _this.runSubsteps(0, _this.frameData[_this.currentFrame].length);
            _this.currentFrame++;
            if (_this.currentFrame < _this.frameData.length) {
                _this.stepTimer = setTimeout(callRunSubsteps, 15)
            }

        }, 15);
    }

    runSubsteps(currSubstsep: number, numSubsteps: number): Promise<void> {


        return new Promise((resolve, reject) => {
            const _this: VisualizationController = this;
            setTimeout(function update(substep: number = 0){
                _this.updateView(_this.frameData[_this.currentFrame][substep]);

                substep++;
                console.log("Current Substep:", substep);

                if (substep < numSubsteps) {
                    setTimeout(update, 10, substep);
                }
                else {
                    resolve();
                }
            }, 10);

        });

    }

    pause() {
        if (this.stepTimer !== null) {
            clearTimeout(this.stepTimer);
        }
    }

    runSubstep(currSubstep: number, numSubsteps: number, resolve: Function) {
        this.updateView(this.frameData[this.currentFrame][currSubstep])

        currSubstep++;
        if (currSubstep < numSubsteps) {
            // setTimeout()
        }
    }

    clearFrameData() {
        this.frameData = [];
    }
}

export default VisualizationController;