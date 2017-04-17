// articleDetails.js
// =================
// full set of details for each combination of the article variables

angular.module('pyrite').constant("articlesConfig", {
    "NUMBER_OF_ARTICLES" : 5,
    "ARTICLE_ATTRIBUTES" : [
        "fontSize",
        "fontType",
        "linkRatio",
        "imageRatio",
        "audio",
        "video",
        "unsolicitedVideo",
        "navbarPosition"
    ],
    "ATTRIBUTE_VALUES" : {
        "fontSize"         : [10, 12, 14, 16, 18],
        "fontType"         : ["serif", "sans-serif"],
        "linkRatio"        : [],
        "imageRatio"       : [],
        "audio"            : [true, false],
        "video"            : [true, false],
        "unsolicitedVideo" : [true, false],
        "navbarPosition"   : ["fixed", "relative"]
    }
});
