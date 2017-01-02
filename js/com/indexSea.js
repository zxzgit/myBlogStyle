/**
 * Created by zxz on 2016/12/30.
 */
define(function (require, exports, module) {
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

			doDomAdaptive:function(){
				for(var i in this.windowResizeEvents){
					this.windowResizeEvents[i]();
				}
			},
			documentReady:function(){
				var thatObj=this;
				$(function(){
					//todo something on ready
					window.onresize=function(){
						thatObj.doDomAdaptive();
					};
					window.onresize();//初始执行一次resize,适应手机屏幕
					thatObj.distributionEventBind(thatObj.commonEvents);
				});
				return thatObj;
			},
			commonEvents:[],//页面初始化dom事件绑定
			windowResizeEvents:[]
		};

		//全局commonObj对象建立
		window.common0bj = new commonClass();


		/**
		 * 所有页面通用事件设置
		 * @returns {*[]} 事件数组
		 * @private
		 */
		common0bj.commonEvents=[
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
			],
			//['click', '.nav a', function () {alert(12378);}]
		];


		common0bj.windowResizeEvents.push(
				(function(){
					//页面DOM根据可视区域变化
					var mainClass = '.main',
							mainDomWidth = $(mainClass).width(),
							navListWidth = $('.nav_list').width();
					return (function () {//头部、主区域自适应变化
						var headerClass = '.header';
						(window.outerWidth < (navListWidth + 20)) ? $(headerClass).hide().addClass('header_small_size') : $(headerClass).show().removeClass('header_small_size');
						(window.outerWidth < (mainDomWidth + 50)) ? $(mainClass).addClass('main_small_size') : $(mainClass).removeClass('main_small_size');

						(window.outerWidth < (mainDomWidth + 50)) ? $('.footer_main').addClass('footer_main_small') : $('.footer_main').removeClass('footer_main_small');
						(window.outerWidth < 300) ? $(mainClass).addClass('main_smallest_size') : $(mainClass).removeClass('main_smallest_size');
						if(window.outerWidth < 300){
							$('body').css('width','320px');
						}else{
							$('body').css('width','');
						}
					});
				})()
		);
	})(jQuery);
});

