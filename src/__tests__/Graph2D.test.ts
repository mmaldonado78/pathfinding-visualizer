import Graph2D from "../visualization/Graph2D";
import {START, NORMAL, OBSTACLE, LO_WEIGHT, MED_WEIGHT, HI_WEIGHT} from "../constants/NodeTypes";
import GraphNode2D from "../algorithms/GraphNode2D";
import Neighbor2D from "../visualization/Neighbor2D";
import INeighbor from "../interfaces/INeighbor";

const layout: Layout = [
    [{type: START}, {type: NORMAL}, {type: MED_WEIGHT}],
    [{type: OBSTACLE}, {type: NORMAL}, {type: OBSTACLE}],
    [{type: LO_WEIGHT}, {type: HI_WEIGHT}, {type: NORMAL}]
]

const graph2D = new Graph2D(layout, [0, 0]);
const sortNodes = (nodeA: INeighbor, nodeB: INeighbor) => {
    const [a_row, a_col] = nodeA.node;
    const [b_row, b_col] = nodeB.node;

    if (nodeA.cost - nodeB.cost !== 0 &&
        !(nodeA.cost === Number.POSITIVE_INFINITY && nodeB.cost === Number.POSITIVE_INFINITY)) {
        return nodeA.cost - nodeB.cost;
    }
    else if (a_row - b_row !== 0){
        return a_row - b_row;
    }
    else {
        return a_col - b_col;
    }
}

test('Graph2D gets only valid neighbors', () => {
    const res: INeighbor[] = [
        {row: 0, col: 1, cost: 1}, {row: 1, col:0, cost: Number.POSITIVE_INFINITY},
        {row: 1, col:1, cost: 1.4}
        ].map(({row, col, cost}) =>  {
            return {node: [row, col], encoding: `${row}-${col}`, cost: cost}
        });

    expect(graph2D.getNeighbors([0, 0]).sort(sortNodes))
        .toEqual(res.sort(sortNodes));

})

test("Graph2D gets all neighbors", () => {
    const res: INeighbor[] = [
        {row: 0, col: 0, cost: 1.4}, {row: 0, col: 1, cost: 1}, {row: 0, col: 2, cost: 10 * 1.4},
        {row: 1, col: 0, cost: Number.POSITIVE_INFINITY}, {row: 1, col: 2, cost: Number.POSITIVE_INFINITY},
        {row: 2, col: 0, cost: 5 * 1.4}, {row: 2, col: 1, cost: 15}, {row: 2, col: 2, cost: 1.4}
    ].map(({row, col, cost}) =>  {
        return {node: [row, col], cost, encoding: `${row}-${col}`}
    });

    expect(graph2D.getNeighbors([1, 1]).sort(sortNodes))
        .toEqual(res.sort(sortNodes));
});

