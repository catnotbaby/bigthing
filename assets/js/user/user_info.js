$(function() {

    //自定义规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function(value, item) { //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户昵称不能有特殊字符';
            }
        }
    });

    //ajax获取用户信息
    init_user_info();
    //用到ajax的地方一定不能忘了调用api_option.js
    function init_user_info() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //用form_val来快速填充信息
                form.val('user-info', res.data);
            }
        })
    }
    //重置功能
    $("#btn_reset").on("click", function(e) {
            e.preventDefault();
            init_user_info();
        })
        //提交表单
    $(".user_info").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败，请重试');
                }
                layer.msg(res.message);

                var parent$ = window.parent.layui.jquery; //PARENT$就是父窗口的jquery
                var nickname = $("#nickname").val();
                parent$("#welcome-span").html('欢迎,' + nickname);;
                // window.parent.getuser_list(); //就是ifram的父窗口调用方法记得隐藏域id
            }
        })

    })





})