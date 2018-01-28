(function ($) {
	var doAjax              = function (callback) {
			$.ajax({
				url     : 'getComment2.php',
				data    : {},
				type    : 'get',
				dataType: "json",
				success : function (result) {
					callback(result);
					return true;
				},
				error   : function () {
					alert('获取评论失败！');
				}
			});
			return true;
		},
		getComment          = function (page) {
			$('.comment_list').html('加载中...');
			doAjax(function (result) {
				var relativeCmidsList = result.relativeCmidsList,
					commentsList      = result.commentsList,
					pageCommentHtml   = '';
//					console.log(relativeCmidsList);
				for (var cmIndex in relativeCmidsList) {
					var cmidsStr  = relativeCmidsList[cmIndex],
						cmidsList = cmidsStr.split(',').reverse();
				
					var mainCmid         = cmidsList.shift(),
						showHtml         = '',
						comment          = '',
						thisCommentBlock = commentBlock.replace('{{username}}', commentsList[mainCmid]['from_uid'])
							.replace('{{addtime}}', commentsList[mainCmid]['addtime'])
							.replace('{{commentContent}}', commentsList[mainCmid]['content']);
				
				
					for (var i = 0; i < cmidsList.length; i++) {
						comment = commentsList[cmidsList[i]] ? commentsList[cmidsList[i]] : '';
					
						//当数据评论过多时，中奖的部分宽度100%，使其不会因为评论过多导致最顶端评论宽度十分狭窄
						var middleStr = '';
						if (cmidsList.length > 10 && i == 4) {
							while (i < cmidsList.length - 3) {
								i++;
								var commentMiddle = commentsList[cmidsList[i]] ? commentsList[cmidsList[i]] : '';
								middleStr += '<div style="width: 100%;border-width: 0;border-top-width: 1px;border-radius: 0px;">';
								if (commentMiddle) {
									middleStr += ''
										+ relativeCommentInfo
											.replace('{{username}}', commentMiddle['from_uid'])
											.replace('{{addtime}}', commentMiddle['addtime'])
											.replace('{{content}}', commentMiddle['content'])
											.replace('{{up}}', commentMiddle['up'])
											.replace('{{down}}', commentMiddle['down'])
								} else {
									middleStr += '<p>该评论已经删除<p>';
								}
								middleStr += '</div> ';
							}
						}
//							console.log(middleStr);
						if (!comment) {
							showHtml = '<div>' + showHtml + '<p>该评论已经删除</p>' + middleStr + '</div>';
						} else {
							showHtml = ''
								+ '<div>'
								+ showHtml
								+ relativeCommentInfo
									.replace('{{username}}', comment['from_uid'])
									.replace('{{addtime}}', comment['addtime'])
									.replace('{{content}}', comment['content'])
									.replace('{{up}}', comment['up'])
									.replace('{{down}}', comment['down'])
								+ middleStr
								+ '</div>';
						}
					
					
					}
					showHtml = showHtml ? '<div class="relative_comment_list">' + showHtml + '</div>' : showHtml;
				
					thisCommentBlock = thisCommentBlock.replace('{{relativeComment}}', showHtml);

//						console.log(thisCommentBlock);
					pageCommentHtml += thisCommentBlock;
				}
				$('.comment_list').html(pageCommentHtml ? pageCommentHtml : '还没有评论。');
			});
		},
		commentBlock        = '' +
			'<li class="article_overview">' +
			'   <div class="article_overview_wrap">' +
		
			'     <div class="content_header">' +
			'        <div  class="content_header_avatar">' +
			'            <a><img src="img/avatar.png"></a>' +
			'        </div>' +
			'        <div class="content_header_title">' +
			'           <div><a href="#">{{username}}</a></div>' +
			'           <div  class="content_add_time">{{addtime}}</div>' +
			'        </div>' +
			'     </div>' +
		
			'     {{relativeComment}}' +
		
			'     <div class="preview_content">' +
			'        <div class="preview_content_show">{{commentContent}}</div>' +
			'        <div class="comment_op">' +
			'           <a href="#">顶(1000000)</a>' +
			'           <a href="#">踩(1000000)</a>' +
			'           <a href="#">回复(100000)</a>' +
			'           <a href="#">分享</a>' +
			'        </div>' +
			'     </div>' +
			'   </div>' +
			'</li>',
		relativeCommentInfo = ''
			+ '<div class="comment_info">'
			+ '   <p>'
			+ '     <a href=""><img class="user_header_img" src="img/avatar.png"></a>'
			+ '     <a href="#">{{username}}</a>'
			+ '     <a class="report_comment" href="#">举报</a>'
			+ '     <i class="time">{{addtime}}</i>'
			+ '   </p>'
		
			+ '   <p class="relative_comment_content">{{content}}</p>'
		
			+ '   <p class="relative_comment_op">'
			+ '     <a href="#">顶({{up}})</a>'
			+ '     <a href="#">踩({{down}})</a>'
			+ '     <a href="#">回复</a>'
			+ '     <a href="#">分享</a>'
			+ '   </p>'
			+ '</div>';
	
	getComment();
})(jQuery);