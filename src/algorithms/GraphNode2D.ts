import GraphNode from "../interfaces/GraphNode";

interface GraphNode2D extends GraphNode {
    row: number,
    col: number,
    heuristic?: number
}

export default GraphNode2D;