import {
  HTTP
} from '../utils/http.js'
class LikeModel extends HTTP {
  constructor() {
    super()
  }
  like(like_or_cancel, art_id, type) {
    // console.log(like_or_cancel, art_id, type)
    let url = like_or_cancel === 'cancle' ? 'like/cancel' : 'like'
    this.request({
      url: url,
      method: 'POST',
      data: {
        art_id: art_id,
        type: type
      },
      success: (data) => {
        console.log(data)
      }
    })
  }

  getClassicLikeStatus(artID,category,sCallback){
    this.request({
      url: 'classic/' + category + '/' + artID+'/favor',
      // success: (data)=>{
      //   sCallback(data)
      // }
      success: sCallback
    })
  }


}

export {
  LikeModel
}