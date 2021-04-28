/**
 * Created by xia on 16/12/2.
 */
/**
 * 用户信息
 *
 *
 *
 */
//定义一个Schema就这么简单，指定字段名和类型
//Schema Types内置类型如下：
//String
//Number
//Boolean | Bool
//Array
//Buffer
//Date
//ObjectId | Oid
//Mixed
var mongoose = require('./db.js');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
	{
		title: {type: String},
		fileUrl: {type: String},
		desc: {type: String},
		topicImg: {type: String}
	}
);
module.exports = mongoose.model('Page', UserSchema);
