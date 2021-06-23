import axios from './request';
/**
 * 推荐页 获取推荐 精选歌单
 */
function getPersonalized() {
  return axios.get('/personalized?limit=7');
}
/**
 * 推荐页 获取最新音 
 */
function getNewestList() {
  return axios.get(`/personalized/newsong`);
}
/**
 * 相关歌单推荐
 */
function getPlayList(id){
  return axios.get(`/related/playlist?id=${id}`);
}
/**
 * 相关歌单详情
 */
function getPlayListDetail(id){
  return axios.get(`/playlist/detail?id=${id}`);
}

/**
 * 歌单(网友精选碟)
 * 
 */




/**
 * 热门搜索 weapi/search/hot  /search/hot
 */
function getHotList() {
  return axios.get(`/search/hot`);
}

/**
 * 搜索条件
 */
function searchKeywords(val){
  return axios.get(`/search/suggest/multimatch?keywords=${val}`);
}



/**
 * 播放页 歌曲详情
 */
function getSongDetail(params) {
  return axios.get(`/song/detail?ids=${params}`);
}



/**
 * 播放页 相似歌单
 */
function simiPlaylist(params) {
  return axios.get(`/simi/playlist?id=${params}`);
}


/**
 * 播放页 相似歌曲
 */
function simiSong(params) {
  return axios.get(`/simi/song?id=${params}`);
}

/**
 * 播放页 获取歌曲url
 */
function getSongUrl(params) {
  return axios.get(`/song/url?id=${params}`);
}

/**
 * 播放页 获取歌曲歌词
 */
function getSongLyric(params) {
  return axios.get(`/lyric?id=${params}`);
}

/**
 * 获取专辑的内容
 */
// http://www.huashengshu.top:3000/comment/album?id=32311
function getSongAlbum(params=32311) {
  return axios.get(`/playlist/detail?id=${params}`);
}

/**
 * 歌曲评论 
 */
//http://www.huashengshu.top:3000/comment/music?id=186016&limit=1
function getSongComment(params=186016) {
  return axios.get(`/comment/music?id=${params}`);
}






export default {
  getPersonalized,
  getNewestList,
  getPlayList,
  getPlayListDetail,
  getHotList,
  searchKeywords,
  getSongDetail,
  simiPlaylist,
  simiSong,
  getSongUrl,
  getSongLyric,
  getSongComment,
  getSongAlbum
}

