const values     = require('./values');
const element    = require('./element');
const style      = require('./style');
const process    = require('./process');
const loremipsum = require('lorem-ipsum');
const fs         = require('fs');

function runAll() {
    // == script variables =====================================================
    var ID = 0;
    var page, styles;

    //reused secondary variables
    var actualWordCount, paragraphs, links, videoLocation, videoInjectIndex, imageData;

    //reused primary variables
    var linkDensity, video, images, wordCount, fontSize, serifP, navbarP;
    var attr = values.attributeValues;

    //establish linkDensity
    for (var i_linkDensity = 0; i_linkDensity < attr.linkDensity.length; i_linkDensity++) {
        linkDensity = attr.linkDensity[i_linkDensity];

        //establish video
        for (var i_video = 0; i_video < attr.video.length; i_video++) {
            video = attr.video[i_video];

            //establish images
            for (var i_images = 0; i_images < attr.images.length; i_images++) {
                images = attr.images[i_images];

                //establish wordCount
                for (var i_wordCount = 0; i_wordCount < attr.wordCount.length; i_wordCount++) {
                    wordCount = attr.wordCount[i_wordCount];

                    //establish fontSize
                    for (var i_fontSize = 0; i_fontSize < attr.fontSize.length; i_fontSize++) {
                        fontSize = attr.fontSize[i_fontSize];

                        //establish serifP
                        for (var i_serifP = 0; i_serifP < attr.serifP.length; i_serifP++) {
                            serifP = attr.serifP[i_serifP];

                            //establish navbarP
                            for (var i_navbarP = 0; i_navbarP < attr.navbarP.length; i_navbarP++) {
                                navbarP = attr.navbarP[i_navbarP];
                            }
                        }
                    }
                }
            }
        }
    }
}
