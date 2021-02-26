type Index2D = [number, number];
type Layout = Array<Array<{type: string, [propName: string]: any}>>

// types that can be used to uniquely identify each node
// depending on what kind of graph is used
type NodeIdentifier = Index2D
