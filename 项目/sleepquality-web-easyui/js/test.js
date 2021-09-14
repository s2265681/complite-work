//测试题
const startAnswerBtn = document.querySelector(".testCoverBt");
const lastAnswerBtn = document.querySelector(".last_answer_btn");
const nextAnswerBtn = document.querySelector(".next_answer_btn");
const answerDone = document.querySelector(".answer_done");
const submitBtn = document.querySelector(".submit_answer_btn");
const answerTitle = document.querySelector(".answer_title");
const answerOptionUl = document.querySelector(".answer_option_ul");
const showAnswerWrapper = document.querySelector(".show_answer_wrapper");
const progressBarDot = document.querySelector(".progress_bar_dot");
const barNum = document.querySelector(".bar_num");
const list = document.querySelector(".answer_option_ul>li");

let currentIndex = 0;
let answerSource = [
  {
    title: "1.描述你当前（或最近 2 周）入睡困难的严重程度",
    option: ["1、无", "2、轻度", "3、中度", "4、重度", "5、极重度"],
  },
  {
    title: "2.描述你当前（或最近 2 周）维持睡眠所产生困难的严重程度",
    option: ["1、无", "2、轻度", "3、中度", "4、重度", "5、极重度"],
  },
  {
    title: "3.描述你当前（或最近 2 周）早醒的严重程度",
    option: ["1、无", "2、轻度", "3、中度", "4、重度", "5、极重度"],
  },
  {
    title: "4.对你当前睡眠模式的满意度",
    option: ["1、很满意", "2、满意", "3、一般不满意", "4、很不满意"],
  },
  {
    title:
      "5.你认为你的睡眠问题在多大程度上干扰了日间功能（比如导致日间疲劳、影响处理工作和日常事务的能力、注意力、记忆力、情绪等）",
    option: ["1、没有干扰", "2、轻微", "3、有些", "4、较多", "5、很多干扰"],
  },
  {
    title: "6.与其他人相比，你的失眠问题对生活质量有多大程度的影响或损害",
    option: ["1、没有干扰", "2、轻微", "3、有些", "4、较多", "5、很多"],
  },
  {
    title: "7.你对自己当前的睡眠问题有多大程度的焦虑和痛苦",
    option: ["1、没有干扰", "2、轻微", "3、有些", "4、较多", "5、很多"],
  },
];

let result = {};
let isDone = false;
let questionId = 0
// 开始答题
startAnswerBtn.addEventListener("click", function () {
  if (!timer) startCountTimer();
  // startAnswerBtn.style.display = "none";
  // showAnswerWrapper.style.display = "block";
  initAnswer();
  celcProgressBarDot();
});

//上一题
lastAnswerBtn.addEventListener("click", function () {
  if (currentIndex == 0) {
    lastAnswerBtn.style.display = "none";
  }
  if (currentIndex == answerSource.length - 1) {
    nextAnswerBtn.style.display = "none";
    submitBtn.style.display = "block";
    lastAnswerBtn.style.display = "block";
  } else {
    nextAnswerBtn.style.display = "block";
    submitBtn.style.display = "none";
    lastAnswerBtn.style.display = "block";
  }
  initAnswer(--currentIndex);
});
// 下一题
nextAnswerBtn.addEventListener("click", function () {
  if (!(currentIndex in result)) {
    $(".nextAnswerTab").css("display", "block");
    $(".nextAnswerTab").delay(1000).hide(0);
    return;
  }
  if (currentIndex == 0) {
    lastAnswerBtn.style.display = "block";
  }
  if (currentIndex == answerSource.length - 1) {
    nextAnswerBtn.style.display = "none";
    submitBtn.style.display = "block";
    lastAnswerBtn.style.display = "block";
  } else {
    nextAnswerBtn.style.display = "block";
    submitBtn.style.display = "none";
  }
  if (answerSource.length - 1 <= currentIndex) {
    // answerTitle.innerHTML = "7.我能欣赏一本好书或意向好的广播或电视节目";
    progressBarDot.style.width = 100 + "%";
    progressBarDot.innerHTML = 100 + "%";
    barNum.innerHTML = 7;
    // answerOptionUl.innerHTML = "";
    // nextAnswerBtn.innerHTML = "提交答案";
    // alert(JSON.stringify(result));
    // console.log(result, "result");
    return;
  }
  initAnswer(++currentIndex);
  celcProgressBarDot();
});

// 初始化题目
function initAnswer(currentIndex = 0) {
  let currentAnswerItem = answerSource[currentIndex];
  // console.log(currentAnswerItem, "currentAnswerItem..");
  answerTitle.innerHTML = currentAnswerItem.title || "";
  let options = "";
  currentAnswerItem.option.map((item, index) => {
    options += `<li onclick='chooseAnwser(${currentIndex},${index})' class="${result[currentIndex] === index ? "active_li" : ""
      }">${item}</li>`;
  });
  answerOptionUl.innerHTML = options;
}

// 计算进度条
function celcProgressBarDot() {
  let present = ((currentIndex / answerSource.length) * 100).toFixed(2);
  if (isDone) return;
  progressBarDot.style.width = present + "%";
  progressBarDot.innerHTML = present + "%";
  barNum.innerHTML = currentIndex;
  if (present === "100.00") {
    isDone = true;
  }
}

// 每个选择的题目
function chooseAnwser(currentIndex, index) {
  result[currentIndex] = index;
  //   alert(
  //     `您第${currentIndex + 1}题，选择了第${index + 1}个， 题目是${
  //       answerSource[currentIndex]["option"][index]
  //     }`
  //   );
  setTimeout(() => {
    if (currentIndex in result) {
      nextAnswerBtn.click();
    }
  }, 300);
}

// json 转url参数
var parseParam = function (param, key) {
  var paramStr = "";
  if (
    param instanceof String ||
    param instanceof Number ||
    param instanceof Boolean
  ) {
    paramStr += "&" + key + "=" + encodeURIComponent(param);
  } else {
    $.each(param, function (i) {
      var k =
        key == null
          ? i
          : key + (param instanceof Array ? "[" + i + "]" : "." + i);
      paramStr += "&" + parseParam(this, k);
    });
  }
  return paramStr.substr(1);
};

// 提交答案， 成功后跳转
submitBtn.addEventListener("click", function () {
  // let wechatUserAnswerDetailList = [{
  //   examOptionId:1,
  //   examQuestionId:1
  // }];
  let wechatUserAnswerDetailList = [];
  Object.values(result).map((value, index) => {
    wechatUserAnswerDetailList.push({
      examOptionId: value + 1,
      examQuestionId: index + 1
    })
  })
  //获取openid
  let openId = localStorage.getItem('openId');
  var submitData = {
    wechatAppid: "wxa8fa366d958272c0",
    examTemplateId: 1,
    wechatOpenid: openId,
    wechatUserAnswerDetailList
  };
  console.log(parseParam(submitData), "parseParam(submitData)...");
  $.ajax({
    url: "https://testapp.zlkcxdnf.cn/zlkcxd-app-web/app/proxy/http/channel/wechat_user_answer_create",
    method: "POST",
    contentType: "application/x-www-form-urlencoded",
    data: parseParam(submitData),
    success: function (data) {
      questionId = data.data || 0
      // window.localStorage.setItem("questionId1", JSON.stringify(data.data));
      $(".answerSubmitwrapper").css("display", "block");
    },
    error: function (result) {
      alert(result.message);
    },
  });
});

// 跳转页面弹框
function submitAnswer() {
  $(".answerSubmitwrapper").css("display", "none");
  setTimeout(() => {
    window.location.href = "./detailreport.html?id="+questionId;
  }, 1000);
}

// 答题弹出框
let testWrapper = document.querySelector(".testWrapper");
function openTestModal() {
  testWrapper.style.visibility = "visible";
}
testWrapper.addEventListener(
  "click",
  function (e) {
    if (e.target.className == "testWrapper") {
      testWrapper.style.visibility = "hidden";
    }
  },
  true
);
$(".testCoverBt").click(function () {
  testWrapper.style.visibility = "hidden";
});
//返回弹出框
$(".testBack").click(function () {
  $(".backWrapper").css("display", "block");
});
$(".backtip-continue").click(function () {
  $(".backWrapper").css("display", "none");
});

//字体缩放共9个字段
var answerFont = $(".show_answer_wrapper");
answerFontSize = parseFloat(answerFont.css("fontSize"));
// 放大18
$(".fontBt-expand").click(function () {
  answerFontSize = answerFontSize + 1;
  if (answerFontSize <= 18) {
    answerFont.css("fontSize", answerFontSize + "px");
    $(".fontTab").css("display", "block");
    $(".fontTab").delay(1000).hide(0);
  }
  if (answerFontSize >= 19) {
    $(".fontMaxTab").css("display", "block");
    $(".fontMaxTab").delay(1000).hide(0);
  }
});
//缩小9
$(".fontBt-narrow").click(function () {
  answerFontSize = answerFontSize - 1;
  if (answerFontSize > 9) {
    answerFont.css("fontSize", answerFontSize + "px");
    $(".fontTab").css("display", "block");
    $(".fontTab").delay(1000).hide(0);
  }
  if (answerFontSize <= 9) {
    $(".fontMinTab").css("display", "block");
    $(".fontMinTab").delay(1000).hide(0);
  }
});

$(".font").click(function () {
  $(".fontBt").css("display", "block");
});
function alertBoxFn(e) {
  $(".fontBt").css("display", "block");
}
function stopBubble(e) {
  var e = e || window.event;
  e.stopPropagation();
}
document.body.addEventListener("click", function () {
  $(".fontBt").css("display", "none");
});

//  轮播
$(document).ready(function () {
  $("#slideshow").cycle({
    fx: "fade",
    speed: "slow",
    timeout: 3000,
    pager: "#slider_nav",
    pagerAnchorBuilder: function (idx, slide) {
      return "#slider_nav li:eq(" + idx + ") a";
    },
  });
});

//  计时
var maxtime = 0; //一个小时，按秒计算，自己调整!
function CountDown() {
  if (maxtime >= 0) {
    minutes = Math.floor(maxtime / 60);
    seconds = Math.floor(maxtime % 60);
    msg = "0时" + minutes + "分" + seconds + "秒";
    document.all["timer"].innerHTML = msg;
    //if (maxtime == 1 * 60)alert("还剩5分钟");
    ++maxtime;
  }
}
timer = setInterval("CountDown()", 1000);
function move() {
  var elem = document.getElementById("myBar");
  var width = 10;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= 100) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + "%";
      elem.innerHTML = width * 1 + "%";
    }
  }
}
