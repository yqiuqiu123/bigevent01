$(function(){
    //自定义校验规则
    var form = layui.form;
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能有空格'],

        //新旧密码不能相同
        samePwd: function(value){
            if(value === $('input[name=oldPwd]').val()){
                return '新旧密码不能一致'
            }
        },
        repwd: function(value){
            if(value !== $('[name=newPwd]').val()){
                return '两次密码不一致'
            }
        }


    })
    // 表单提交
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset();
            }
        })
    })
})