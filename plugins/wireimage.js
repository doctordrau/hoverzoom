﻿var hoverZoomPlugins = hoverZoomPlugins || [];
hoverZoomPlugins.push({
    name:'wireimage.com',
    version:'1.0',
    prepareImgLinks:function (callback) {

        var res = [];       

        hoverZoom.urlReplace(res,
            'img[src]',
            /(.*)\?(.*)/,
            '$1'
        );
        
        $('[style*=background]').each(function() {
            // extract url from style
            var backgroundImage = this.style.backgroundImage;
            if (backgroundImage.indexOf("url") != -1) {
                var reUrl = /.*url\s*\(\s*(.*)\s*\).*/i
                backgroundImage = backgroundImage.replace(reUrl, '$1');
                // remove leading & trailing quotes
                var backgroundImageUrl = backgroundImage.replace(/^['"]/,"").replace(/['"]+$/,"");
                var fullsizeUrl = backgroundImageUrl.replace(/(.*)\?(.*)/, '$1');
                if (fullsizeUrl != backgroundImageUrl) {
                    var link = $(this);
                    if (link.data().hoverZoomSrc == undefined) { link.data().hoverZoomSrc = [] }
                    if (link.data().hoverZoomSrc.indexOf(fullsizeUrl) == -1) { 
                        link.data().hoverZoomSrc.unshift(fullsizeUrl);
                        res.push(link); 
                    }
                }
            }
        });

        callback($(res), this.name);
    }
});