

// 单例模式写一个图片模块
let imgModal = (function () {
  // 获取每一列的数组
  let columns = [...document.querySelectorAll('.column')]
  // console.log(columns, 'columns')
  // 渲染数据到页面
  function bindHTML(data) {
    // 处理数据中宽高，固定宽为230;高为按比值缩放
    data = data.map(item => {
      let { width, height } = item;
      item.height = height / (width / 230)
      item.width = 230;
      return item
    })
    // 分组获取数据
    for (let i = 0; i < data.length; i += 3) {
      // 三个一组
      let group = data.slice(i, i + 3);
      // 对每一列进行排序，
      columns.sort((a, b) => {
        return b.offsetHeight - a.offsetHeight;
      })
      // 把每一组的数据进行升序
      group.sort((a, b) => {
        return a.height - b.height;
      })

      // 分别把最小数据插入到最大的列中
      group.forEach((item, index) => {
        let {
          height,
          title,
          pic
        } = item;
        let card = document.createElement('div')
        card.className = "card"
        card.innerHTML = `<a href='#'>
                 <div
                   class="lazyImageBox"
                   style="height:${height}px"
                 >
                    <img src="" alt="" data-image="${pic}"/>
                 </div>
                 <p>${title}</p>
             </a> 
        `
        // console.log(card, 'card')
        columns[index].appendChild(card)
      });
    }
  }
  // 实现图片延迟加载的方法
  function lazyFunc() {
    let lazyImageBoxs;
    !lazyImageBoxs ? lazyImageBoxs = Array.from(document.querySelectorAll('.lazyImageBox')) : null;
    let winH = document.documentElement.clientHeight;
    // console.log(winH, 'winH')
    lazyImageBoxs.forEach(lazyImageBox => {
      let isLoad = lazyImageBox.getAttribute('isLoad')
      if (isLoad) return
      // 加载条件 盒子底边编辑举例Body举例 < 浏览器底边激励Body的距离
      let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight,
        A = winH + document.documentElement.scrollTop;
      console.log(B, A)
      if (B <= A) {
        lazyImg(lazyImageBox);
      }
    })
  }

  // 单个图片的处理
  function lazyImg(ereryImg) {
    let img = ereryImg.querySelector('img'),
      trueImg = img.getAttribute('data-image');
    img.src = trueImg
    img.onload = function () {
      // 图片加载成功
      utils.css(img, 'opacity', 1);
    }
    img.removeAttribute('data-image');
    // 记录当前图片已经处理过了
    ereryImg.setAttribute('isLoad', 'true');
  }

  return {
    async init() {
      let data = await utils.ajax('./data.json')
      console.log(data, 'data')
      // 绑定数据到html
      bindHTML(data)
      lazyFunc()
      window.onscroll = utils.throttle(lazyFunc, 500);

    }
  }
})()


imgModal.init()