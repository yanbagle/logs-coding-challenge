'use strict';
const { mergeSortedArrays } = require('./merge-sort');

module.exports = (logSources) => {

    let logsArray = [];

    for (let logSource of logSources) {
    	setLogs(logSource, []);
    }

    function setLogs (logSource, source) {
        logSource.popAsync().then((res) => {
            if (res !== false) {
            	source.push(res);
            	// recursively call the function for as long as we are still seeing logs from the same source
                setLogs(logSource, source);
            } else if (res === false) {
                logsArray.push(source);
                if (logsArray.length === logSources.length) {
                	// done, merge the arrays
                    mergeSortedArrays(logsArray);
                }
            }
        }).catch(
            // Log the rejection reason
            (reason) => {
                console.log('Handle rejected promise ('+reason+') here.');
            });
    }


}

