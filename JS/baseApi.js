//每次调用$.get()或者$.post()或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象



$.ajaxPrefilter(function(options) {
   //统一拼接根路径
    options.url='http://www.liulongbin.top:3007'+options.url;

    //统一为有权限的接口设置headers请求头 
    if(options.url.indexOf('/my')!==-1){
        options.headers={
            Authorization:localStorage.getItem('token')||''
        
    }
    }

    //控制用户访问权限
    options.complete=function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            //强制跳转token
            localStorage.removeItem('token')
            //强制跳转登录页面
            location.href = '/login.html'
        }

     }
})