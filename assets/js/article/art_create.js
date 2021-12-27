$(function() {
    var layer = layui.layer;
    var form = layui.form;
    //富文本初始
    initEditor();
    init_fenlei();
    //初始分类
    function init_fenlei() {
        $.ajax({
            url: "/my/article/cates",
            method: "get",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var fenlei_info = template("fenlei_table", res); //cate_table不需要#
                $("[name=cate_id]").html(fenlei_info);
                form.render();
            }
        })
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')
        // 2. 裁剪选项 
    var options = {
            aspectRatio: 400 / 280,
            preview: '.img-preview',
        }
        // 3. 初始化裁剪区域 
    $image.cropper(options)
        //上传点击
    $("#file_ye").on("click", function() {
            $("#file_do").click();
        })
        // 获取上传文件
    $("#file_do").on("change", function(e) {
        var file = e.target.files[0]
        if (file.length === 0) {
            return layer.msg("请上传图片")
        }
        var newImgURL = URL.createObjectURL(file)
        $image.cropper('destroy')
            // 销毁旧的裁剪区域 
            .attr('src', newImgURL)
            // 重新设置图片路径 
            .cropper(options)
            // 重新初始化裁剪区域


    })


    //绑定事件修改syaye的参数
    var state_info = "已发布";
    $("#send_cao").on("click", function() {
            state_info = "草稿";
        })
        //表单提交
    $("#create_form").on("submit", function(e) {
        e.preventDefault();
        var formData = new FormData($(this)[0]);
        formData.append("state", state_info);

        $image.cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布 
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                formData.append("cover_img", blob);
                create_art(formData)


                // 将 Canvas 画布上的内容，转化为文件对象 
                // 得到文件对象后，进行后续的操作 
            })
    })




    //添加功能
    function create_art(fd) {
        //formData格式提交数据
        $.ajax({
            url: "/my/article/add",
            method: "post",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                location.href = "/article/art_list.html"
            }
        })



    }














})