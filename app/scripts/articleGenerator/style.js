// style.js
// ========
// functions for building article styles

// create style to center elements (title, video, and image, if image is
// positioned at beginning of article)
exports.center = function(ID, video, absent, images, firstImagePosition) {
    return '#article-start-' + ID + '{text-align:center}';
}

// create style of the page content wrapper
exports.wrapper = function(ID) {
    return '#page-content-' + ID + '{padding:15px;max-width:740px;margin-left:auto;margin-right:auto;}'
}

// create font size style
// ======================
// input: ID, fontSize object ({'article' : value, 'title' : value})
// output: styling for article text and article title
exports.fontSize = function(ID, fontSize) {
    //article text size
    var data = '#navbar-' + ID + ' li,#page-content-' + ID + ' p{';
    data += 'font-size:' + fontSize.article + 'px;}';

    //article title size
    data += '#page-content-' + ID + ' h1{';
    data += 'font-size:' + fontSize.title + 'px;}';
    return data;
}

// create font face style (serif or sans-serif)
exports.fontFace = function(ID, serifP) {
    var data = '#navbar-' + ID + ',#page-content-' + ID + '{';
    data += 'font-family:';
    data += (serifP) ? 'serif' : 'sans-serif';
    data += ';}';
    return data;
}

// create styles for navbar, with provided colors
exports.navbar = function(ID, colors) {
    var data = '#navbar-background-' + ID + '{background-color:' + colors.background + ';}';
    data += '#navbar-' + ID + '{list-style-type:none;margin:0;padding:0;overflow:hidden;max-width:740px;margin-left:auto;margin-right:auto;text-align:center;}';
    data += '#navbar-' + ID + ' li{display:inline;}';
    data += '#navbar-' + ID + ' a{display:inline-block;color:white;text-align:center;padding:14px 16px;text-decoration:none;}';
    data += '#navbar-' + ID + ' li a:hover{background-color:' + colors.hover + ';}';
    return data;
}

// create style for video height
exports.videoHeight = function(ID, height) {
    return '#video-' + ID + '{height:' + height + 'px;}';
}

exports.globalImageStyling = function(ID) {
    return '#page-content-' + ID + ' img{margin:5px;}';
}

// create styles for all images
exports.images = function(ID, images, imageWidths, imageFloats, firstImagePosition) {
    var data = '';
    for (var i = 1; i <= images; i++) {
        data += '#image-' + ID + '-' + i + '{';
        data += 'width:' + imageWidths[i - 1] + 'px;'; //arrays are 0-based
        if (!(firstImagePosition == 'top' && i == images)) {
            data += 'float:' + imageFloats[i - 1] + ';'; //arrays are 0-based
        }
        data += '}';
    }
    return data;
}
