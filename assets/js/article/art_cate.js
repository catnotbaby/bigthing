$(function() {
    //初始化
    var layer = layui.layer;
    var form = layui.form;
    var indexadd;
    var indexedit;

    init_cateinfo();

    //初始化方法
    function init_cateinfo() {
        $.ajax({
            url: "/my/article/cates",
            method: "get",
            success: function(res) {
                // console.log(res);
                var cate_info = template("cate_table", res);
                $("tbody").html(cate_info);

            }
        })
    }

    //初始化方法
    //新增
    $("#add_cate_btn").on("click", function(e) {
            e.preventDefault();
            indexadd = layer.open({
                type: 1,
                title: '文章类别',
                area: ['500px', '300px'],
                content: $("#add_cate").html(), //这里content是一个普通的String
            });
        })
        //新增
        //获取信息到前端
    $("body").on("submit", "#add_cate_form", function(e) {
            e.preventDefault();
            $.ajax({
                url: "/my/article/addcates",
                method: "post",
                data: $(this).serialize(),
                success: function(res) {


                    if (res.status !== 0) {
                        layer.msg(res.message);
                    }
                    init_cateinfo();
                    layer.close(indexadd);
                }
            })

        })
        //编辑

    $("tbody").on("click", "#cate_edit", function() {
            indexedit = layer.open({
                    type: 1,
                    title: '文章类别',
                    area: ['500px', '300px'],
                    content: $("#edit_cate").html(),
                })
                //console.log(this);

            var id = $(this).attr("data-id")

            $.ajax({
                method: "get",
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('edit_cate_form', res.data);
                }
            })
        })
        //修改
    $("body").on("submit", "#edit_cate_form", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/my/article/updatecate",
            method: "post",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }


                layer.msg(res.message);
                layer.close(indexedit);
                init_cateinfo();
            }
        })

    })

    $("body").on("click", "#cate_del", function() {
        var id = $(this).attr("data-id");
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                url: "/my/article/deletecate/" + id,
                method: "get",
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message);
                    layer.close(index);
                    init_cateinfo();
                }
            })
        });
    })








})