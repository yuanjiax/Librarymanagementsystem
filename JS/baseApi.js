//每次调用$.get()或者$.post()或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象

//统一拼接根路径

$.ajaxPrefilter(function(options) {
   
    options.url='http://www.liulongbin.top:3007'+options.url
    
})