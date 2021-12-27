$(function() {
    layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;
    //初始参数
    var initnu = {
        pagenum: 1,
        pagesize: 2,
        cate_id: "",
        state: "",
    }
    init_list();
    init_cate();

    //时间格式化
    template.defaults.imports.gz_time = function(data) {
            const gz = new Date(data);
            var y = padzero(gz.getFullYear());
            var m = padzero(gz.getMonth() + 1);
            var d = padzero(gz.getDate());
            var hh = padzero(gz.getHours());
            var mi = padzero(gz.getMinutes());
            var ss = Math.floor(padzero(gz.getSeconds()));
            return y + "-" + m + "-" + d + " " + hh + ":" + mi + ":" + ss
        }
        //小于10加上0
    function padzero(n) {
        return n > 9 ? n : "0" + n;
    }
    //筛选提交
    $(".select-table").on("submit", function(e) {
            e.preventDefault();
            var cate_id = $("#select_init").val();
            var state = $("#state").val();
            initnu.cate_id = cate_id;
            initnu.state = state;

            init_list();
        })
        //删除list
    $("body").on('click', ".list_del", function(e) {
            e.preventDefault();
            var id = $(this).attr("data-id");
            var del_length = $(".list_del").length;
            layer.confirm('确定删除?', {
                icon: 3,
                title: '提示'
            }, function(index) {

                $.ajax({
                    url: "/my/article/delete/" + id,
                    method: "get",
                    success: function(res) {
                        if (res.status !== 0) {
                            return layer.msg(res.message);
                        }
                        if (del_length === 1) {
                            initnu.pagenum = initnu.pagenum === 1 ? 1 : initnu.pagenum - 1;
                            //pagenu不变返回空json，后渲染分页。
                        }
                        init_list();
                    }
                })
                layer.close(index);
            });
        })
        //修改信息
    $("body").on("click", ".list_edit", function(e) {
        e.preventDefault();
        var id = $(this).attr("data-id");

        location.href = "/article/art_pub.html?id=${id}"
    })









    //初始化类别参数
    function init_cate() {
        $.ajax({
            url: "/my/article/cates",
            method: "get",
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var select_info = template("select_table", res); //cate_table不需要#
                $("#select_init").html(select_info);
                form.render();
            }
        })
    }




    //初始list信息

    function init_list() {
        $.ajax({
            url: "/my/article/list",
            method: "get",
            data: initnu,
            success: function(res) {


                if (res.status !== 0) {
                    return layer.msg(res.message);
                }


                var list_info = template("list_table", res); //list_table不需要#
                $("tbody").html(list_info);
                page_size(res.total);
            }
        })
    }
    //分页初始化
    function page_size(page) {
        laypage.render({
            elem: 'cli_page',
            count: page,
            limit: initnu.pagesize,
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit',
                'prev', 'page', 'next', 'skip'
            ],
            curr: initnu.pagenum,
            jump: function(obj, first) {
                //jump只有2种情况会跳1.render调用2.page改变
                //obj包含了当前分页的所有参数，比如：
                initnu.pagenum = obj.curr
                initnu.pagesize = obj.limit


                //首次不执行
                if (!first) {
                    init_list();
                }
            }
        });

    }
























})