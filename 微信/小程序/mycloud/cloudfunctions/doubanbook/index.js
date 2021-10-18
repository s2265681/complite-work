// 云函数入口文件
const cloud = require("wx-server-sdk")
const axios = require("axios")
const doubanbook = require('doubanbook')
const cheerio = require('cheerio')

// cnpm i doubanbook --save
cloud.init()

async function searchDouban(isbn){
  const url = "https://book.douban.com/subject_search?search_text="+isbn
  let searchInfo = await axios.get(url)
  let reg = /window\.__DATA__ = "(.*)"/
  if(reg.test(searchInfo.data)){
    // 数据解密
    let searchData = doubanbook(RegExp.$1)[0]
    return searchData
  }
}

async function getDouban(isbn){
  // 第一个爬虫  根据isbn 查询豆瓣url
  const detailInfo = await searchDouban(isbn)
  // https://book.douban.com/subject/2567698/
  const detailPage = await axios.get(detailInfo.url)
  // console.log(detailPage,'detailPage')
  // 下面写第二个爬虫 cheerio 在node里使用jquery的愈发，解析文档
  const $ = cheerio.load(detailPage.data)
  const info = $('#info').text().split('\n').map(v=>v.trim()).filter(v=>v)
  let author = info[1]
  let tags =[]
  $('#db-tags-section a.tag').each((i,v)=>{
    tags.push({
      title:$(v).text()
    })
  })
  const ret = {
    create_time : new Date().getTime(),
    title:detailInfo.title,
    rate:detailInfo.rating.value,
    image:detailInfo.cover_url,
    url:detailInfo.url,
    tags,
    author,
    summary:$('#link-report .intro').text()
  }
  console.log(ret,'ret')
  return ret
}


// console.log(getDouban("9787536692930"))

// 所谓云函数  就是一个node的项目（函数）
exports.main = async (event,context)=>{
  console.log('云函数进来',event)
     // 云函数的逻辑
     const {isbn} = event
     if(isbn){
       return getDouban(isbn)
     }else{
       return {
         code:-1,
         msg:'请扫描正确的图书'
       }
     }
}