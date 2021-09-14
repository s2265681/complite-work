// 测试号
// const appId = "wx2c59a124be4d21f0";
// const secret = "56a876f891e62306b8fdaca87b7b7aac";
// 企业号
const appId = "wxa8fa366d958272c0";
const secret = "2fa77e3681871b5f485d03b0a5be0f0c";
const redirect_uri =
  "https%3A%2F%2Ftestapp.zlkcxdnf.cn%2Fwl%2Fhtml%2Findex.html";
let openId = '';
let userInfoData = '';
// 关于测试弹出框
let wrapper = document.querySelector(".wrapper");

const supplement = document.querySelector(".supplement");
// let box = document.querySelector("#testTab");
function openModal() {
  wrapper.style.visibility = "visible";
}
wrapper.addEventListener(
  "click",
  function (e) {
    if (e.target.className == "wrapper") {
      wrapper.style.visibility = "hidden";
    }
  },
  true
);

// 打开微信获取openid的code
function getWxUserCode() {
  const url =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    appId +
    "&redirect_uri=" +
    redirect_uri +
    "&response_type=code&scope=snsapi_login,snsapi_userinfo&state=1,0#wechat_redirect";
  window.location.href = url;
}

// 获取code
function getCode() {
  let url = window.location.href;
  let obj = {};
  url.replace(/([^#?&#]+)=([^&#?#]+)/g, (...[, b, c]) => {
    obj[b] = c;
  });
  return obj["code"] || "";
}

window.onload = function () {
  let code = getCode();
  if (getCode()) {
    //请求openid
    // let url =
    //   "https://testapp.zlkcxdnf.cn/zlkcxd-app-web/app/redirect/queryOpenId?wechatAppid=" +
    //   appId +
    //   "&code=" +
    //   code;
    // $.get(url, function (result) {
    //   console.log(result, 'result...')
    //   if (result && result.openid) {
    //     userQuery(result.openid);
    //     openId = result.openid
    //     console.log(openId,"openId");
    //   } else {
    //     throw Error("openId 无效");
    //   }
    // });
    //请求微信用户信息
    let userurl =
      "https://testapp.zlkcxdnf.cn/zlkcxd-app-web/app/redirect/queryUserInfo?wechatAppid=" +
      appId +
      "&code=" +
      code;
    $.get(userurl, function (info) {
      if (info) {
        userQuery(info.openid);
        userInfoData = info;
        openId = info.openid;
        console.log(openId,"openId");
        console.log(userInfoData,"用户信息");
      } else {
        throw Error("暂无用户信息");
      }
    });
  }
};

// 测试弹出框
function userQuery(openId) {
  if (!openId) throw Error("openId 不能为空");
  var userData = {
    wechatOpenid: openId,
    wechatAppid: "wxa8fa366d958272c0",
  };
  $.ajax({
    url: "https://testapp.zlkcxdnf.cn/zlkcxd-app-web/app/proxy/http/channel/wechat_user_query",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    data: userData,
    success: function (data) {
      if (!data.data) {
        //没有用户信息数据
        var testingTabwrapper = document.querySelector(".testingTabwrapper");
        $(".cancel").click(function () {
          testingTabwrapper.style.visibility = "hidden";
        });
        testingTabwrapper.style.visibility = "visible";
      } else {
        //有用户信息数据跳转到测试题页面
        window.location.href = "./test.html";
        window.localStorage.setItem("userInfo", JSON.stringify(data.data));
        window.localStorage.setItem("openId", openId);
        window.localStorage.setItem("userInfoData", JSON.stringify(userInfoData));//用户信息
      }
    },
    error: function (result) {
      alert(result.message);
    },
  });
}

// 去补录 需要带openId过去
supplement.addEventListener('click', function () {
  window.location.href = "./info.html?userInfoData=" + JSON.stringify(userInfoData);
})