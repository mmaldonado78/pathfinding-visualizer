import INeighbor from "./INeighbor";

/**
 * Translates a representation of a graph or grid structure into a graph.
 */
interface Graph {

    /**
     * Returns all neighbors of a graph node, including impassible obstacles.
     * @param row of Node
     * @param col of Node
     */
    getNeighbors(row: number, col: number): INeighbor[];

}

export default Graph;