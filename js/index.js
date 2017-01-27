/**
 * Created by zxz on 2017/1/1.
 */
common0bj.commonEvents.push(
	['click', '.on', function () {alert(1442378);}]
);
common0bj.windowResizeEvents.push(
	(function () {
		return function () {
			var mainClass = '.main',
				mainDomWidth = $(mainClass).width(),
				articleOverviewClass = '.article_overview',
				contentMain = $(mainClass).find('.content_main'),
				cms = 'content_main_small';
			(mainDomWidth < 1000) ? $(articleOverviewClass).addClass('article_overview_middle') : $(articleOverviewClass).removeClass('article_overview_middle');
			(mainDomWidth < 600) ? $(contentMain).addClass(cms) : $(contentMain).removeClass(cms);
			(mainDomWidth < 600) ? $(articleOverviewClass).addClass('article_overview_small') : $(articleOverviewClass).removeClass('article_overview_small');

		};

	})()
);

//轮播图展示
(function () {
	var showId = 0,
		scrollSwapDom = $('.jsIndexScroll'),
		selectScrollDiv = $('.jsSelectScroll'),
		divImgList = $(scrollSwapDom).find('div'),
		scrollCount = divImgList.length,//轮播图片数
		selectLiWidth = 19,//每个选择器所需宽度
		doScroll = function () {
			$(divImgList).hide();
			$(divImgList[showId]).show();//展示轮到的图片
			showId++;
			if (showId >= scrollCount) {
				showId = 0;
			}
		},
		scrollInterval = setInterval(doScroll, 1000);//图片轮播器执行
	//制造轮播图片选择器
	(function () {
		$(selectScrollDiv).width(selectLiWidth * scrollCount);
		$(selectScrollDiv).find('ul').html((new Array(scrollCount + 1)).join('<li></li>'));
	})();
	//鼠标移到图片选择器
	$(selectScrollDiv).find('ul li').mouseover(function () {
		clearInterval(scrollInterval);
		showId = $(this).index();//展示选择的图片
		doScroll();
	});
	//鼠标移出图片选择器
	$(selectScrollDiv).find('ul li').mouseleave(function () {
		scrollInterval = setInterval(doScroll, 1000);//图片轮播器执行
	});
})();
