import Graph2D from "../visualization/Graph2D";
import {START, NORMAL, OBSTACLE, LO_WEIGHT, MED_WEIGHT, HI_WEIGHT} from "../constants/NodeTypes";
import INeighbor from "../interfaces/INeighbor";

const layout: {type: string}[][] = [
    [{type: START}, {type: NORMAL}, {type: MED_WEIGHT}],
    [{type: OBSTACLE}, {type: NORMAL}, {type: OBSTACLE}],
    [{type: LO_WEIGHT}, {type: HI_WEIGHT}, {type: NORMAL}]
]

const graph2D = new Graph2D(layout);

test('Graph2D gets only valid neighbors', () => {
    const res: INeighbor[] = [
        {encoding: "0-1", cost: 1}, {encoding: "1-0", cost: Number.POSITIVE_INFINITY},
        {encoding: "1-1", cost: 1.4}
    ]

    res.forEach((neighbor: INeighbor) => {
        expect(graph2D.getNeighbors(0, 0)).toContainEqual(neighbor);
    })
})

test("Graph2D gets all neighbors", () => {
    const res = [
        {encoding: "0-0", cost: 1.4}, {encoding: "0-1", cost: 1}, {encoding: "0-2", cost: 10 * 1.4},
        {encoding: "1-0", cost: Number.POSITIVE_INFINITY}, {encoding: "1-2", cost: Number.POSITIVE_INFINITY},
        {encoding: "2-0", cost: 5 * 1.4}, {encoding: "2-1", cost: 15}, {encoding: "2-2", cost: 1.4}
    ]

    const neighbors: INeighbor[] = graph2D.getNeighbors(1, 1);

    expect(neighbors.length).toBe(8);
    res.forEach((neighbor: INeighbor) => {
        expect(neighbors).toContainEqual(neighbor);
    })
});