import Algorithm from "../interfaces/Algorithm";
import ProcessedNode2D from "./ProcessedNode2D";
import Neighbor2D from "../visualization/Neighbor2D";
import GraphNode2D from "./GraphNode2D";
import Graph2D from "../visualization/Graph2D";
import NodeState from "../constants/NodeState";

class DFSPathFinder implements Algorithm {

    private stack: Neighbor2D[];
    private backPointers: Map<GraphNode2D, GraphNode2D | null>;
    private graph: Graph2D | null;
    private fringedNodes: Map<string, GraphNode2D>;
    private visitedNodes: Map<string, GraphNode2D>;
    private foundGoal: boolean;

    constructor(stack: Neighbor2D[]) {
        this.stack = stack;
        this.backPointers = new Map<GraphNode2D, GraphNode2D | null>();
        this.graph = null;
        this.fringedNodes = new Map<string, GraphNode2D>()
        this.visitedNodes = new Map<string, GraphNode2D>();
        this.foundGoal = false;
    }

    step(): ProcessedNode2D[][] {

        let visited: ProcessedNode2D[] = [];
        let fringed: ProcessedNode2D[] = [];
        let visitedObtsalces: ProcessedNode2D[] = [];

        if (this.graph === null) {
            throw Error("Algorithm not correctly initialized");
        }

        if (this.stack.length === 0) {
            return [];
        }

        const {encoding}: Neighbor2D = this.stack.pop() as Neighbor2D;
        const currNode: GraphNode2D = this.fringedNodes.get(encoding) as GraphNode2D;
        this.fringedNodes.delete(encoding);

        this.visitedNodes.set(encoding, currNode);
        visited.push({
            row: currNode.row,
            col: currNode.col,
            state: NodeState.VISITED
        });

        if (!this.graph.isGoal([currNode.row, currNode.col])) {

            const notVisitedNeighbors: Neighbor2D[] = this.graph.getNeighbors([currNode.row, currNode.col])
                .filter(({encoding}: Neighbor2D) =>
                    !this.fringedNodes.has(encoding) && !this.visitedNodes.has(encoding)
                );

            notVisitedNeighbors.forEach((neighbor) => {
                const {encoding, row, col, cost} = neighbor;

                if (cost === Number.POSITIVE_INFINITY) {
                    visitedObtsalces.push({
                        row: row,
                        col: col,
                        state: NodeState.VISITED_OBSTACLE
                    })

                    this.visitedNodes.set(encoding, {
                        row: row,
                        col: col,
                        cost: cost}
                        );
                }

                else {

                    this.fringedNodes.set(encoding, {
                        row: row,
                        col: col,
                        cost: cost + currNode.cost
                    });

                    fringed.push({
                        row: row,
                        col: col,
                        state: NodeState.FRINGED
                    })

                    this.backPointers.set(neighbor, currNode);
                }
            })
        }

        else {
            this.foundGoal = true;
        }

        return [[...visited, ...fringed, ...visitedObtsalces]];
    }

    constructPath(): Index2D[] {
        return [];
    }

    initialize(graph: Graph2D) {
        this.graph = graph;
        this.stack = [];
        this.fringedNodes.clear();
        this.backPointers.clear();
        this.visitedNodes.clear();
        this.foundGoal = false;

        const start: Neighbor2D = this.graph.getStart();
        const {encoding, cost, row, col} = start;
        this.stack.push(start);
        const startNode: GraphNode2D = {
            row: row,
            col: col,
            cost: cost
        }

        this.fringedNodes.set(encoding, startNode);

        this.backPointers.set(startNode, null);


    }

    goalFound(): boolean {
        return this.foundGoal;
    }


    reset() {
        this.stack = [];

    }
}

export default DFSPathFinder;