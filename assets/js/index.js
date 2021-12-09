$(function() {
    var layer = layui.layer;
    getuser_list();

    $("#close_btn").on("click", function() {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something

            localStorage.removeItem('token');
            location.href = '/login.html'


            layer.close(index);
        });

    })


    //发起ajax请求
    function getuser_list() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function(res) {
                if (res.status !== 1) {
                    render_user(res.data);
                } else {
                    location.href = '/login.html'
                }
            },
            // complete: function(res) {
            //     if (res.responseJSON.status !== 0) {
            //         localStorage.removeItem('token');
            //         location.href = '/login.html';

            //     }
            //     console.log(res);

            // },
        })

    }
    //渲染用户名和图片
    function render_user(user) {
        var userinfo_name = user.username || user.nickname;
        var userinfo_pic = user.user_pic;
        $("#welcome-span").html('欢迎,' + userinfo_name);
        if (userinfo_pic !== null) {
            $(".layui-nav-img").attr('src', userinfo_pic);

        } else {
            var pic_init = '/assets/images/sample.jpg';
            $(".layui-nav-img").attr('src', pic_init);
        }

    }












})