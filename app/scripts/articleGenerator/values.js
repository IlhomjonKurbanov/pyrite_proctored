//URGENT: keep in sync w/ articlesConfig.ATTRIBUTE_VALUES
exports.attributeValues = {
    'linkDensity'   : [0, .00214362, 0.00701098, 0.01743092], //links per word: none, low, medium, hihg density
    'video'         : [0, 1],// 2], added if time allows
    'images'        : [0, 3, 6],
    'wordCount'     : [348, 644, 1070],
    'fontSize'      : [ //using objects so that titles scale with body font size
        { 'article' : 13, 'title' : 30 },
        { 'article' : 16, 'title' : 38 },
        { 'article' : 19, 'title' : 46 }
    ],
    'serifP'        : [0, 1],
    //'navbarP'       : [0, 1], (currently removed)
    'videoLocation' : [0, 1] // 0 = top, 1 = middle
}

exports.VIDEO_CODE = {
    'absent'  : 0,
    'present' : 1 //,
    //'follows' : 2
}

//video location code
exports.VIDEO_LOC_CODE = {
    'top'    : 0,
    'middle' : 1
}

// (currently removed)
// exports.NAVBARP_CODE = {
//     'static' : 0,
//     'fixed'  : 1
// }

//heights for images, videos
exports.dimensions = [250, 325, 400]

// (navbar currently removed)
// exports.navbarColors = [
//     { 'background': '#ad1f1f', 'hover': '#841616' }, //red
//     { 'background': '#c17005', 'hover': '#9b5903' }, //orange
//     { 'background': '#6b9607', 'hover': '#517205' }, //green
//     { 'background': '#04916e', 'hover': '#027256' }, //teal
//     { 'background': '#0378a3', 'hover': '#025d7f' }, //blue
//     { 'background': '#7e018e', 'hover': '#4a0054' }, //purple
// ]

exports.images = [
    'data/img/img1.jpg',
    'data/img/img2.jpg',
    'data/img/img3.jpg',
    'data/img/img4.jpg',
    'data/img/img5.jpg',
    'data/img/img6.jpg',
    'data/img/img7.jpg',
    'data/img/img8.jpg',
    'data/img/img9.jpg',
    'data/img/img10.jpg',
    'data/img/img11.jpg',
    'data/img/img12.jpg',
    'data/img/img13.jpg',
    'data/img/img14.jpg',
    'data/img/img15.jpg',
    'data/img/img16.jpg',
    'data/img/img17.jpg',
    'data/img/img18.jpg',
    'data/img/img19.jpg',
    'data/img/img20.jpg',
    'data/img/img21.jpg',
    'data/img/img22.jpg',
    'data/img/img23.jpg',
    'data/img/img24.jpg',
    'data/img/img25.jpg',
    'data/img/img26.jpg',
    'data/img/img27.jpg',
    'data/img/img28.jpg',
    'data/img/img29.jpg',
    'data/img/img30.jpg',
    'data/img/img31.jpg',
    'data/img/img32.jpg',
    'data/img/img33.jpg',
    'data/img/img34.jpg',
    'data/img/img35.jpg',
    'data/img/img36.jpg',
    'data/img/img37.jpg',
    'data/img/img38.jpg',
    'data/img/img39.jpg',
    'data/img/img40.jpg'
]

exports.videos = [
    'data/video/video1.mp4',
    'data/video/video2.mp4',
    'data/video/video3.mp4',
    'data/video/video4.mp4',
    'data/video/video5.mp4',
    'data/video/video6.mp4',
    'data/video/video7.mp4',
    'data/video/video8.mp4',
    'data/video/video9.mp4',
    'data/video/video10.mp4',
    'data/video/video11.mp4',
    'data/video/video12.mp4',
    'data/video/video13.mp4',
    'data/video/video14.mp4',
    'data/video/video15.mp4'
]
