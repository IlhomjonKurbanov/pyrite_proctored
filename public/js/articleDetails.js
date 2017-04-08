// articleDetails.js
// =================
// full set of details for each combination of the article variables

angular.module('pyrite').constant("articleDetails", {
    "quantity" : 2,
    0: {
        "images": 0,
        "videos": 0,
        "audioClips": 0,
        "links": 0,
        "fontSize": 10,
        "fontFamily": "serif",
        "navbar": "relative"
    },
    1: {
        "images": 0,
        "videos": 0,
        "audioClips": 0,
        "links": 0,
        "fontSize": 10,
        "fontFamily": "serif",
        "navbar": "fixed" //vary one attribute at a time
    }
    //and so on
});
