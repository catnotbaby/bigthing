$(function() {
    //登录注册转换
    $("#link-login").on("click", function() {
        $(".login-trans").hide();
        $(".reg-trans").show();
    });
    $("#link-reg").on("click", function() {
            $(".login-trans").show();
            $(".reg-trans").hide();
        })
        //自定义验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: function(value, item) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '密码不能有特殊字符';
            }
        },
        repwd: function(value, item) {
            var repwd = $(".reg-trans [name=password]").val();
            if (repwd !== value) {
                return '密码不一致';
            }
        }
    });

    //提交注册事件
    $("#form_login").on("submit", function(e) {
        e.preventDefault();
        var data = {
            username: $(".reg-trans [name=username]").val(),
            password: $(".reg-trans [name=password]").val(),
        }
        $.post('/api/reguser', data, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg("注册成功");
            $("#link-reg").click();
        })
    })




    //登录提交事件
    $("#form_reg").submit(function(e) {
        e.preventDefault;
        //发起ajax请求
        $.ajax({
            url: '/api/login',
            method: 'post',
            //快速获取表单数据，适应多条信息
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败，请重试！")
                }
                layer.msg("登录成功");
                localStorage.setItem("token", res.token)
            }
        })
    })





















})