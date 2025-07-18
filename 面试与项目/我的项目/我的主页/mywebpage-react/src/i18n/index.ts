import type { Language } from '../stores'

export const translations = {
  zh: {
    welcome: '微风不噪',
    login: '登录',
    logout: '退出',
    register: '注册',
    sendDanmaku: '发送弹幕',
    danmakuPlaceholder: '输入弹幕内容',
    mode: '模式',
    language: '语言',
    color: '颜色',
    githubLogin: 'GitHub登录',
    wechatLogin: '微信登录'
  },
  en: {
    welcome: 'Gentle Breeze',
    login: 'Login',
    logout: 'Logout',
    register: 'Register',
    sendDanmaku: 'Send Danmaku',
    danmakuPlaceholder: 'Enter danmaku content',
    mode: 'Mode',
    language: 'Language',
    color: 'Color',
    githubLogin: 'GitHub Login',
    wechatLogin: 'WeChat Login'
  }
}

export const getTranslation = (language: Language, key: keyof typeof translations.zh): string => {
  return translations[language][key] || key
} 