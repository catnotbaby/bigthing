//调用ajax时先调用此函数就能实现不用根路由就行
$.ajaxPrefilter(function(options) {
    options.url = 'http: //api-breakingnews-web.itheima.net' + options.url;
})