<?php
/**
 * Created by zxzTool.
 * User: zxz
 * Datetime: 2017/1/6 17:25
 */
//数据库存储先关评论从老到新，e.g.'6,5,4,' 代表：本条评论评论6，而6是评论5的,5是评论4的
//执行添加的时候,如果是评论他人的都是：$from_cmids=所评论id+','+'所评论条目$from_cmids的值';

$pdo = new PDO('mysql:dbname=yii2basic;host=127.0.0.1;charset=utf8', 'root', '');

$pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$stmt = $pdo->prepare('SELECT * FROM zxz_comment WHERE aid=1');
$stmt->execute();//这里的$name 不要用 addslashed()处理,excute拼接字符串的时候好像在函数内对各个参数都进行了处理。
$commentList = $stmt->fetchAll(PDO::FETCH_ASSOC);



//获取相关评论id
$relativeCmidsList = [];//各条评论相关的cmid
$commentByIdList   = [];//本业所有相关评论数组，键为评论id

$relativeUids      = [];//相关评论用户
foreach ($commentList as $commentListKey => $commentListVal) {
	$relativeCmidsList[]=$commentListVal['from_cmids']?$commentListVal['from_cmids']."{$commentListVal['cmid']}":$commentListVal['cmid'].'';
	$relativeUids[]=$commentListVal['from_uid'];

	$commentByIdList[$commentListVal['cmid']]=$commentListVal;
}



//从数据库中获取未其他相关评论信息
$fromCmids=array_diff(array_unique(explode(',',implode(',',$relativeCmidsList))),array_keys($commentByIdList));
$fromCmids=array_filter($fromCmids);//去除空值

//print_r($fromCmids);
if (!empty($fromCmids)) {
	//查询自评论
	$stmt = $pdo->prepare('SELECT * FROM zxz_comment WHERE cmid IN(' . implode(',', $fromCmids) . ')');
	$stmt->execute();
	$fromCommentList = $stmt->fetchAll(PDO::FETCH_ASSOC);
//	print_r($fromCommentList);

	foreach ($fromCommentList as $index => $item) {
		$commentByIdList[$item['cmid']]=$item;
		$relativeUids[]=$item['from_uid'];
	}
}

//print_r($commentByIdList);
//print_r($relativeCmidsList);
//获取评论用户信息



$returnList=[
	'commentsList'=>$commentByIdList,
	'relativeCmidsList'=>$relativeCmidsList,
];

exit(json_encode($returnList));


//include "article2.php";
?>




