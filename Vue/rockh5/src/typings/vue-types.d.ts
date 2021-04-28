import Vue from 'vue'

interface Loading {
  open: Function,
  close: Function
}

declare module 'vue/types/vue' {
  interface Vue {
    $loading: Loading,
    $toast: Function,
    $dialog: Function,
    $alert: Function,
    $confirm: Function
  }
  interface VueConstructor {
    install: (vue: typeof Vue) => void
  }
}