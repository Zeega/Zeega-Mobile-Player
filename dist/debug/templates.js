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