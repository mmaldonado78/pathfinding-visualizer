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
    private paused: boolean;

    private currSubstep: Promise<void>;
    private terminate: boolean;

    constructor(updateViewCallback: Function) {
        this.updateView = updateViewCallback;
        this.frameData = []
        this.algorithms = {
            [DFS]: new DFSPathFinder([])
        }
        this.algorithmRunner = new AlgorithmRunner();
        this.currentFrame = 0;
        this.stepTimer = null;
        this.currSubstep = Promise.resolve();
        this.paused = false;
        this.terminate = false;

        this.runSteps = this.runSteps.bind(this);
        this.runSubsteps = this.runSubsteps.bind(this);
        this.runStep = this.runStep.bind(this);
    }

    initialize(layout: Layout, start: NodeIdentifier, goal: NodeIdentifier,
               algorithmName: string, algOptions?: AlgorithmOptions): void {

        if (this.frameData.length > 0) {
            return
        }

        const baseFrameData = layout.reduce(
                (substep: AlgorithmPayload[] , row, rowNum ) => {
                    return substep.concat(
                        row.map((nodeData, colNum) => {
                            return {
                                row: rowNum,
                                col: colNum,
                                type: nodeData.type
                            }
                        })
                    )}, []);
        const graph: Graph2D = new Graph2D(layout, start, goal);

        const algorithm: Algorithm = this.algorithms[algorithmName];
        algorithm.initialize(graph);
        this.frameData = [[baseFrameData], ...this.algorithmRunner.getAlgorithmFrameData(algorithm)];
        this.currentFrame = 1;

    }

    run() {

        if (this.currentFrame >= this.frameData.length) {
            this.currentFrame = 0;
        }
        this.paused = false;
        this.terminate = false;

        this.runSteps();

    }

    private runSteps(startFrame: number = 0) {

        const _this: VisualizationController = this;
        this.stepTimer = setTimeout(async function callRunSubsteps() {
            console.log("Current frame:", _this.currentFrame);

            // avoid running another step if we pause right after the check if we
            // should run another step
            if (!_this.paused && !_this.terminate) {
                _this.currSubstep = _this.runSubsteps(0, _this.frameData[_this.currentFrame].length);
                await _this.currSubstep;

                _this.currentFrame++;
            }

            if (_this.currentFrame < _this.frameData.length && !_this.paused
                && !_this.terminate) {
                _this.stepTimer = setTimeout(callRunSubsteps, 15)
            }

        }, 15);
    }

    private runSubsteps(currSubstsep: number, numSubsteps: number): Promise<void> {


        return new Promise((resolve, reject) => {
            const _this: VisualizationController = this;
            setTimeout(function update(substep: number = 0){

                _this.updateView(_this.frameData[_this.currentFrame][substep]);
                substep++;

                if (substep < numSubsteps && !_this.terminate) {
                    setTimeout(update, 10, substep);
                }
                else {
                    resolve();
                }
            }, 10);

        });

    }

    /**
     * Returns a promise that resolves after the current step has
     * finished displaying all of its substeps.
     */
    pause(): Promise<void> {

        return this.currSubstep.then(() => {
            this.paused = true;
        })

    }

    runStep(): Promise<void> {
        if (this.currentFrame >= this.frameData.length) {
            this.currentFrame = 0;
        }

        return this.runSubsteps(0, this.frameData[this.currentFrame].length)
            .then(() => {this.currentFrame++});
    }

    endVisualization() {
        this.terminate = true
        return this.currSubstep.then(() => {
            if (this.frameData.length > 0) {
                this.updateView(this.frameData[0][0]);
            }
            this.frameData = [];
        });

    }
}

export default VisualizationController;
