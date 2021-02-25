import Graph from "../interfaces/Graph";
import {HI_WEIGHT, LO_WEIGHT, MED_WEIGHT, NORMAL, OBSTACLE, GOAL} from "../constants/NodeTypes";
import Neighbor2D from "./Neighbor2D";
import GraphNode2D from "../algorithms/GraphNode2D";

class Graph2D implements Graph {

    private layout: Array<Array<{type: string}>>;
    private start: Index2D;
    private rows: number
    private cols: number;

    constructor(layout: Layout, start: Index2D) {
        this.layout = layout;
        this.rows = layout.length;
        this.cols = layout[0].length;
        this.start = start;
    }

    getNeighbors(nodeIndex: Index2D): Neighbor2D[] {
        const [row, col]: Index2D = nodeIndex;
        let candidates: Index2D[] = [
            [row + 1, col + 1], [row + 1, col], [row + 1, col - 1],
            [row, col + 1], [row, col - 1],
            [row - 1, col + 1], [row - 1, col], [row - 1, col - 1]
        ]

        candidates = candidates.filter(([cand_row, cand_col]) => {
            return (cand_row >= 0 && cand_row < this.rows &&
                cand_col >= 0 && cand_col < this.cols);
        });

        return candidates.map(([cand_row, cand_col]) => {
            const neighborType = this.layout[cand_row][cand_col].type;
            const isDiagonal = Math.abs(cand_row - row) + Math.abs(cand_col - col) === 2;

            return {
                encoding: `${cand_row}-${cand_col}`,
                cost: this.assignCost(neighborType, isDiagonal),
                row: cand_row,
                col: cand_col
            };
        });
    }

    isGoal(index: Index2D) {
        const [row, col]: Index2D = index;
        return this.layout[row][col].type === GOAL;
    }

    getStart(): Neighbor2D {
        const [s_row, s_col] = this.start;
        return {
            encoding: `${s_row}-${s_col}`,
            cost: 0,
            row: s_row,
            col: s_col
        };
    }

    private assignCost(neighborType: string, isDiagonal: boolean): number {

        let cost: number;

        switch(neighborType) {
            case NORMAL:
                cost = 1;
                break;
            case LO_WEIGHT:
                cost = 5;
                break;
            case MED_WEIGHT:
                cost = 10;
                break;
            case HI_WEIGHT:
                cost = 15;
                break;
            case OBSTACLE:
                cost = Number.POSITIVE_INFINITY;
                break;
            default:
                cost = 1
        }

        if (isDiagonal) {
            cost *= 1.4
        }

        return cost;
    }
}

export default Graph2D;