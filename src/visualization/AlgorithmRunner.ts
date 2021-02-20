import IProcessedNode from "../interfaces/IProcessedNode";

class AlgorithmRunner {

    private steps: Array<Array<IProcessedNode>>;

    constructor() {
        this.steps = [];
    }
}

export default AlgorithmRunner;