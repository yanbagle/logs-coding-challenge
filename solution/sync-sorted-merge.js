'use strict';
const { mergeSortedArrays } = require('./merge-sort');

module.exports = (logSources) => {

	let logsArray = [];

	for (let logSource of logSources) {
		let source = [];
		let entry = logSource.pop();
		while(entry) {
			source.push(entry);
            entry = logSource.pop();
        }
        logsArray.push(source);
	}

    mergeSortedArrays(logsArray);

};