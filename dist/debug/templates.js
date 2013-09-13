this["JST"] = this["JST"] || {};

this["JST"]["app/templates/chrome.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href="'+
( path )+
'" class="ZEEGA-tab" style="display:none">\n    <span class="ZTab-logo"></span>\n</div>\n<div class="ZEEGA-sound-state" style="display:none" ></div>\n\n<div class="ZEEGA-chrome-metablock" style="display:none" >\n    <div class="meta-inner">\n        <div class="left-col">\n            <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                <div class="profile-token" style="\n                    background: url('+
( userThumbnail )+
');\n                    background-size: cover;\n                    background-position: center;\n                "></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="username">\n                <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                    <div class="profile-name">'+
( user.display_name )+
'</div>\n                </a>\n            </div>\n            <div class="caption">'+
( title )+
'</div>\n            <div class="stats-meta">♥ '+
( favorite_count )+
' favorites ► '+
( views )+
' views</div>\n        </div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href="'+
( path )+
'" class="ZEEGA-tab">\n    <span class="ZTab-logo"></span>\n</div>\n\n<div class="share-block">\n    <ul class="share-sites share-network">\n        \n        ';
 if ( loggedIn === true ){  
;__p+=' \n            <li>\n                 ';
 if ( favorite === true ) {  
;__p+=' \n                    <a href="#" class="favorite favorited">♥</a>\n                ';
 } else {
;__p+='\n                    <a href="#" class="favorite">♥</a>\n                ';
 } 
;__p+='\n            </li>\n        ';
 } 
;__p+='  \n        <li>\n            <a name = "twitter" href="'+
( share_links.twitter )+
'" target="blank" ><i class="endpage-social endpage-social-twitter"></i></a>\n        </li>\n        <li>\n            <a name = "facebook" href="'+
( share_links.facebook )+
'" target="blank"><i class="endpage-social endpage-social-facebook" target="blank" ></i></a>\n        </li>\n        <li>\n            <a name = "tumblr" href="'+
( share_links.tumblr )+
'" target="blank" ><i class="endpage-social endpage-social-tumblr"></i></a>\n        </li>\n        <!--\n        <li>\n            <a name = "reddit" href="'+
( share_links.reddit )+
'" target="blank" ><i class="endpage-social endpage-social-reddit"></i></a>\n        </li>\n    -->\n    </ul>\n</div>\n\n<div class="endpage-actions">\n    <h2>Explore More Zeegas</h2>\n\n    <div class="suggested-zeega">\n\n        <div class="top">'+
( related_project.user.display_name )+
'</div>\n\n        <a href="'+
(path )+
''+
(related_project.id )+
'"\n                class="middle zeega-thumb play-next"\n                data-id="'+
(related_project.id )+
'"\n                data-bypass="true"\n                style="background-image: url('+
(related_project.cover_image )+
');">\n\n            <div class="profile-token"\n                    style="background-image: url('+
( related_project.user.thumbnail_url )+
');\n                            background-size: cover;\n                            background-position: center;"></div>\n            <span class="playbutton"></span>\n        </a>\n\n        <div class="bottom">'+
( related_project.title )+
'</div>\n    </div>\n\n</div>\n\n<div class="ZEEGA-chrome-metablock">\n    <div class="meta-inner">\n        <div class="left-col">\n            <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                <div class="profile-token" style="\n                    background: url('+
( userThumbnail )+
');\n                    background-size: cover;\n                    background-position: center;\n                "></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="username">\n                <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                    <div class="profile-name">'+
( user.display_name )+
'</div>\n                </a>\n            </div>\n            <div class="caption">'+
( title )+
'</div>\n            <div class="stats-meta">♥ '+
( favorite_count )+
' favorites ► '+
( views )+
' views</div>\n        </div>\n    </div>\n</div>';
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
'">\n                <div class="profile-token" style="\n                    background: url('+
( userThumbnail )+
');\n                    background-size: cover;\n                    background-position: center;\n                "></div>\n            </a>\n        </div>\n        <div class="right-col">\n            <div class="username">\n                <a data-bypass="true" href="'+
( path )+
'profile/'+
( userId )+
'">\n                    <div class="profile-name">'+
( user.display_name )+
'</div>\n                </a>\n            </div>\n            <div class="caption">'+
( title )+
'</div>\n            <div class="stats-meta">♥ '+
( favorite_count )+
' favorites ► '+
( views )+
' views</div>\n        </div>\n    </div>\n</div>\n\n<div class="ZEEGA-loader-bg-overlay"></div>\n<span class="ZEEGA-loader-bg"></span>';
}
return __p;
};

this["JST"]["app/templates/pause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="mobile-play"><img src="assets/img/start-button.png"/></a>\n\n<div class="ZEEGA-pause-meta">\n    <h1>'+
( title )+
'</h1>\n    <h2>by '+
( user.display_name )+
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

this["JST"]["app/templates/remix-endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="end-page-wrapper" >\n\n    <h1>Remix</h1>\n    <div class="project-current remix-project-wrapper">\n        <div class="title">just watched</div>\n        <div class="token-wrapper">\n            <div class="user-token user-token-medium" style="\n                background-image: url('+
( user.thumbnail_url )+
');\n                background-size: cover;\n                background-position: center;\n            "></div>\n        </div>\n        <div class="username">'+
( user.display_name )+
'</div>\n    </div>\n\n';
 if ( remix.remix ) { 
;__p+='\n    <div class="project-parent remix-project-wrapper">\n        <div class="title">up next</div>\n        <div class="token-wrapper">\n            <div class="user-token user-token-large" style="\n                background-image: url('+
( remix.parent.user.thumbnail_url )+
');\n                background-size: cover;\n                background-position: center;\n            "></div>\n        </div>\n        <div class="username">'+
( remix.parent.user.display_name )+
'</div>\n    </div>\n\n    ';
 if ( remix.parent.id != remix.root.id ) { 
;__p+='\n\n        <div class="project-root remix-project-wrapper">\n            <div class="title">remixed from</div>\n            <div class="token-wrapper">\n                <div class="user-token user-token-medium" style="\n                    background-image: url('+
( remix.root.user.thumbnail_url )+
');\n                    background-size: cover;\n                    background-position: center;\n                "></div>\n            </div>\n            <div class="username">'+
( remix.root.user.display_name )+
'</div>\n        </div>\n\n    ';
 } 
;__p+='\n';
 } 
;__p+='\n</div>';
}
return __p;
};

this["JST"]["app/templates/remix-flash.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="banner" style="\n    background-image: url('+
( currentProject.cover_image )+
');\n    background-position: center;\n    background-size: cover;\n">\n    <div class="text-overlay">Now Watching</div>\n    <div class="text-overlay">';
 if ( currentProject.remix.ancestors.length ) { 
;__p+='A Remix by';
 } else { 
;__p+='The Original by';
 } 
;__p+=' '+
( currentProject.user.display_name )+
'</div>\n</div>';
}
return __p;
};

this["JST"]["app/templates/underlay.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="scroller">\n    <ul class="underlay-menu">\n\n        <li class="header">\n            <a class="zeega-logo" href="http://www.zeega.com/" data-bypass="true"></a>\n        </li>\n\n        <li class="header">Share</li>\n        <li class="clearfix share-links">\n            <a name="twitter" href="'+
( share_links.twitter )+
'" target="blank" >\n                <i class="zsocial-twitter zsocial-color"></i>\n            </a>\n            <a name="facebook" href="'+
( share_links.facebook )+
'" target="blank">\n                <i class="zsocial-facebook zsocial-color" target="blank" ></i>\n            </a>\n            <a name="tumblr" href="'+
( share_links.tumblr )+
'" target="blank" >\n                <i class="zsocial-tumblr zsocial-color"></i>\n            </a>\n            <a name="reddit" href="'+
( share_links.reddit )+
'" target="blank" >\n                <i class="zsocial-reddit zsocial-color"></i>\n            </a>\n        </li>\n\n<!--\n        <li class="header">Explore</li>\n\n        <li style="background-image: url('+
(related_project.cover_image )+
');" >\n            <div class="info-overlay">\n                <div class="left-column">\n                  <a data-bypass="true" href="'+
(path )+
'profile/'+
(related_project.user.id )+
'" >\n                    <div class="profile-token" style="background-image: url('+
( related_project.user.thumbnail_url )+
');"></div>\n                   </a>\n                </div>\n                <div class="right-column">\n                  <h1 class = "caption">'+
( related_project.title )+
'</h1>\n                  \n                  <div class="profile-name">\n                    <a data-bypass="true" href="'+
(path )+
'profile/'+
(related_project.user.id)+
'" >\n                      '+
(related_project.user.display_name)+
'\n                    </a>\n                   \n                  </div>\n                 \n                </div>\n                  \n            \n            </div>\n            <a href="'+
(path )+
'm/'+
(related_project.id )+
'" class="mobile-play" data-bypass="true"></a>\n        </li>\n-->\n\n        <li class="header credits-header">Credits</li>\n        ';
 _.each( layers, function( layer ) { 
;__p+='\n                ';
 if ( !_.contains(["Link","EndPageLayer","Text","TextV2","Rectangle"], layer.type )) { 
;__p+='\n                    <li class="underlay-citation">\n                        <a href="'+
( layer.attr.attribution_uri )+
'" target="blank">\n                            <i class="icon-'+
( layer.type.toLowerCase() )+
'"></i> ';
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
;__p+='\n        \n    </ul>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/av/av.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">media controls</div>\n<a href="#" class="playpause"><i class="icon-play icon-white"></i></a>\n<div class="av-slider"></div>\n';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/checkbox/checkbox.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="roundedOne">\n    <input type="checkbox" value="None" id="roundedOne" name="check" />\n    <label for="roundedOne"></label>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/color/color.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( _title )+
'</div>\n<div class="color-selector">\n    <input class="simple_color" value="'+
( attr[ _propertyName ] )+
'"/>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/dropdown/dropdown.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">'+
( title )+
'</div>\n<div class="dropdown-wrapper">\n    <select class="'+
( propertyName )+
'-dropdown">\n        ';
 _.each( optionList, function( option ) { 
;__p+='\n            <option value="'+
( option.value )+
'">'+
( option.title )+
'</option>\n        ';
 }); 
;__p+='\n    </select>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/linkimage/linkimage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">type</div>\n<select class="link-image-select">\n    <option value="arrow_up">Up Arrow</option>\n    <option value="arrow_down">Down Arrow</option>\n    <option value="arrow_left">Left Arrow</option>\n    <option value="arrow_right">Right Arrow</option>\n    <option value="default">Glowing Rectangle</option>\n</select>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/linkto/linkto.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="control-name">link to</div>\n<div class="control-frame-thumb" style="\n    background: url('+
( thumbnail_url )+
') no-repeat center center; \n    -webkit-background-size: cover;\n    background-size: cover;\n">\n    <a href="#"></a>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/opacity/opacity.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <i class="icon-eye-open id-icon icon-white"></i>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr.opacity * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="opacity-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/controls/slider/slider.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="hover-icon">\n    <div class="control-name">'+
( title )+
'</div>\n    <input type="text" class="text-input" value="'+
( Math.floor( attr[ _propertyName ] * 100 ) )+
'">\n    <div class="hidden-controls">\n        <div class="control-slider"></div>\n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/audio/audio-flash.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div id="audio-flash-'+
( id )+
'" data-src="'+
( attr.uri )+
'"  data-cue="'+
( attr.cue_in )+
'"  >\n    <div id="flash-'+
( id )+
'" %>" > \n    </div>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/audio/audio.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<audio id="audio-el-'+
( id )+
'" src="'+
( attr.uri )+
'" loop ></audio>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/end_page/endpage.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/image/image.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target" style="\n    background: url('+
( attr.uri )+
');\n    background-size: cover;\n    background-position: center;\n"></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/image/zga.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target" style="\n    background: url('+
( attr.zga_uri )+
');\n">\n    <style>'+
( css )+
'</style>\n</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/link/frame-chooser.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="modal-close">&times;</a>\n<div class="modal-content">\n    <div class="modal-title">Where do you want your link to go?</div>\n    <div class="modal-body">\n        <a href="#" class="link-new-page"><i class="icon-plus icon-white"></i></br>New Page</a>\n        <div class="divider">or</div>\n        <ul class="page-chooser-list clearfix"></ul>\n        <div class="bottom-chooser">\n            <a href="#" class="submit btnz btnz-submit btnz-inactive">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/link/link.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div href=\'#\' class=\'ZEEGA-link-inner\'></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/rectangle/rectangle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target"></div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/text_v2/text-v2.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="visual-target">'+
( attr.content )+
'</div>';
}
return __p;
};

this["JST"]["app/engine/plugins/layers/text_v2/textmodal.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="modal-content">\n    <div class="modal-title">Edit your text</div>\n    <div class="modal-body">\n\n        <div class="top-box clearfix">\n            <textarea rows="4" cols="59" maxlength="140" placeholder="Type your text here">'+
( attr.content )+
'</textarea>\n            <select class="font-list" id="font-list-'+
( id )+
'"></select>\n            <div class="textarea-info">max 140 characters</div>\n        </div>\n\n        <div class="bottom-chooser clearfix">\n            <a href="#" class="text-modal-save btnz btnz-submit">OK</a>\n        </div>\n    </div>\n</div>\n';
}
return __p;
};

this["JST"]["app/player/templates/controls/arrows.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-prev controls-arrow arrow-left disabled"></a>\n<a href="#" class="ZEEGA-next controls-arrow arrow-right disabled"></a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/close.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-close">&times;</a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/playpause.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="ZEEGA-playpause pause-zcon"></a>';
}
return __p;
};

this["JST"]["app/player/templates/controls/size-toggle.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="size-toggle">\n    ';
 if ( previewMode == "mobile" ) { 
;__p+='\n        <i class="size-toggle-mobile"\n            title="Switch to laptop view"\n            data-gravity="w"\n        ></i>\n    ';
 } else { 
;__p+='\n        <i class="size-toggle-laptop"\n            title="Switch to mobile view"\n            data-gravity="w"\n        ></i>\n    ';
 } 
;__p+='\n</a>';
}
return __p;
};

this["JST"]["app/player/templates/layouts/player-layout.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<div class="ZEEGA-soundtrack"></div>\n<div class="ZEEGA-player-wrapper">\n    <div class="ZEEGA-player-window"></div>\n</div>';
}
return __p;
};