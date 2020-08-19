var baseUrl = 'http://ajax.frontend.itheima.net';

$.ajaxPrefilter(function (option) {
    //对需要权限的接口配置头信息 另一种写法
    // if(option.url.indexOf('/my/' == 0)){
    //     option.headers = {
    //         Authorization: localStorage.getItem('token') || ''
    //     }
    // }
    option.url = baseUrl + option.url;
    
    //对需要权限的接口配置头信息
    if(option.url.indexOf('/my/')!== -1){    
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    option.complete = function(res){
        if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
            // 强制清空本地的token
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
      
    }
})