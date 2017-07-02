exports.attributeValues = {
    'linkDensity'   : [0, 0.005, 0.02], //links per word
    'video'         : [0, 1],// 2], added if time allows
    'images'        : [0, 2, 4],
    'wordCount'     : [150, 400, 700],
    'fontSize'      : [ //using objects so that titles scale with body font size
        { 'article' : 14, 'title' : 32 },
        { 'article' : 16, 'title' : 38 },
        { 'article' : 18, 'title' : 44 }
    ],
    'serifP'        : [0, 1],
    'navbarP'       : [0, 1]
}

exports.VIDEO_CODE = {
    'absent'  : 0,
    'present' : 1 //,
    //'follows' : 2
}

exports.NAVBARP_CODE = {
    'static' : 0,
    'fixed'  : 1
}

exports.videoLocation = ['top', 'middle'];

//heights for images, videos
exports.dimensions = [250, 325, 400]

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
    'data/img7.jpg',
    'data/img8.jpg',
    'data/img9.jpg',
    'data/img10.jpg',
    'data/img11.jpg',
    'data/img12.jpg',
    'data/img13.jpg',
    'data/img14.jpg',
    'data/img15.jpg',
    'data/img16.jpg',
    'data/img17.jpg',
    'data/img18.jpg',
    'data/img19.jpg',
    'data/img20.jpg',
    'data/img21.jpg',
    'data/img22.jpg',
    'data/img23.jpg',
    'data/img24.jpg',
    'data/img25.jpg',
    'data/img26.jpg',
    'data/img27.jpg',
    'data/img28.jpg',
    'data/img29.jpg',
    'data/img30.jpg',
    'data/img31.jpg',
    'data/img32.jpg',
    'data/img33.jpg',
    'data/img34.jpg',
    'data/img35.jpg',
    'data/img36.jpg',
    'data/img37.jpg',
    'data/img38.jpg',
    'data/img39.jpg',
    'data/img40.jpg'
]

exports.videos = [
    'data/video1.mp4',
    'data/video2.mp4',
    'data/video3.mp4',
    'data/video4.mp4',
    'data/video5.mp4',
    'data/video6.mp4',
    'data/video7.mp4',
    'data/video8.mp4',
    'data/video9.mp4',
    'data/video10.mp4',
    'data/video11.mp4',
    'data/video12.mp4',
    'data/video13.mp4',
    'data/video14.mp4',
    'data/video15.mp4'
]
