/**
 * Created by zxz on 2016/12/30.
 */

(function ($) {
	var commonClass = function () {//基本操作类
		this._init();
	};

	commonClass.prototype = {
		/**
		 * 初始化对象
		 * @private
		 */
		_init: function () {
			this.documentReady();
		},
		/**
		 *批量绑定事件
		 * @param domEventsList array
		 */
		distributionEventBind: function (domEventsList) {
			for (var i in domEventsList) {
				this.singleEventBind.apply(null, domEventsList[i]);
			}
		},
		/**
		 * 单个dom事件绑定
		 * @param event String 事件
		 * @param dom String|Object dom元素
		 * @param callback 触发函数
		 */
		singleEventBind: function (event, dom, callback) {
			$(document).on(event, dom, callback);
		},

		/**
		 * 屏幕调整相关函数执行
		 * @returns {commonClass}
		 */
		doDomAdaptive: function () {
			for (var i in this.windowResizeEvents) {
				this.windowResizeEvents[i]();
			}
			return this;
		},
		/**
		 * 页面初始化
		 * @returns {commonClass}
		 */
		documentReady: function () {
			var thatObj = this;
			$(function () {
				//todo something on ready
				window.onresize = function () {
					thatObj.doDomAdaptive();
				};
				window.onresize();//初始执行一次resize,适应手机/小屏设备
				thatObj.distributionEventBind(thatObj.commonEvents);
			});
			return thatObj;
		},
		commonEvents: [],//页面初始化dom事件绑定数组
		windowResizeEvents: []//页面调整大小触发事件数组
	};

	//全局commonObj对象建立
	window.commonObj = new commonClass();


	/************************************ 通用事件绑定 ************************************************/


	commonObj.commonEvents = [//小屏头部显隐先关控制
		[
			'click',
			'.nav_toggle',
			function () {//小屏头部显隐
				$('.header').toggle();
			}
		],
		[
			'click',
			'.main',
			function () {//小屏点击页面主区隐藏头部
				$('.header_small_size').hide();
			}
		]
	];


	commonObj.windowResizeEvents.push(//头部、尾部、内容显示区根据屏幕调整控制
		(function () {
			//页面DOM根据可视区域变化
			var mainClass = '.main',
				footerMainClass = '.footer_main',
				mainDomWidth = $(mainClass).width(),
				navListWidth = $('.nav_list').width();
			return (function () {//头部、主区域自适应变化
				var headerClass = '.header';
				(window.outerWidth < (navListWidth + 20)) ? $(headerClass).hide().addClass('header_small_size') : $(headerClass).show().removeClass('header_small_size');
				(window.outerWidth < (mainDomWidth + 50)) ? $(mainClass).addClass('main_middle_size') : $(mainClass).removeClass('main_middle_size');
				(window.outerWidth < 705) ? $(mainClass).addClass('main_small_size') : $(mainClass).removeClass('main_small_size');

				(window.outerWidth < (mainDomWidth + 50)) ? $(footerMainClass).addClass('footer_main_small') : $(footerMainClass).removeClass('footer_main_small');
				(window.outerWidth < 300) ? $(mainClass).addClass('main_smallest_size') : $(mainClass).removeClass('main_smallest_size');
				if (window.outerWidth < 300) {
					$('body').css('width', '320px');
				} else {
					$('body').css('width', '');
				}
			});
		})()
	);
})(jQuery);


