this["JST"] = this["JST"] || {};

this["JST"]["app/templates/loader.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<a href="#" class="mobile-play"><img src="assets/img/start-button.png"/></a>\n\n<div class="ZEEGA-loader-inner">\n    <h1>'+
( title )+
'</h1>\n    <h2>by '+
( authors )+
'</h2>\n</div>\n<span class="ZEEGA-loader-bg"></span>';
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
'</h2>\n</div>\n\n<div class="ZEEGA-pause-footer">\n    <a href="http://www.zeega.com/" target="blank">Explore more of the Zeegaverse!</a>\n</div>';
}
return __p;
};

this["JST"]["app/templates/underlay.html"] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='<ul class="underlay-menu">\n\n    <li class="header">'+
( title )+
'</li>\n    <li><a href="#">Share on Twitter</a></li>\n    <li><a href="#">Share on Facebook</a></li>\n    <li><a href="#">Share on Email</a></li>\n    <li><a href="http://www.zeega.com/" target="blank">Explore the Zeegaverse</a></li>\n</ul>';
}
return __p;
};