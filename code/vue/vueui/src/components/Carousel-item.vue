<template>
  <transition>
    <div class="my-carousel-item" v-if="isShow" :class="{ reverse }">
      <slot></slot>
    </div>
  </transition>
</template>

<script>

export default {
  name: "my-carousel-item",

  data() {
    let children = this.$parent.$children.filter(
      (child) => child.$options.name === "my-carousel-item"
    );
    return {
      index: children.length - 1,
      reverse: true,
    };
  },
  computed: {
    isShow() {
      return this.index === this.$parent.currentSelected;
    },
  },
  updated() {
    console.log(this.reverse, "sssss");
  },
};
</script>

<style scoped>
.my-carousel-item {
  height: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s linear;
}
.v-enter {
  transform: translateX(-100%);
}

.v-leave-to {
  transform: translateX(100%);
}

.v-enter.reverse {
  transform: translateX(100%);
}

.v-leave-to.reverse {
  transform: translateX(-100%);
}

.my-carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
