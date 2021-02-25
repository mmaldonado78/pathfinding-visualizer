import NodeState from "../constants/NodeState";

/**
 * Contains information about how a node was processed
 */
interface IProcessedNode {
    state: NodeState;
}

export default IProcessedNode;