$(window).ready(function() {
    showMore();
    navchange();
    returntop();
    showli();
    showHot();
    closeSkin()
    changeskin()
    listenScorll();
    deleteSetup();
    addSetup();
    openAdd();
})

function showMore() {
    var $more = $(".more"); //更多产品
    var $submore = $(".submore");
    var $setup = $(".setup"); //设置
    var $submenu = $(".submenu");

    $more.on("mouseover", function() {
        $submore.fadeIn(100)
    })
    $submore.on("mouseover", function() {
        $submore.fadeIn(100)
    })
    $submore.on("mouseleave", function() {
        $submore.fadeOut(100)
    })
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
/**
 * @return {滑动时百度搜索框置顶}
 */
function navchange() {
    var $cgnav = $("#changenav");
    $(window).scroll(function() {
        if ($(window).scrollTop() > 150) {
            $cgnav.removeClass("head-search").addClass("fixed-search");
        } else {
            $cgnav.removeClass("fixed-search").addClass("head-search");

        }
    })

}
/**
 * @return {返回顶部}
 */
function returntop() {
    var $returntop = $(".returntop");
    $(window).scroll(function() {
        if ($(window).scrollTop() > 10) {
            $returntop.fadeIn(300);
        } else {
            $returntop.fadeOut(300);
        }
    })
    $returntop.click(function() {
        $('body,html').animate({ scrollTop: 0 }, 30);
        return false;
    })

}

/**
 * 导航的li的显示
 */
function showli() {
    var $lis = $("#menu-list li");
    $lis.click(function() {
        $(this).addClass("select").siblings().removeClass("select");
        var index = $lis.index(this);
        $(".contentAll>div").eq(index).show().siblings().hide();
    }).mouseover(function() {
        $(this).addClass("select").siblings().removeClass("select");

    })

}
/**
 * 导航里面动态删除导航选项，比如添加音乐，
 */
function openAdd() {
    var addBtn = $("#add-click")
    addBtn.click(function() {
        var openSetup = $("#setup-menu");
        openSetup.slideToggle(200);
    })
}


/**
 * 导航里面动态删除导航选项，比如添加音乐，
 */
function deleteSetup() {
    //得到要删除的Li选项
    var $lis = $("#deleteL li");
    //得到要删除到的容器
    var addR = $("#addR");
    //接触绑定
    $lis.unbind("click");
    //添加点击事件
    $lis.click(function() {
        var abc = $(this).data("id");
        // console.log(abc) 
        var indexs = $lis.index(this);
        // console.log(indexs);
        //获取到删除的li
        var deleteLi = $lis.eq(indexs).remove();
        // console.log(deleteLi);
        // var deleteLis = deleteLi.addClass("solid").removeClass("dashed");
        //添加到addR
        deleteLi.appendTo(addR);
        deleteLi.onclick = addSetup();
        var text = $(this).text();
        $("#menu-list").find("#" + abc).remove();
        // var addNavList = $("<li><a href='javascript:;'>" + text + "</a></li>");
        // 实时的删除，找到匹配该字符的LI并删除
        $("#menu-list li").filter(":contains('" + text + "')").remove();

    })
}


/**
 * 导航里面动态添加导航选项，比如添加音乐，
 */
function addSetup() {
    //得到要添加的Li选项
    var $addli = $("#addR li");
    //得要要添加到的容器
    var deleteL = $("#deleteL");
    //接触绑定
    $addli.unbind("click");
    //添加点击事件
    $addli.click(function() {
        var abc = $(this).data("id");
        console.log("add")
            //得到点击的索引值
        var index = $addli.index(this);
        //得到要添加的li
        var addLi = $addli.eq(index).remove();
        // var addLis = addLi.addClass("dashed").removeClass("solid");
        //添加到deleteL
        addLi.appendTo(deleteL);
        addLi.onclick = deleteSetup();
        //获取到文本信息
        var text = $(this).text();
        // console.log(text);
        var addNavList = $("<li><a href='javascript:;'>" + text + "</a></li>");
        // //实时的添加到导航
        addNavList.appendTo($("#menu-list"));
    }).click("on", showli);
}

/**
 * 导航随滚动而固定
 */
function showHot() {
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

/**
 * 换肤功能下面的p标签的显示
 */
function showp() {
    var $skintext = $(".skin-text");
    var $jswebmenu = $("#js-webmenu p");
    $jswebmenu.each(function(index) {
        $skintext.eq(index).id = index;
        $jswebmenu.eq(index).on("mouseover", function() {
            $skintext.eq(this.id).css({
                "opacity": 1,
                "background": "#666"
            })
        })
        $jswebmenu.eq(index).on("mouseout", function() {
            $skintext.eq(this.id).css({
                "opacity": 0,
                "background": ""
            })
        })
    })
}
/**
 * 关闭换肤功能
 */

function closeSkin() {
    $(".js-close").on("click", function() {
        $("#cgskin").fadeOut(300)
    })
    $(".js-open").on("click", function() {
        $("#cgskin").fadeIn(300);
    })
}
/**
 * 点击实现换肤功能
 */
function changeskin() {
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
}
/**
 * @return {监听滚动条的数值}
 */

function listenScorll() {
    var numberVaule = $('#number')[0].innerHTML;
    console.log(numberVaule);
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
