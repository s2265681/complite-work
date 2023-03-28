// Carousel
function Carousel(dataSource = [], tm = 1000) {
  this._timer = null;
  this.dataSource = dataSource;
  this.tm = tm;
  this.len = dataSource.length;
  this.curIdx = 0;
  this.carouselWrapper = {}; // DOM
  this.carouselItem = {};
  this.renderCarousel();
  this.renderCarouselDot();
}

Carousel.prototype.start = function () {
  let _this = this;
  this._timer = setInterval(() => {
    _this.curIdx === _this.len - 1 ? (_this.curIdx = 0) : ++_this.curIdx;
    _this.renderCarousel();
    _this.renderCarouselDot();
  }, this.tm);
};

Carousel.prototype.end = function () {
  clearInterval(this._timer);
  this._timer = null;
};

Carousel.prototype.renderCarousel = function () {
  this.carouselItem = this.dataSource[this.curIdx];
  this.carouselWrapper = document.querySelector(".carousel_wrapper");
  this.carouselWrapper.innerHTML = `
        <img style="width:100%;height:100%;" src= '${
          this.carouselItem && this.carouselItem.src
        }' />
    `;
};

Carousel.prototype.renderCarouselDot = function () {
  const carouselDotElement = document.createElement("div");
  carouselDotElement.className = "carousel_dot_element";
  let dots = "";
  for (let i = 0; i < this.len; i++) {
    dots += `<div class="carousel_dot ${
      this.curIdx === i ? "active_dot" : ""
    }"></div>`;
  }
  carouselDotElement.innerHTML = `<div class="carousel_dot_bar">${dots}</div>`;
  this.carouselWrapper.appendChild(carouselDotElement);
};
