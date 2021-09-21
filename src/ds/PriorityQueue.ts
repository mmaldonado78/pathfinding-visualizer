import Comparator from "../interfaces/Comparator";
class PriorityQueue<T> {

    private arr: T[];
    private size: number;
    private compareFunc: Comparator<T>

    /**
     * Initializes a priority queue with a comparator function and an optional collection of initial items
     * @param compareFunc Function determining priority of two queue elements
     * @param iterable Collection of items to build initial priority queue
     */
    constructor(compareFunc: Comparator<T>, iterable: Iterable<T> = []) {

        // assuming valid heap given
        this.arr = Array.from(iterable);
        this.size = this.arr.length;
        this.compareFunc = compareFunc;
    }

    /**
     * Inserts an item into the priority queue
     * @param item Item to add to the priority queue
     */
    insert = (item: T) => {
        if (this.size === this.arr.length) {
            this.arr.push(item);
        }
        else {
            this.arr[this.size] = item;
        }

        this.size++;
        this.siftUp(this.size - 1);
    }

    /**
     * Moves an item higher in the priority queue if it has higher priority
     * @param index Position of item to sift up
     * @private
     */
    private siftUp(index: number) {
        let parentIndex = Math.floor((index - 1) / 2);
        while(index > 0 && this.compareFunc(this.arr[index],  this.arr[parentIndex]) < 0) {
            const tempItem: T = this.arr[parentIndex];
            this.arr[parentIndex] = this.arr[index];
            this.arr[index] = tempItem;

            index = parentIndex;
            parentIndex = Math.floor((index - 1) / 2);
        }

    }

    /**
     * Moves an item lower in the priority queue if it has lower priority
     * @param index Position of element to sift down
     * @private
     */
    private siftDown(index: number) {
        let validHeap: boolean = false;
        while ( 2 * index < this.size - 1 && !validHeap ) {
            let highPriorityChildInd = 2 * index + 1;
            if (
                highPriorityChildInd < this.size - 1 &&
                this.compareFunc(this.arr[highPriorityChildInd], this.arr[highPriorityChildInd + 1]) <= 0
            ) {
                highPriorityChildInd++;
            }

            validHeap = this.compareFunc(this.arr[index], this.arr[highPriorityChildInd]) <= 0;

            if ( !validHeap ) {
                const tempItem: T = this.arr[index];
                this.arr[index] = this.arr[highPriorityChildInd];
                this.arr[highPriorityChildInd] = tempItem;

                index = highPriorityChildInd;
            }
        }
    }

    /**
     * Returns an iterator for the priority queue with ordering based on the underlying heap representation of the items
     */
    [Symbol.iterator] = () => this.arr[Symbol.iterator]();

}

export default PriorityQueue;
