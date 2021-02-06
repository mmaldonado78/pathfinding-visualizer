const DFS = "Depth First Search";
const BFS = "Breadth First Search";
const UCS = "Uniform Cost Search";
const A_STAR = "A*";

const NO_WEIGHTS = [BFS, DFS]
const NO_HEURISTIC = [BFS, DFS, UCS]

export {DFS, BFS, UCS, A_STAR, NO_HEURISTIC, NO_WEIGHTS};
export default [BFS, DFS, UCS, A_STAR];
