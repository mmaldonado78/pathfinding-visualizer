import NodeState from "../constants/NodeState";

/**
 * Contains information about how a node was processed
 */
interface IProcessedNode {
    row: number;
    col: number;
    state: NodeState;
}

export default IProcessedNode;