import Graph from "./Graph";
import IProcessedNode from "./IProcessedNode";
import Heuristic from "./Heuristic";

interface Algorithm {

    /**
     * Performs one operation of an algorithm.
     */

    step(): IProcessedNode[][];
    constructPath(): NodeIdentifier[];
    initialize(graph: Graph, heuristic?: Heuristic): void;
    goalFound(): boolean;
    reset(): void;

}

export default Algorithm;