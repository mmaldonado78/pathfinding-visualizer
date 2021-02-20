interface Heuristic {
    calcHeuristic(row1: number, col1: number,
                  row2: number, col2: number): number;
}

export default Heuristic;