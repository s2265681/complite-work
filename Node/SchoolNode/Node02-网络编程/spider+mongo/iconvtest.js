/**
 * Created by xia on 16/11/30.
 */
var originRequest = require('request')
var cheerio = require('cheerio')
var iconv = require('iconv-lite')
var headers = {
	'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36'
}
function request (url, callback) {
	var options = {
		url: url,
		encoding: null,
		headers: headers
	}
	originRequest(options, callback)
}
var url = 'http://www.dy2018.com/i/97462.html'
request(url, function (err, res, body) {
	var html = iconv.decode(body, 'gb2312')
	var $ = cheerio.load(html, {decodeEntities: false})
	console.log($('.title_all h1').text())
})