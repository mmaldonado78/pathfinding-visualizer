import PriorityQueue from "../../ds/PriorityQueue";

describe("Testing single insert:", () => {
    let pq: PriorityQueue<number>;

    beforeEach(() => {
        pq = new PriorityQueue(
            (num1, num2) => num1 - num2,
            [1, 5, 7, 6, 8, 10, 14, 20]
            );
    });

    test("new highest priority item", () => {
        pq.insert(-1);
        expect(Array.from(pq)).toEqual([-1, 1, 7, 5, 8, 10, 14, 20, 6]);
    });

    test("new lowest priority item", () => {
        pq.insert(22);
        expect(Array.from(pq)).toEqual([1, 5, 7, 6, 8, 10, 14, 20, 22]);
    });

    test("new item in middle", () => {
        pq.insert(3);
        expect(Array.from(pq)).toEqual([1, 3, 7, 5, 8, 10, 14, 20, 6]);
    })

});

describe("Testing multiple insert", () => {
    let pq:PriorityQueue<number>;

    // beforeEach(() => {
    //     pq = new PriorityQueue<number>((num1, num2) => num1 - num2)
    // })

    describe("empty priority queue", () => {

        beforeEach(() => {
            pq = new PriorityQueue<number>((num1, num2) => num1 - num2);
        });

        test("increasing sequence", () => {
            const toInsert = [1, 3, 5, 7, 8, 10, 12, 14]
            toInsert.forEach(pq.insert)

            expect(Array.from(pq)).toEqual(toInsert)
        });

        test("decreasing sequence", () => {
            const toInsert = [54, 23, 10, 8, 2, -15, -40, -100, -200]
            toInsert.forEach(pq.insert)

            expect(Array.from(pq)).toEqual([-200, -100, -15, -40, 10, 23, 2, 54, 8])
        })
    });

    describe("non-empty priority queue", () => {
        beforeEach(() => {
            pq = new PriorityQueue<number>(
                (num1, num2) => num1 - num2,
                [-20, -10, -19, 0, 30, 5, 1]
            );
        });

        test("inserts at beginning", () => {
            const toInsert = [];

        })
    })


})
