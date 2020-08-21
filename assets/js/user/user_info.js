$(function(){
    var form = layui.form;
    form.verify({
        nickname: function(value){
            if(value.length > 6){
                return '昵称长度为1～6之间'
            }
        }
    })
    initUserInfo();
    //用户信息渲染
    var layer = layui.layer;
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success: function(res){
                // console.log(res);
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                //获取成功 渲染
                form.val('formUserInfo',res.data);
            }
        })

    }
    //表单重置
    $('#btnReset').on('click',function(e){
        //阻止重置行为
        e.preventDefault();

        //重新渲染用户信息
        initUserInfo();
    })
    //修改用户信息
    $('.layui-form').on('submit',function(e){
        //阻止默认提交行为
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('用户信息修改成功')
                window.parent.getUserInfo();
            }
        })
    })
})