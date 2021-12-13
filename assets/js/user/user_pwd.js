$(function() {
    var form = layui.form;
    var layer = layui.layer;
    //自定义验证规则
    form.verify({
        pwd: function(value, item) {
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '密码不能有特殊字符';
            }
        },
        repwd: function(value, item) {
            var repwd = $(".layui-form [name=repassword]").val();
            if (repwd !== value) {
                return '密码不一致';
            }
        }
    });
    //提交ajax
    $(".layui-form").on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            method: 'post',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败，请重试');
                }
                layer.msg('修改成功');
                $(".layui-form")[0].reset();
            }

        })
    })



})