<template>
  <button
    :disabled="disabled"
    :class="computedCls"
    :style="computedStyle"
    :type="actionType"
    @click="onClick"
  >
    <span><slot></slot></span>
  </button>
</template>
<script lang="ts">
import Vue from 'vue';
import { BtnStyle } from './interface';
const ACTION_MAP = ['button', 'submit', 'reset'];
const TYPE_MAP = ['primary', 'danger', 'warning', 'hollow', 'disabled'];
const SIZE_MAP = ['mini', 'small', 'large'];
const SHAPE_MAP = ['round', 'circle', 'square'];
export default Vue.extend({
  name: 'TnBtn',
  props: {
    disabled: Boolean,
    actionType: {
      validator(value) {
        return ACTION_MAP.indexOf(value) > -1;
      },
      default: 'button',
    },
    type: {
      validator(value) {
        return TYPE_MAP.indexOf(value) > -1;
      },
      default: 'primary',
    },
    size: {
      validator(value) {
        return SIZE_MAP.indexOf(value) > -1;
      },
      default: 'large',
    },
    shape: {
      validator(value) {
        return SHAPE_MAP.indexOf(value) > -1;
      },
      default: 'round',
    },
    bgColor: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  computed: {
    computedCls(): string[] {
      const ret = [
        'tn-btn',
        `tn-btn--${this.size}`,
        `tn-btn--${this.type}`,
        `tn-btn--${this.shape}`,
      ];
      if (this.disabled) {
        ret.push('tn-btn--disabled');
      }
      return ret;
    },
    computedStyle(): BtnStyle {
      return {
        backgroundColor: this.bgColor,
        color: this.color,
      };
    },
  },
  methods: {
    onClick(e) {
      this.$emit('click', e);
    },
  },
});
</script>
<style lang="stylus">
@import '../../../style/btn.styl'
</style>