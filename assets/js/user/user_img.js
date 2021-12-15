$(function() {
    var layer = layui.layer;

    get_firs_timage();






    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项 
    const options = {
            aspectRatio: 1,
            // 指定预览区域 
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域 
    $image.cropper(options);
    //上传按钮绑定事件
    $("#schuang").on("click", function() {
        $("#file").click()
    })

    $("#file").on('change', function(e) {
        var files = e.target.files;
        if (files.length == 0) {
            return layer.msg("请上传图片")
        }
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);

        $image.cropper('destroy') // 销毁旧的裁剪区域 
            .attr('src', newImgURL) // 重新设置图片路径 
            .cropper(options) // 重新初始化裁剪区域
    })

    //ajax把头像上传到服务器
    $("#btn_sure").on("click", function() {
            var dataURL = $image.cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 100,
                    height: 100
                }).toDataURL('image/png')
                //  将 Canvas 画布上的内容， 转化为 base64 格式的字符 串
            $.ajax({
                url: '/my/update/avatar',
                method: 'post',
                data: {
                    avatar: dataURL
                },
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg("请重新上传")
                    }
                    layer.msg(res.message);
                    var img_name = localStorage.setItem('img', dataURL)

                    var parent$ = window.parent.layui.jquery;
                    parent$(".layui-nav-img").attr('src', dataURL);
                }
            })
        })
        //获取上一张图片信息
    function get_firs_timage() {
        var get_image = localStorage.getItem('img');
        $("#image").attr('src', get_image);
    }





})