exports.attributeValues = {
    'linkRatio'  : [-1, 200, 50], //words per link
    'video'      : [0, 1, 2],
    'imageRatio' : [-1, 500, 100], //words per image
    'wordCount'  : [150, 400, 700],
    'fontSize'   : [10, 12, 14, 16, 18],
    'serifP'     : [0, 1],
    'navbarP'    : [0, 1]
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
    'imageAlign'         : ['left', 'right', 'full']
}

exports.navbarColors = {
    0 : { 'background': '#ad1f1f', 'hover': '#841616'}, //red
    1 : { 'background': '#c17005', 'hover': '#9b5903'}, //orange
    2 : { 'background': '#6b9607', 'hover': '#517205'}, //green
    3 : { 'background': '#04916e', 'hover': '#027256'}, //teal
    4 : { 'background': '#0378a3', 'hover': '#025d7f'}, //blue
    5 : { 'background': '#7e018e', 'hover': '#4a0054'}, //purple
}

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
    'data/video1.jpg',
    'data/video2.jpg'
]
