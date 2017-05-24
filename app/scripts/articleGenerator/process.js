// process.js
// ==========
// functions for processing data structures

exports.randomSelect = function(values) {
    var index = Math.floor(Math.random() * values.length);
    return values[index];
}

exports.shuffle = function(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// break down paragraphs into individual words
// ===========================================
// input: array of paragraphs
// output: 3d array, arrays of words grouped by sentences, then paragraphs (data[paragraph#][sentence#][word#])
exports.paragraphsToWords = function(data) {
    for (var i = 0; i < data.length; i++) {
        //split paragraphs into sentences
        data[i] = data[i].split('.');
        data[i].pop(); //drop trailing empty item

        //split sentences into words
        for (var j = 0; j < data[i].length; j++) {
            data[i][j] = data[i][j].trim().split(' ');
        }
    }
    return data;
}

// combine individual words into paragraphs
// ========================================
// input: 3d array, arrays of words grouped by sentences, then paragraphs (data[paragraph#][sentence#][word#])
// output: array of paragraphs
exports.wordsToParagraphs = function(data) {
    for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
            data[i][j] = data[i][j].join(' ');
        }
        data[i] = data[i].join('. ') + '.';
    }
    return data;
}
