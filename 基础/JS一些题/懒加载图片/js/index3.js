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
                // Chrome 76
                // 窗口高度 网速 滚动 窗口大小改变 ...
                card.innerHTML = `<a href="#">
                    <div class="lazyImageBox" style="height:${height}px">
                        <img src="${pic}" alt="" loading="lazy">
                    </div>
                    <p>${title}</p>
                </a>`;
                columns[index].appendChild(card);
            });
        }
    }

    return {
        async init() {
            let data = await utils.ajax('./data.json');
            bindHTML(data);
        }
    }
})();
imageModule.init();

/* // 下一步要做的事情：我们自己在不兼容的情况下，写一个插件，兼容它（其实就是自己去实现一套处理方法）
if ('loading' in (new Image)) {
    console.log('ok');
} */
// typeof IntersectionObserver==="undefined"
// ...