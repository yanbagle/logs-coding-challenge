const Printer = require('./../lib/printer');
const MinHeap = require('min-heap');

exports.mergeSortedArrays = function mergeSortedArrays(logsArray) {
    const printer = new Printer();
    const minHeap = new MinHeap(function(l,r) {
        if (l.date > r.date) {
            return 1;
        } else {
            return -1;
        }
    });

    // take the 1st element of each row and insert into our min heap
    for (let i = 0; i < logsArray.length; i++) {
        minHeap.insert({
            date: logsArray[i][0].date,
            msg: logsArray[i][0].msg,
            row: i,
            col: 0
        });
    }

    // continue to add the rest of the logs to heap until heap is empty
    while (minHeap.size > 0) {
        // print our current min
        const currMin = minHeap.removeHead();
        printer.print(currMin);
        // go to the next log in our logs of the same source, it's the same row but next column
        const nextCol = currMin.col + 1;
        // only add to heap if log exists, not out of bounds
        if (logsArray[currMin.row][nextCol]) {
            minHeap.insert({
                date: logsArray[currMin.row][nextCol].date,
                msg: logsArray[currMin.row][nextCol].msg,
                row: currMin.row,
                col: nextCol
            });
        }
    }

    printer.done();
};
