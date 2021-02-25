import INeighbor from "../interfaces/INeighbor";

interface Neighbor2D extends INeighbor {
    row: number,
    col: number,
}

export default Neighbor2D;