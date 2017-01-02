/**
 * Created by zxz on 2017/1/1.
 */
common0bj.commonEvents.push(
	['click', '.on', function () {alert(1442378);}]
);
common0bj.windowResizeEvents.push(
	(function () {
		return function (){
			var mainClass = '.main',
				mainDomWidth = $(mainClass).width(),
				articleOverviewClass='.article_overview',
				contentMain=$(mainClass).find('.content_main'),
					cms='content_main_small';
			(mainDomWidth<1000)?$(articleOverviewClass).addClass('article_overview_middle'):$(articleOverviewClass).removeClass('article_overview_middle');
			(mainDomWidth<600)?$(contentMain).addClass(cms):$(contentMain).removeClass(cms);
			(mainDomWidth<600)?$(articleOverviewClass).addClass('article_overview_small'):$(articleOverviewClass).removeClass('article_overview_small');

		};

	})()
);

