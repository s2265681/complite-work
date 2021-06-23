<template>
  <form class="m-input   scale-1px-bottom" method="get" action="#">
    <div class="inputcover">
      <i class="u-svg u-svg-srch"></i>
      <input
        type="search"
        name="search"
        class="input"
        :value="value"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        autofocus
        @input="changeInput"
      />
      <figure class="close" v-if="value" @click="handleClose">
        <i class="u-svg u-svg-empty u-svg-close z-show"></i>
      </figure>
    </div>
  </form>
</template>

<script lang="ts">
export default {
  data:function() {
    return {
        value:''
      };
    },
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    autocomplete: {
      type: String,
      default: "off"
    },
  },
  methods:{
    changeInput:function(e){
      this.value = e.target?.value || ''
      this.$emit('onInput',this.value)
    },
    handleClose:function(){
      this.value = ''
      this.$emit('onInput', '')
    }
  }
};
</script>

<style lang="less" scoped>
@import url('../../style/minix.less');
.m-input {
  &:after {
    border-color: rgba(0, 0, 0, 0.1);
  }
  padding: 0.15rem 0.1rem;
  .inputcover {
    position: relative;
    width: 100%;
    height: 0.30rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    background: #ebecec;
    border-radius: 0.3rem;
    .u-svg-srch {
      position: absolute;
      left: 0;
      top: 0.09rem;
      margin: 0 0.08rem;
      vertical-align: middle;
      width: 0.13rem;
      height: 0.13rem;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 0.3rem;
      height: 0.3rem;
      line-height: 0.28rem;
      text-align: center;
      .u-svg-empty {
        display: none;
        vertical-align: middle;
        width: 0.14rem;
        height: 0.14rem;
      }
      .u-svg-close{
        background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyOCAyOCI+PGcgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjYmNiZGJkIiBkPSJNMTQgMGM3LjczMiAwIDE0IDYuMjY4IDE0IDE0cy02LjI2OCAxNC0xNCAxNFMwIDIxLjczMiAwIDE0IDYuMjY4IDAgMTQgMHoiLz48cGF0aCBkPSJNMTkgOUw5IDE5TTkgOWwxMCAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZWJlY2ViIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIi8+PC9nPjwvc3ZnPg==);
      }
      .z-show {
        display: inline-block;
      }
    }
  }
}
</style>
