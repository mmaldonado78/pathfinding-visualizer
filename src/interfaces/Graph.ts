import INeighbor from "./INeighbor";
import GraphNode from "./GraphNode";

/**
 * Translates a representation of a graph or grid structure into a graph.
 */
interface Graph {

    /**
     * Returns all neighbors of a graph node, including impassible obstacles.
     * @param nodeIdentifier unique identifier of a node
     */
    getNeighbors(nodeIdentifier: NodeIdentifier): INeighbor[];

    isGoal(nodeIdentifier: NodeIdentifier): boolean;

    getStart(): GraphNode;

}

export default Graph;