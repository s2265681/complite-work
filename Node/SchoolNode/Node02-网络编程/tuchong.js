const fs = require('fs') //创建文件、文件夹

const cheerio = require('cheerio') //cheerio爬虫

const requests = require('sync-request') //node的网络请求

const request = require('request') //利用request模块保存图片

var html = '';

let count = 0 // 记录扒取的图片数量

let imgDirName = '' // 图片存放的目录

// 爬取图虫 https://tuchong.com
// let url = "https://tuchong.com/443122/15624611/"; // 目标网站
let url = "https://tuchong.com/1037985/15396208/"; // 目标网站

html = requests('GET', url).getBody().toString(); // 拿到网站内容转化成html字符串
console.log(html)

filterSlideList(html)

function filterSlideList(html) {

    if (html) {

        var $ = cheerio.load(html); // 利用cheerio模块将完整的html装载到变量$中，之后就可以像jQuery一样操作html了

        // 拿到图片的父容器

        var $imgdom = $("article.post-content");

        // 拿到主题,并使用主题名字(名字太长，截取一下)创建文件夹

        var imgarrname = $("title").text().substr(0, 5);

        console.log("开始爬 " + imgarrname + " 主题的图片")

        //创建放图片的文件夹

        fs.mkdir('./tuchongImg/' + imgarrname + '/', (err) => {

            if (err) {

                console.log(err)

            }

        })

        //取每一张图片，并把图片放到目录下

        $imgdom.find('img').each(function(index, el) {

            var imgurl = $(this).attr("src"), //拿到图片的在线链接

                imgnam = $(this).attr("alt"), //拿到图片的标题

                imgid = $(this).attr("id"); //图片名字有可能重复，取到唯一id

            // 利用request模块保存图片

            request(imgurl).pipe(fs.createWriteStream('./tuchongImg/' + imgarrname + '/' + imgnam + imgid + '.jpg'))

            // '''''''''''''''''''''''''''''''''''''''''''''''''图片目录'''''''''''''  拼接的图片名    '''''

            count++;

            console.log(imgurl);

            console.log(imgnam);

            console.log('已爬取图片' + count + '张');

        });

    }

}
