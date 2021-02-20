import Graph from "./Graph";
import IProcessedNode from "./IProcessedNode";
import Heuristic from "./Heuristic";

interface Algorithm {

    step(): Array<Array<IProcessedNode>>;
    constructPath(): Array<Array<number>>;
    initialize(graph: Graph, heuristic?: Heuristic): void;
    reset(): void;

}

export default Algorithm;