$(function(){
    // 点击去注册的链接
    $("#link_reg").click(function(){
        $(".login_box").hide();
        $(".reg_box").show()
    })
    //点击去登录的链接
    $("#link_login").click(function(){
        $(".reg_box").hide();
        $(".login_box").show()
    })
    //自定义校验规则
    let form = layui.form;
    let layer = layui.layer
    form.verify({
        psd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
        ],
        repsd:function(value){
            let pwd = $(".reg_box [name=password]").val()
            if(pwd!==value){
                return '两次密码不一致！'
            }
            
        }
    })
    //监听表单的注册事件
    
    $("#form_reg").submit(function(e){
        e.preventDefault();
        $.post("/api/reguser",{username:$("#form_reg [name=username]").val(),password:$("#form_reg [name=password]").val()},function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            layer.msg("注册成功")
            //模拟人的点击行为
            $("#link_login").click()
        })
    })

    //监听表单的登录事件
    $("#form_login").submit(function(e){
        e.preventDefault();
        $.post("/api/login",$(this).serialize(),function(res){
            if(res.status!==0){
                return layer.msg('登录失败！')
            }
            layer.msg("登录成功！")
            //将登陆成功得到的token字符串，保存到localStorage中
            localStorage.setItem('token',res.token)
            // console.log(res.token);
            //跳转到后台主页
            location.href = '/index.html'
            //Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzA5MSwidXNlcm5hbWUiOiJ5angiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTY3Njk2NDEzNiwiZXhwIjoxNjc3MDAwMTM2fQ.txxtngC9DgnT6igcBV41qc2V8hYwXz7nHly6VCt8ysk
        })
    })
})