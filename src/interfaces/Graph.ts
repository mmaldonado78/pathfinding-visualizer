import INeighbor from "./INeighbor";

interface Graph {

    cost: number;

    /**
     * Returns
     * @param row of Node
     * @param col of Node
     */
    getNeighbors(row: number, col: number): INeighbor[];

    encode(row: number, col: number): string;

}

export default Graph;