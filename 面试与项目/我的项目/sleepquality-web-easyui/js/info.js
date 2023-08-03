const appId = "wxa8fa366d958272c0";
let birthday = "";
let openId = localStorage.getItem('openId');
let userInfo = JSON.parse(localStorage.getItem('userInfo'));
let wechatNickname = userInfo?.nickname;
let wechatCountry = userInfo?.country;
let wechatProvince = userInfo?.province;
let wechatCity = userInfo?.city;

if (userInfo) {
  console.log(userInfo.wechatBirthday,'userInfo.wechatBirthday')
  // $('#kinerDatePickerInput3').kinerDatePickerVal(userInfo.wechatBirthday);
  $("#birthdayBtn").html(userInfo.wechatBirthday)
  console.log(userInfo.wechatBirthday)
  if (userInfo.wechatSex == "1") {
    $(":radio[name='type'][value='" + 1 + "']").prop("checked", "checked");
  } else {
    $(":radio[name='type'][value='" + 2 + "']").prop("checked", "checked");
  }
}

// 出生日期
$("#birthdayBtn").kinerDatePicker({
  clickMaskHide: true,
  showHandler: function (ctx) {
    // console.log("显示时间选择器:", ctx);
  },
  hideHandler: function (ctx) {
    // console.log("隐藏时间选择器:", ctx);
  },
  changeHandler: function (vals, ctx) {
    // console.log("时间改变:", vals, ctx);
  },
  okHandler: function (vals, ctx) {
    // console.log("确定选择:", vals, ctx);
    birthday = vals.join("-");
  },
  cancelHandler: function (ctx) {
    // console.log("取消选择:", ctx);
  },
});


//提交个人信息
function submitPersonInfo() {
  var wechatSex = $('input:radio[name="type"]:checked').val();
  if (!birthday) {
    $(".selectTip").html("请选择出生日期");
    $(".selectTip").css("display", "block");
    $(".selectTip").delay(1000).hide(0);
    return;
  }
  var req = {
    wechatAppid: appId,
    wechatOpenid: openId,
    wechatPhone: "", //手机号
    wechatEducation: "", //学历
    wechatNickname: wechatNickname, //昵称
    wechatSex: wechatSex, //性别
    wechatBirthday: birthday, //生日
    wechatCountry: wechatCountry, //国家地区
    wechatProvince: wechatProvince, //省
    wechatCity: wechatCity, //市
    wechatIp: returnCitySN["cip"]
  };
  $.ajax({
    url: "https://testapp.zlkcxdnf.cn/zlkcxd-app-web/app/proxy/http/channel/wechat_user_update",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    data: req,
    success: function (data) {
      //   console.log(data, "成功去首页");
      // 去补录 需要带openId过去
      if (data.code === 200) {
        $(".messageTip").css("display", "block");
        $(".messageTip").delay(1000).hide(0);
        userQuery(openId)
        setTimeout(() => {
          window.location.href = "./index.html";
        }, 1000);
      } else {
        alert(data.message);
      }
    },
    error: function (result) {
      alert(result.message);
    },
  });
}


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
        window.localStorage.setItem("userInfo", JSON.stringify(data.data));
    },
    error: function (result) {
      alert(result.message);
    },
  });
}