$(function(){

    //调用获取用户信息
    getUserInfo()

    //退出登录
    let layer = layui.layer
    $('#btnLogout').click(function(){
        //弹出提示层
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //清除本地存储token
            localStorage.removeItem('token')
            //重新跳转登录页
            location.href='/login.html'
            layer.close(index);
          });
    })
})
// 获取用户信息
function getUserInfo(){
    $.ajax({
        methods: "GET",
        url:'/my/userinfo',
        
        success:function(res){
          if(res.status!==0){
            return layui.layer.msg('获取用户信息失败')
          }
          //调用获取用户头像
          renderAvatar(res.data)

         
        },
         
    })
}

//渲染用户头像
function renderAvatar(user){
    //1、获取用户的名称
    let name = user.nickname || user.username
    //2、设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //3、按需渲染用户的头像
    if(user.user_pic !==null){
        //渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}