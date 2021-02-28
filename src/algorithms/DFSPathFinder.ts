import Algorithm from "../interfaces/Algorithm";
import GraphNode2D from "./GraphNode2D";
import Graph2D from "../visualization/Graph2D";
import NodeState from "../constants/NodeState";
import INeighbor from "../interfaces/INeighbor";
import IProcessedNode from "../interfaces/IProcessedNode";

class DFSPathFinder implements Algorithm {

    private stack: INeighbor[];
    private backPointers: Map<GraphNode2D, GraphNode2D | null>;
    private graph: Graph2D | null;
    private fringedNodes: Map<string, GraphNode2D>;
    private visitedNodes: Map<string, GraphNode2D>;
    private foundGoal: boolean;

    constructor(stack: INeighbor[]) {
        this.stack = stack;
        this.backPointers = new Map<GraphNode2D, GraphNode2D | null>();
        this.graph = null;
        this.fringedNodes = new Map<string, GraphNode2D>()
        this.visitedNodes = new Map<string, GraphNode2D>();
        this.foundGoal = false;
    }

    step(): IProcessedNode[][] {

        let visited: IProcessedNode[] = [];
        let fringed: IProcessedNode[] = [];
        let visitedObtsalces: IProcessedNode[] = [];

        if (this.graph === null) {
            throw Error("Algorithm not correctly initialized");
        }

        if (this.stack.length === 0 || this.foundGoal) {
            return [];
        }

        const {encoding}: INeighbor = this.stack.pop() as INeighbor;
        const currNode: GraphNode2D = this.fringedNodes.get(encoding) as GraphNode2D;
        this.fringedNodes.delete(encoding);

        this.visitedNodes.set(encoding, currNode);
        visited.push({
            node: [currNode.row, currNode.col],
            state: NodeState.VISITED
        });

        if (!this.graph.isGoal([currNode.row, currNode.col])) {

            const notVisitedNeighbors: INeighbor[] = this.graph.getNeighbors([currNode.row, currNode.col])
                .filter(({encoding}: INeighbor) =>
                    !this.fringedNodes.has(encoding) && !this.visitedNodes.has(encoding)
                );

            notVisitedNeighbors.forEach((neighbor) => {
                const {encoding, node, cost} = neighbor;
                const [row, col] = node;

                if (cost === Number.POSITIVE_INFINITY) {
                    visitedObtsalces.push({
                        node: node,
                        state: NodeState.VISITED_OBSTACLE
                    })

                    this.visitedNodes.set(encoding, {
                        row: row,
                        col: col,
                        cost: cost}
                        );
                }

                else {

                    const neighborNode: GraphNode2D = {
                        row: row,
                        col: col,
                        cost: cost + currNode.cost
                    }

                    this.stack.push(neighbor);
                    this.fringedNodes.set(encoding, neighborNode);
                    fringed.push({
                        node: node,
                        state: NodeState.FRINGED
                    })

                    this.backPointers.set(neighborNode, currNode);
                }
            })
        }

        else {
            this.foundGoal = true;
        }

        return [[...visited, ...fringed, ...visitedObtsalces]];
    }

    constructPath(): Index2D[] {
        if (this.graph === null) {
            throw Error("Algorithm not initialized correctly");
        }


        let path: Index2D[] = [];

        const goalNode: INeighbor = this.graph.getGoal();
        if (!this.visitedNodes.has(goalNode.encoding)) {
            console.log("Goal node was not found.");
            return [];
        }

        let currParent: GraphNode2D | null = this.visitedNodes.get(goalNode.encoding) as GraphNode2D;

        while (currParent !== null) {
            path.push([currParent.row, currParent.col]);
            currParent = this.backPointers.get(currParent) as GraphNode2D;
        }

        return path.reverse();
    }

    initialize(graph: Graph2D) {
        this.graph = graph;
        this.stack = [];
        this.fringedNodes.clear();
        this.backPointers.clear();
        this.visitedNodes.clear();
        this.foundGoal = false;

        const start: INeighbor = this.graph.getStart();
        const {encoding, cost, node} = start;
        this.stack.push(start);

        const [row, col] = node;
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