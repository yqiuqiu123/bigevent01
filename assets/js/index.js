$(function () {
    getUserInfo();

    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
      // 提示用户是否确认退出
      layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
  
        // 关闭 confirm 询问框
        layer.close(index)
      })
    })
})
//获取用户信息的函数  要封装到入口函数外 以便其他地方调用
function getUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      // headers 就是请求头配置对象
    //   headers: {
    //     Authorization: localStorage.getItem('token') || ''
    //   },
      success: function(res) {
        console.log(res);
        //判断状态
        if(res.status !== 0){
            return layui.layer.msg(res.message)
        }
        // 渲染用户头像信息

        renderAvatar(res.data);
      },
      
   
    })
}
//封装渲染用户头像函数
function renderAvatar(user){
    var name = user.nickname || user.username
    //用户名
    $('.welcome').html('欢迎&nbsp;&nbsp' + name)
    //用户头像
    if(user.user_pic){
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.user-avatar').hide()
    }else {
        $('.layui-nav-img').hide();
        var text = name[0].toUpperCase();
        $('.user-avatar').show().html(text)

    }
}