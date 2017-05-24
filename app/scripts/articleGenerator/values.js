exports.attributeValues = {
    'linkRatio'     : [-1, 200, 50], //words per link
    'video'         : [0, 1, 2],
    'imageRatio'    : [-1, 500, 100], //words per image
    'wordCount'     : [150, 400, 700],
    'fontSize'      : [ //using objects so that titles scale with body font size
        { 'article' : 14, 'title' : 32 },
        { 'article' : 16, 'title' : 38 },
        { 'article' : 18, 'title' : 44 }
    ],
    'serifP'        : [0, 1],
    'navbarP'       : [0, 1]
}

exports.BOOL = {
    'false' : 0,
    'true'  : 1
}

exports.VIDEO_CODE = {
    'absent'  : 0,
    'present' : 1,
    'follows' : 2
}

exports.NAVBARP_CODE = {
    'static' : 0,
    'fixed'  : 1
}

exports.positions = {
    'videoPosition'      : ['top', 'middle'],
    'firstImagePosition' : ['top', 'middle'],
    'imageFloat'         : ['left', 'right']
}

//widths for images, heights for videos
exports.dimensions = [250, 300, 350]

exports.navbarColors = [
    { 'background': '#ad1f1f', 'hover': '#841616' }, //red
    { 'background': '#c17005', 'hover': '#9b5903' }, //orange
    { 'background': '#6b9607', 'hover': '#517205' }, //green
    { 'background': '#04916e', 'hover': '#027256' }, //teal
    { 'background': '#0378a3', 'hover': '#025d7f' }, //blue
    { 'background': '#7e018e', 'hover': '#4a0054' }, //purple
]

exports.images = [
    'data/img1.jpg',
    'data/img2.jpg',
    'data/img3.jpg',
    'data/img4.jpg',
    'data/img5.jpg',
    'data/img6.jpg',
    'data/img7.jpg'
]

exports.videos = [
    'data/video1.mp4',
    'data/video2.mp4'
]
