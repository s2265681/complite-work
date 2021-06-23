
let imageModule = (function () {


  // 数据绑定
  function bindHTML(data) {
    // 根据服务器返回的图片宽高，动态计算放在230px宽上，按缩放比例缩放，后期延迟加载
    data = data.map(item => {
      let { width, height } = item;

    })
    // 每三个为一组
    for (let i = 0; i < data.length; i += 3) {
      let group = data.slice(i, i + 3)
      // 把列降序，实现数组的降序
      columns.sort((a, b) => {
        return b.offsetHeight - a.offsetHeight
      })
      // 把数组进行生序
      group.sort((a, b) => {
        return a.height - b.height
      })

      // 分别把最小的数据插入到最大的列中
      group.forEach((item, index) => {
        let {
          height,
          title,
          pic,
        } = item;
        let card = document.createElement('div')
        card.className = "card";
        card.innerHTML = `<a href="#">
               <img class="lazy">
          </a>`
        columns[index].appendChild(card)
      })
    }
  }

  // 实现延迟加载
  let lazyImageBoxs;
  function lazyFunc() {
    !lazyImageBoxs ? lazyImageBoxs = Array.from(document.querySelectorAll('.lazyImageBox')) : null;
    lazyImageBoxs.forEachp((item, index) => {
      // 处理过了就不处理列
      let isLoad = item.getAttribute('isLoad')
      if (isLoad) return
      lazyImg(item)
    })
  }

  // 单独的每一个做延迟加载
  function lazyImg(item) {
    let img = item.querySelector('img'),
      trueImg = img.getAttribute('data-image')
    img.src = trueImg
    img.obload = function () {
      // 图片加载成功后  设置样式
      utils.css(img, 'opacity', 1);
    }
    img.removeAttribute('data-image');
    // 记录当前图片已经处理过了
    item.setAttribute('isLoad', 'true')
  }

  return {
    async init() {
      let data = await util.ajax('./data/json')
      console.log(data);
      bindHTML(data)
      setTimeout(lazyFunc, 500)
    }
  }
})();

imageModule.init();