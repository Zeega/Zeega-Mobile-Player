this["JST"] = this["JST"] || {};

this["JST"]["app/templates/chrome.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href="'+
( path )+
'" class="ZEEGA-tab">\n    <span class="ZTab-logo"></span>\n</div>\n<div class="ZEEGA-sound-state" style="display:none" ></div>\n\n<div class="ZEEGA-chrome-metablock" style="display:none" >\n    <div class="meta-inner">\n        <div class="left-col">\n            <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                <div class="profile-token"><img src="'+
( userThumbnail )+
'"/></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="username">\n                <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                    <div class="profile-name">'+
( authors )+
'</div>\n                </a>\n            </div>\n            <div class="caption">'+
( title )+
'</div>\n        </div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href="'+
( path )+
'" class="ZEEGA-tab">\n    <span class="ZTab-logo"></span>\n</div>\n\n<div class="share-block">\n    <ul class="share-sites">\n        <li><a\n            href="https://twitter.com/intent/tweet?original_referer='+
( path )+
''+
( id )+
'&text='+
( description )+
' Made w/ @zeega&url='+
( path )+
''+
( id )+
'"\n            target="blank"\n            ><i class="endpage-social endpage-social-twitter"\n            ></i></a></li>\n        <li><a\n            href="http://www.facebook.com/sharer.php?u='+
( path )+
''+
( id )+
'"><i class="endpage-social endpage-social-facebook"\n            target="blank"\n            ></i></a></li>\n        <li><a\n            href="http://www.tumblr.com/share/photo?'+
( tumblr_share )+
'"\n            target="blank"\n            ><i class="endpage-social endpage-social-tumblr"></i></a></li>\n    </ul>\n</div>\n\n<div class="endpage-actions">\n    <a href="'+
( path )+
'" class="btnz btnz-action" >Explore More Zeegas</a>\n</div>\n\n<div class="ZEEGA-chrome-metablock">\n    <div class="meta-inner">\n        <div class="left-col">\n            <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                <div class="profile-token"><img src="'+
( userThumbnail )+
'"/></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="username">\n                <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                    <div class="profile-name">'+
( authors )+
'</div>\n                </a>\n            </div>\n            <div class="caption">'+
( title )+
'</div>\n        </div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href="'+
( path )+
'" class="ZEEGA-tab">\n    <span class="ZTab-logo"></span>\n</div>\n\n<div class="swipe-left">\n    <div class="ZEEGA-notices">\n        <ul class="sticky">\n            <li><i class="icon-headphones icon-white"></i> turn up volume</li>\n        </ul>\n        <ul class="rotating">\n            <li class="active">swipe to start</li>\n            <li class="">swipe to explore</li>\n        </ul>\n    </div>\n    <img src="assets/img/swipe-left.png"/>\n</div>\n\n<div class="ZEEGA-chrome-metablock">\n    <div class="meta-inner">\n        <div class="left-col">\n            <a data-bypass="true"  href="'+
( path )+
'profile/'+
( userId )+
'">\n                <div class="profile-token"><img src="'+
( userThumbnail )+
'"/></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="username">\n                <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                    <div class="profile-name">'+
( authors )+
'</div>\n                </a>\n            </div>\n            <div class="caption">'+
( title )+
'</div>\n        </div>\n    </div>\n</div>\n\n<div class="ZEEGA-loader-bg-overlay"></div>\n<span class="ZEEGA-loader-bg"></span>';
}
return __p;
};

this["JST"]["app/templates/pause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="mobile-play"><img src="assets/img/start-button.png"/></a>\n\n<div class="ZEEGA-pause-meta">\n    <h1>'+
( title )+
'</h1>\n    <h2>by '+
( authors )+
'</h2>\n</div>\n\n<div class="ZEEGA-paused-footer">\n    <a class="menu" href="#"><img src="assets/img/menu-icon.png"/></a>\n    <span class="pull-right tip">tip:';
 if ( frames.length > 1 ) { 
;__p+=' Swipe to explore';
 } else { 
;__p+='Tap to pause';
 } 
;__p+='</span>\n</div>';
}
return __p;
};

this["JST"]["app/templates/underlay.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="scroller">\n    <ul class="underlay-menu">\n        <li class="header">\n            <div class="project-views">\n                <i class="icon-eye-open icon-white"></i> '+
( views )+
' views\n            </div>\n        </li>\n\n        <li><a href="https://twitter.com/intent/tweet?original_referer='+
( path )+
''+
( id )+
'&text='+
( description )+
' Made w/ @zeega&url='+
( path )+
''+
( id )+
'"\n            target="blank"><i class="zsocial-twitter"></i>  Share on Twitter</a></li>\n        <li><a href="http://m.facebook.com/sharer.php?u='+
( path )+
''+
( id )+
'&t='+
( title )+
' by '+
( authors )+
'" target="blank"><i class="zsocial-facebook"></i>  Share on Facebook</a></li>\n        <li><a href="mailto:?subject=Check out this Zeega!&body='+
( path )+
''+
( id )+
'"><i class="zsocial-email"></i>  Share on Email</a></li>\n        <li class="spacer"></li>\n        <li class="highlight"><a data-bypass=\'true\' href="'+
( path )+
'"><i class="icon-home icon-white"></i> Zeega Home</a></li>\n        <li class="spacer"></li>\n        <li class="header">Credits</li>\n        ';
 _.each( layers, function( layer ) { 
;__p+='\n                ';
 if ( !_.contains(["Link","EndPageLayer","Text","TextV2","Rectangle"], layer.type )) { 
;__p+='\n                    <li class="underlay-citation">\n                        <a href="'+
( layer.attr.attribution_uri )+
'" target="blank">\n                            <i class="icon-'+
( layer.type.toLowerCase() )+
' icon-white"></i> ';
 if ( layer.attr.title === "" ) { 
;__p+='[untitled]';
 } else { 
;__p+=''+
( layer.attr.title )+
'';
 } 
;__p+='\n                        </a>\n                    </li>\n                ';
 } 
;__p+='\n        ';
 }) 
;__p+='\n        \n    </ul>\n</div>\n<div class="bg" style="\n    background: url('+
( cover_image )+
');\n    background-position: 50% 50%;\n    background-repeat: no-repeat no-repeat;\n    background-attachment: fixed;\n    -webkit-background-size: cover;\n    -moz-background-size: cover;\n    -o-background-size: cover;\n    background-size: cover;\n"></div>';
}
return __p;
};