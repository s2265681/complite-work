
const originRequest = require("request"); // 加载网址
const iconv = require('iconv-lite');      // 转化成html
const cheerio = require('cheerio');       // 类似jq的选择器抓取内容 

const fs = require('fs')                  // 文件的读写操作

function request(url,callback) {
    const options = {
        url:url,
        encoding:null
    };
    originRequest(url,options,callback);
}

// 定向爬取
for (let i = 100553; i<100563; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`;
    request(url,function(err,res,body) {
        const html = iconv.decode(body,"gb2312");
        const $ = cheerio.load(html);
        // console.log($(".title_all h1"));
        // console.log($("img").attr('src'))
        const imgUrl = $("img").attr('src')
        save(imgUrl)
    })
}


function save(url) {
    // let url = 'http://img1.imgtn.bdimg.com/it/u=3153545522,2388976887&fm=26&gp=0.jpg'
    let ext = url.split('.').pop()
    originRequest(url).pipe(fs.createWriteStream(`./image/${new Date().getTime()}.${ext}`));
}

// ./image/1574647635375.com/search/index?tn=baiduimage&ct=201326592&lm=-1&cl=2&ie=gb18030&word=%CF%C4%C4%BF%D3%D1%C8%CB%D5%CA%B1%DA%D6%BD1080&fr=ala&ala=1&alatpl=adress&pos=0&hs=2&xthttps=000000'