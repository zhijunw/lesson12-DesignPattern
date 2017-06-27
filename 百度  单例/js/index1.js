/**第1种写法
 * 1,这样写可以创建一个小代码库
 * 2，实现功能，或者事件放在一个单元，里面在写子函数
 * 3，这里写点击事件会麻烦一点
 */
var single = {
    // 初始化
    init: function() {
        this.scrollUtil.scrollUtil_fixedTop();
        this.scrollUtil.scrollUtil_fixedL();
        this.hoverUtil.hoverUtil_more();
        this.hoverUtil.hoverUtil_setup();
    },
    // 滚动单元
    scrollUtil: {
        // 固定顶部
        scrollUtil_fixedTop: function() {
            var $cgnav = $("#changenav");
            $(window).scroll(function() {
                if ($(window).scrollTop() > 150) {
                    $cgnav.removeClass("head-search").addClass("fixed-search");
                } else {
                    $cgnav.removeClass("fixed-search").addClass("head-search");

                }
            })
        },
        // 固定侧边栏
        scrollUtil_fixedL: function() {
            $(window).scroll(function() {
                //获取滚动条的高度
                var scrollH = $(window).scrollTop()
                    // console.log(scrollH);
                    //获取导航可以滚动的高度
                var hotScroll = $(".content-left").height() - $("#hot").height();
                // console.log(hotScroll);
                if (scrollH > 150 && scrollH < hotScroll + 150) {
                    $("#hot").css({
                        position: "absolute",
                        top: scrollH,
                        right: "",
                        "z-index": 100
                    })
                } else {
                    $("#hot").css({
                        position: "absolute",
                        top: "0px",
                        right: "5px",
                    })
                }

            })
        }
    },
    // 鼠标移入移除util
    hoverUtil: {
        // 更多产品hover
        hoverUtil_more: function() {
            var $more = $(".more"); //更多产品
            var $submore = $(".submore");
            $more.on("mouseover", function() {
                $submore.fadeIn(100)
            })
            $submore.on("mouseover", function() {
                $submore.fadeIn(100)
            })
            $submore.on("mouseleave", function() {
                $submore.fadeOut(100)
            })
        },
        //设置hover
        hoverUtil_setup: function() {
            var $submenu = $(".submenu");
            var $setup = $(".setup"); //设置
            $setup.hover(function() {
                $submenu.fadeIn(50);
                $submenu.hover(function() {
                    $submenu.fadeIn(50);
                }, function() {
                    $submenu.fadeOut(50);
                })

            }, function() {
                $submenu.fadeOut(50)
            })
        }
    }
};
single.init();


/**
 * [clickSingle description]
 * 导航li的点击切换，导航里面的动态添加和删除选项
 * 1，这样写点击事件放一起，可以全部调用
 * 2，更为简洁
 */
// var clickSingle = {

//     // 初始化
//     init: function() {
//         this.bindClick();
//         this.deleteSetup();
//         this.addSetup();
//     },
//     bindClick: function() {
//         $("#menu-list li").click('on', this.ClickShowLi);
//         $("#menu-list li").mouseover('on', this.MshowLi);
//     },
//     ClickShowLi: function() {
//         $(this).addClass("select").siblings().removeClass("select");
//         var index = $("#menu-list li").index(this);
//         $(".contentAll>div").eq(index).show().siblings().hide();
//     },
//     MshowLi: function() {
//         $(this).addClass("select").siblings().removeClass("select");
//     },
//     deleteSetup: function() {
//         var $lis = $("#deleteL li");
//         $lis.unbind("click");
//         $lis.click(function() {
//             //得到要删除到的容器
//             var addR = $("#addR");
//             //接触绑定
//             var abc = $(this).data("id");
//             console.log("delete");
//             var indexs = $lis.index(this);
//             //获取到删除的li
//             var deleteLi = $lis.eq(indexs).remove();
//             //添加到addR
//             deleteLi.appendTo(addR);
//             deleteLi.click(function() {
//                 addSetup();
//             });
//             var text = $(this).text();
//             $("#menu-list").find("#" + abc).remove();
//             $("#menu-list li").filter(":contains('" + text + "')").remove();
//         })
//     },
//     addSetup: function() {
//         //得到要添加的Li选项
//         var $addli = $("#addR li");
//         //得要要添加到的容器
//         var deleteL = $("#deleteL");
//         //接触绑定
//         $addli.unbind("click");
//         //添加点击事件
//         $addli.click(function() {
//             var abc = $(this).data("id");
//             //得到点击的索引值
//             var index = $addli.index(this);
//             //得到要添加的li
//             var addLi = $addli.eq(index).remove();
//             //添加到deleteL
//             addLi.appendTo(deleteL);
//             addLi.click(function() {
//                 deleteSetup()
//             });
//             //获取到文本信息
//             var text = $(this).text();
//             // console.log(text);
//             var addNavList = $("<li><a href='javascript:;'>" + text + "</a></li>");
//             // //实时的添加到导航
//             addNavList.appendTo($("#menu-list"));

//         }).click(function() {
//             this.bindClick();
//         })
//     }
// };
// clickSingle.init();

/**第二种写法
 * 这样写链式调用会简单，但是代码重复多
 * 在一整个大功能下，互相调用比较方便。
 */
var showli = {
    //初始化函数
    init: function() {
        //绑定事件
        this.render();
        this.bind();
    },
    //获取dom元素
    render: function() {
        var that = this;
        that.btnClick = $("#menu-list li");
    },
    bind: function() {
        var that = this;
        that.btnClick.click(function() {
            $(this).addClass("select").siblings().removeClass("select");
            var index = $("#menu-list li").index(this);
            $(".contentAll>div").eq(index).show().siblings().hide();
        }).mouseover(function() {
            $(this).addClass("select").siblings().removeClass("select");
        })
    }
}
showli.init();

/**
 * 导航里面动态删除导航选项，比如添加音乐，
 */
var deleteSetup = {
    //初始化函数
    init: function() {
        //绑定事件
        this.render();
        this.bind();
    },
    //获取dom元素
    render: function() {
        var that = this;
        that.btnClick = $("#deleteL li");
    },
    bind: function() {
        var that = this;
        var $lis = $("#deleteL li");
        $lis.unbind("click");
        that.btnClick.click(function() {
            //得到要删除到的容器
            var addR = $("#addR");
            //接触绑定
            var abc = $(this).data("id");
            console.log("delete");
            var indexs = $lis.index(this);
            //获取到删除的li
            var deleteLi = $lis.eq(indexs).remove();
            //添加到addR
            deleteLi.appendTo(addR);
            deleteLi.onclick = addSetup.init();
            var text = $(this).text();
            $("#menu-list").find("#" + abc).remove();
            $("#menu-list li").filter(":contains('" + text + "')").remove();
        })
    }
}
deleteSetup.init();
/**
 * 导航里面动态添加导航选项，比如添加音乐，
 */
var addSetup = {
    //初始化函数
    init: function() {
        //绑定事件
        this.render();
        this.bind();
    },
    //获取dom元素
    render: function() {
        var that = this;
        that.btnClick = $("#addR li");
    },
    bind: function() {
        var that = this;
        //得到要添加的Li选项
        var $addli = $("#addR li");
        //得要要添加到的容器
        var deleteL = $("#deleteL");
        //接触绑定
        $addli.unbind("click");
        //添加点击事件
        that.btnClick.click(function() {
            var abc = $(this).data("id");
            //得到点击的索引值
            var index = $addli.index(this);
            //得到要添加的li
            var addLi = $addli.eq(index).remove();
            //添加到deleteL
            addLi.appendTo(deleteL);
            addLi.onclick = deleteSetup.init();
            //获取到文本信息
            var text = $(this).text();
            // console.log(text);
            var addNavList = $("<li><a href='javascript:;'>" + text + "</a></li>");
            // //实时的添加到导航
            addNavList.appendTo($("#menu-list"));

        }).click(function() {
            showli.init();
        })
    }
}
addSetup.init();




/**
 * 1，这样写点击事件放一起，可以全部调用
 * 2，更为简洁
 * 换肤功能, 换肤功能下面的p标签的显示,监听背景透明度,返回顶部，导航添加开启关闭的单例
 */
var cgSkin = {
    //初始化函数
    init: function() {
        //事件
        this.bind();
        this.showp();
        this.replaceSkin();
        this.returnTop();
        // this.openAdd();
    },
    bind: function() {
        // 换肤功能 关闭，开启，预览，替换,监听背景透明度,返回顶部，
        $(".js-close").on('click', this.closeSkin);
        $(".js-open").on('click', this.openSkin);
        $('#opacity').on('change', this.listenOpacity);
        $(".returntop").on('click', this.returnTop);
        $("#add-click").on('click', this.openAdd);
    },
    // 关闭
    closeSkin: function() {
        $("#cgskin").fadeOut(300);
    },
    // 开启
    openSkin: function() {
        $("#cgskin").fadeIn(300);
    },
    //  换肤功能下面的p标签的显示
    showp: function() {
        $("#js-webmenu p").each(function(index) {
            $(this).hover(function() {
                $(this).css({ "opacity": 1, "background": "#666" })
            }, function() {
                $(this).css({ "opacity": 0, "background": "" })
            })
        })
    },
    // 返回顶部
    returnTop: function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() > 10) {
                $(".returntop").fadeIn(300);
            } else {
                $(".returntop").fadeOut(300);
            }
        })
        $('body,html').animate({ scrollTop: 0 }, 30);
        return false;
    },
    openAdd: function() {
        var openSetup = $("#setup-menu");
        openSetup.slideToggle(200);
    },
    // 替换
    replaceSkin: function() {
        var $pics = $(".js-pic img");
        var $container = $(".container");
        var $bdpic = $(".main-top-pic");
        var $preview = $(".js-preview");
        var bgpic = localStorage.getItem("bgpic");
        //检查是否有设置localStorage
        if (bgpic) {
            $container.css({ "background-image": "url( " + bgpic + " )", "background-size": "100%" });
            $bdpic.removeClass("main-top-pic").addClass("main-top-pic2");
        } else {
            $bdpic.removeClass("main-top-pic2").addClass("main-top-pic");
        }
        $(".skin-text").each(function(index) {
            //得到点击图片的src并设置背景
            $(this).on("click", function() {
                    var src = $pics.eq(index).attr("src");
                    $container.css({ "background-image": "url( " + src + " )", "background-size": "100%" });
                    $(".close-setskin").fadeIn(100); //显示换肤
                    $(".cgopacity").fadeIn(100) //显示透明度
                    $bdpic.removeClass("main-top-pic").addClass("main-top-pic2");
                    localStorage.setItem("bgpic", src)
                })
                //不使用换肤功能背景设置白色
            $(".close-setskin").on("click", function() {
                    $container.css("background", "#fff");
                    $(".close-setskin").fadeOut(100) //关闭换肤
                    $(".cgopacity").fadeOut(100) //关闭透明度
                    $bdpic.removeClass("main-top-pic2").addClass("main-top-pic");
                    //清空
                    localStorage.removeItem("bgpic");
                })
                //移动到图片的时候得到src
            $(this).hover(function() {
                var srcs = $pics.eq(index).attr("src");
                $preview.attr("src", srcs)
            }, function() {
                $preview.attr("src", "image/50.jpg")
            })
        })
    },
    // 监听背景透明度
    listenOpacity: function() {
        var numberVaule = $('#number')[0].innerHTML;
        $('#number')[0].innerHTML = $('#opacity').val();
        if (numberVaule > 0 && numberVaule < 25) {
            main.style.opacity = 0.25;
        } else if (numberVaule > 25 && numberVaule < 50) {
            main.style.opacity = 0.5;
        } else if (numberVaule > 50 && numberVaule < 75) {
            main.style.opacity = 0.75;
        } else {
            main.style.opacity = 0.95;
        }
    }
}
$(function() {
    cgSkin.init();
})
