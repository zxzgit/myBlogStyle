<?php
/**
 * Created by zxzTool.
 * User: zxz
 * Datetime: 2017/1/6 17:25
 */
//数据库存储先关评论从新到老

$pdo = new PDO('mysql:dbname=yii2basic;host=127.0.0.1;charset=utf8', 'root', '');

$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->prepare('SELECT * FROM zxz_comment WHERE aid=1 AND cmid!=7');
$stmt->execute();//这里的$name 不要用 addslashed()处理,excute拼接字符串的时候好像在函数内对各个参数都进行了处理。
$commentList = $stmt->fetchAll();


//获取相关评论id
$relativeCmidsList = [];//先关评论
$relativeUids      = [];//相关评论用户
$commentByIdList   = [];//评论数组，键为评论id
foreach ($commentList as $commentListKey => $commentListVal) {
	$relativeUids[]                                              = $commentListVal['from_uid'];
	$commentByIdList[$commentListVal['cmid']]                    = $commentListVal;
	$commentByIdList[$commentListVal['cmid']]['cmids']           = [];
	$commentByIdList[$commentListVal['cmid']]['relativeComment'] = [];
	//如果有关联评论
	if (!empty($commentListVal['from_cmids'])) {
		$thisFromCmids     = explode(',', $commentListVal['from_cmids']);
		$relativeCmidsList = array_merge($relativeCmidsList, $thisFromCmids);

		$commentByIdList[$commentListVal['cmid']]['cmids'] = $thisFromCmids;
	}
}
unset($commentList);
//print_r($commentByIdList);
//print_r($relativeCmidsList);

//剔除已经查找的评论cmid
$relativeCmidsList = array_unique($relativeCmidsList);
$relativeCmidsList = array_diff($relativeCmidsList, array_keys($commentByIdList));
//print_r($relativeCmidsList);

//查询所有子评论
$relativeCommentByIdList = $commentByIdList;//本也中所有涉及的评论数组，键为：评论id

if (!empty($relativeCmidsList)) {
	$stmt = $pdo->prepare('SELECT * FROM zxz_comment WHERE cmid IN(' . implode(',', $relativeCmidsList) . ')');
	$stmt->execute();
	$relativeCommentList = $stmt->fetchAll();
//	print_r($relativeCommentList);

	foreach ($relativeCommentList as $index => $item) {
		$relativeCommentByIdList[$item['cmid']] = $item;
		$relativeUids[]                         = $item['from_uid'];
	}
	unset($relativeCommentList);
}
//评论获取子评论
foreach ($commentByIdList as $commentByIdKey => &$commentByIdVal) {
	$thisCmidsList = $commentByIdVal['cmids'];
	foreach ($thisCmidsList as $thisCmidVal) {
		$commentByIdVal['relativeComment'][] = $relativeCommentByIdList[$thisCmidVal];
	}
}
unset($commentByIdVal);

$relativeUids = array_unique($relativeUids);
//各个评论获取子评论
//print_r($commentByIdList);
//print_r($relativeUids);

//todo something 查找评论用户信息
include "article.php";
?>




