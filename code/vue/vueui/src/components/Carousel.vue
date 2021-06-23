<template>
  <div
    class="my-carousel"
    :style="{ height }"
    @mouseover="handleMouseOver"
    @mouseleave="handlaMouserLeave"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div class="viewport">
      <slot></slot>
    </div>
    <div class="dot">
      <ul class="ul">
        <li
          v-for="item in len"
          :key="item"
          :class="{ active: currentSelected === item - 1 }"
        >
          <input
            type="radio"
            name="dol"
            :checked="currentSelected === item - 1"
            @change="select(item - 1)"
            :key="item"
          />
        </li>
      </ul>
    </div>
    <div class="arows_box">
      <div class="arows left" @click="handleLeft">&lt;</div>
      <div class="arows right" @click="handleRight">&gt;</div>
    </div>
  </div>
</template>


<script>
// import myCarouselItem from '../components/Carousel-item.vue'

export default {
  name: "my-carousel", // 轮播图组件
  props: {
    height: {
      type: String,
      default: "201px",
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    delay: {
      type: Number,
      default: 3000,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    loop: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      len: 0,
      currentSelected: this.initialIndex,
      reverse: false,
    };
  },
  methods: {
    run() {
      if (this.autoplay) {
        // 运动
        this.timer = setInterval(() => {
          let newIndex;
          if (!this.reverse) {
            newIndex = this.currentSelected + 1;
            if (newIndex === this.len) newIndex = 0;
          } else {
            newIndex = this.currentSelected - 1;
            if (newIndex === -1) newIndex = this.len - 1;
          }
          this.currentSelected = newIndex;
        }, this.delay);
      }
    },
    select(newIndex, isTurnLeft) {
      // 处理临界
      if (newIndex === this.len) newIndex = 0;
      if (newIndex === -1) newIndex = this.len - 1;
      // 当向左的时候，子组件revers一下即可
      if (isTurnLeft) {
        this.children.forEach((vm) => {
          vm.reverse = !this.reverse;
        });
      }
      // 继续正向
      this.children.forEach((vm) => {
        vm.reverse = this.reverse;
      });
      this.$nextTick(() => {
        this.currentSelected = newIndex;
      });
    },
    handleLeft() {
      this.select(this.currentSelected - 1, true);
    },
    handleRight() {
      this.select(this.currentSelected + 1);
    },
    stopRun() {
      clearInterval(this.timer);
      this.timer = null;
    },
    handleMouseOver() {
      this.stopRun();
    },
    handlaMouserLeave() {
      this.run();
    },
    handleTouchStart(e) {
      this.stopRun();
      this.startX = e.targetTouches[0].screenX;
    },
    handleTouchEnd(e) {
      this.endX = e.changedTouches[0].screenX;
      if (Math.abs(this.startX - this.endX) > 40) {
        this.startX - this.endX < 0
          ? this.select(this.currentSelected - 1, true)
          : this.select(this.currentSelected + 1);
      }
      this.run();
    },
  },
  beforeDestory() {
    this.stopRun();
  },
  mounted() {
    this.children = this.$children.filter(
      (child) => child.$options.name === "my-carousel-item"
    );
    this.len = this.children.length;
    this.run();
  },
};
</script>
<style scoped>
.page .my-carousel {
  height: 100%;
  width: 100%;
  position: relative;
}

.viewport {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.ul {
  list-style-type: none;
}

.ul li {
  float: left;
}
.ul li.active input {
  filter: invert(1);
}

.dot {
  width: 100%;
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.arows_box {
  width: 100%;
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-50%);
}

.arows {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  color: #fff;
  background: eee;
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 10px;
  font-size: 23px;
  font-weight: bold;
}

.arows.left {
  padding: 0 2px 2px 0;
}
.arows.right {
  padding: 0 0 2px 2px;
}
</style>
