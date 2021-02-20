import AlgorithmOptions from "../interfaces/AlgorithmOptions";

class VisualizationController {

    private updateView: Function;

    constructor(updateViewCallback: Function) {
        this.updateView = updateViewCallback;
    }

    initialize(layout: Array<Array<{type: string}>>,
               algorithmName: string, algOptions: AlgorithmOptions) {

    }

}

export default VisualizationController;