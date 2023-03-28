let imageModule = (function () {
    let columns = Array.from(document.querySelectorAll('.column'));

    // 数据绑定
    function bindHTML(data) {
        // 根据服务器返回的图片的宽高，动态计算出图片放在230容器中，高度应该怎么缩放
        // 因为我们后期要做图片的延迟加载，在没有图片之前，我们也需要知道未来图片要渲染的高度，这样才能又一个容器先占位
        data = data.map(item => {
            let {
                width,
                height
            } = item;
            item.height = height / (width / 230);
            item.width = 230;
            return item;
        });

        // 每三个为一组获取数据
        for (let i = 0; i < data.length; i += 3) {
            let group = data.slice(i, i + 3);

            // 实现每一列的降序
            columns.sort((a, b) => {
                return b.offsetHeight - a.offsetHeight;
            });

            // 把一组的数据进行升序
            group.sort((a, b) => {
                return a.height - b.height;
            });

            // 分别把最小数据插入到最大的列中
            group.forEach((item, index) => {
                let {
                    height,
                    title,
                    pic
                } = item;
                let card = document.createElement('div');
                card.className = "card";
                card.innerHTML = `<a href="#">
                    <div class="lazyImageBox" style="height:${height}px">
                        <img src="" alt="" data-image="${pic}">
                    </div>
                    <p>${title}</p>
                </a>`;
                columns[index].appendChild(card);
            });
        }
    }

    // 实现图片的延迟加载
    let lazyImageBoxs;
    let winH = document.documentElement.clientHeight;

    function lazyFunc() {
        console.log('OK');
        !lazyImageBoxs ? lazyImageBoxs = Array.from(document.querySelectorAll('.lazyImageBox')) : null;

        lazyImageBoxs.forEach(lazyImageBox => {
            // 已经处理过则不在处理
            let isLoad = lazyImageBox.getAttribute('isLoad');
            if (isLoad) return;

            /* // 加载条件：盒子底边距离BODY距离 < 浏览器底边距离BODY的距离
            let B = utils.offset(lazyImageBox).top + lazyImageBox.offsetHeight,
                A = winH + document.documentElement.scrollTop;
            if (B <= A) {
                lazyImg(lazyImageBox);
            } */

            let {
                bottom
            } = lazyImageBox.getBoundingClientRect();
            if (bottom <= winH) {
                lazyImg(lazyImageBox);
            }
        });
    }

    function lazyImg(lazyImageBox) {
        let img = lazyImageBox.querySelector('img'),
            trueImg = img.getAttribute('data-image');
        img.src = trueImg;
        img.onload = function () {
            // 图片加载成功
            utils.css(img, 'opacity', 1);
        };
        img.removeAttribute('data-image');
        // 记录当前图片已经处理过了
        lazyImageBox.setAttribute('isLoad', 'true');
    }

    return {
        async init() {
            let data = await utils.ajax('./data.json');
            bindHTML(data);
            setTimeout(lazyFunc, 500);
            // onscroll触发的频率太高了，滚动一下可能要被触发很多次，导致很多没必要的计算和处理，消耗性能=>我们需要降低onscroll的时候的触发频率 （节流）
            window.onscroll = utils.throttle(lazyFunc, 500);
        }
    }
})();
imageModule.init();


/* 
 * 为啥要做图片的延迟加载
 *   浏览器渲染页面
 *      1.构建DOM树
 *      2.构建CSSOM树
 *      3.生成RENDER TREE
 *      4.布局
 *      5.分层
 *      6.珊格化
 *      7.绘制
 * 构建DOM树中如果遇到img
 *   老版本：阻碍DOM渲染
 *   新版本：不会阻碍  每一个图片请求都会占用一个HTTP（浏览器同时发送的HTTP 6个）
 *          拿回来资源后会和RENDER TREE一起渲染
 *   .....
 *   开始加载图片，一定会让页面第一次渲染速度变慢（白屏）
 * 
 * 图片延迟加载：第一次不请求也不渲染图片，等页面加载完，其他资源都渲染好了，再去请求加载图片
 */