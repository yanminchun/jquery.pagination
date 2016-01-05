(function ($) {
    /*
    * 分页导航条
    * author: yanminchun
    * qq: 937105113
    * date: 2016-1-3
    */
    $.fn.pagination = function (opts) {
        var self = this;
        var defaultOptions = {
            totalPage: null,   // 总页数
            pageCurrent: 1,    // 当前页，从1开始
            sideLength: 4,     // 分页条上当前页左右两侧的数量，总数量为 sideLength*2 + 1
            buttonType: "all", // 默认包含首页这些导航，非all不包含
            buttonClick: null  // 点击时的回调函数
        };

        opts = $.extend({}, defaultOptions, opts);// 配置合并

        // 进行配置检查
        if ((!$.isNumeric(opts.totalPage) && console.log("[jquery.pagination] [totalPage] must be numeric value")) &&
            (!$.isNumeric(opts.pageCurrent) && console.log("[jquery.pagination] [pageCurrent] must be numeric value")) &&
            (!$.isNumeric(opts.buttonLength) && console.log("[jquery.pagination] [buttonLength] must be numeric value")))
            return;

        // 配置检查
        if (!$.isFunction(opts.buttonClick))
            opts.buttonClick = function () { }

        // 不合法值设置为合法值
        opts.totalPage < 0 && (opts.totalPage = 0);
        opts.pageCurrent <= 0 && (opts.pageCurrent = 1);
        opts.buttonLength <= 0 && (opts.buttonLength = 9);

        // 构造一个<a></a>
        var aButton = function (page, text, opts) {
            var $a = $("<a href='javascript:'></a>").attr("page", page).html("<span>" + text + "</span>").click(function () {
                var c = $(this).attr("page");
                opts.pageCurrent = parseInt(c);
                opts.buttonClick(opts.pageCurrent);
                setup(paging(opts.pageCurrent, opts.totalPage, opts.sideLength), opts);
            });
            return $a;
        }

        // 组装导航栏
        var setup = function (array, opts) {
            $(self).empty();// 每次点击后清空

            var $ul = $("<ul class='pagination'></ul>");

            // 添加首页和上一页
            if (opts.buttonType === "all" && opts.pageCurrent != 1 && opts.totalPage >0) {
                $ul.append($("<li></li>").append(aButton(1, "首页", opts)));
                $ul.append($("<li></li>").append(aButton(opts.pageCurrent - 1, "上一页", opts)));
            }

            // 数字导航
            for (var i = 0; i < array.length; i++) {
                var $li = $("<li></li>");
                var page = array[i];
                var $a = aButton(page, page, opts);
                page == opts.pageCurrent && $li.attr("class", "active");
                $li.append($a);
                $ul.append($li);
            }

            // 添加下一页和尾页
            if (opts.buttonType === "all" && opts.pageCurrent != opts.totalPage && opts.totalPage > 0) {
                $ul.append($("<li></li>").append(aButton(opts.pageCurrent + 1, "下一页", opts)));
                $ul.append($("<li></li>").append(aButton(opts.totalPage, "尾页", opts)));
            }

            $(self).append($ul);
        }

        // 第一次组装
        setup(paging(opts.pageCurrent, opts.totalPage, opts.sideLength), opts);

        return self;
    }

    // 比较两个数的大小
    function compare(first, second) {
        if (first == second)
            return 0;
        if (first < second)
            return -1;
        else
            return 1;
    }

    // 分页条上的数字，例如[1,2,3]
    function paging(current, total, side) {
        var pages = [current];
        for (var i = 0, page = current; i < side ; i++)
            pages.push(++page);
        for (var i = 0, page = current; i < side; i++)
            pages.push(--page);
        pages = pages.sort(compare);
        while (pages[0] <= 0) {
            for (var i = 0; i < pages.length; i++)
                pages[i] = pages[i] + 1;
        }
        while (pages[pages.length - 1] > total) {
            for (var i = 0; i < pages.length; i++)
                pages[i] = pages[i] - 1;
        }
        var t = [];
        for (var i = 0; i < pages.length; i++) {
            if (pages[i] > 0)
                t.push(pages[i]);
        }
        return t.sort(compare);
    }

})($);