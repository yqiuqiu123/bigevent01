$(function(){
    //1、点击注册账号 隐藏登录区域
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //2、点击登录区域 隐藏注册区域
    $('#link_login').on('click',function(){
        $('.login-box').show();
        $('.reg-box').hide();
    })
    //自定义验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd:[
            /^[\S]{6,12}$/,
            '密码必须6-16位，且不能有空格'
        ],
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val();
            if(value !== pwd){
                return '两次密码不一致'
            }
        }
    })
    //提交表单事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'post',
            url:'/api/reguser',
            data:{
                username:$('#form_reg [name=username]').val(),
                password:$('#form_reg [name=password]').val(),

            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
               layer.msg('注册成功，请登录')
               $('#link_login').click();
               //重置表单
               $('form_reg')[0].reset();
            }
        })

    })
    //登录功能
    $('#form_login').submit(function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功');
                //将得到的token字符串 保存到本地存储中
                localStorage.setItem('token',res.token)
                location.href = '/index.html';
            },
            
           
        })
    })

})