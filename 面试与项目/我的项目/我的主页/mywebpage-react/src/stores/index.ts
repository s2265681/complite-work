import { atom } from 'jotai'

// 用户状态
export interface User {
  id?: string
  name?: string
  avatar?: string
  isLogin: boolean
}

export const userAtom = atom<User>({
  isLogin: false
})

// 主题状态
export interface Theme {
  mode: 'light' | 'dark'
  primaryColor: string
}

export const themeAtom = atom<Theme>({
  mode: 'light',
  primaryColor: '#3b82f6'
})

// 语言状态
export type Language = 'zh' | 'en'

export const languageAtom = atom<Language>('zh')

// 弹幕状态
export interface Danmaku {
  id: string
  content: string
  color: string
  timestamp: number
}

export const danmakuListAtom = atom<Danmaku[]>([])

// 3D轮播状态
export interface CarouselItem {
  id: string
  imageUrl: string
  title?: string
}

export const carouselItemsAtom = atom<CarouselItem[]>([
  {
    id: '1',
    imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562043894646&di=7804174a5b070381dcc8bae698e118b7&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fdowns%2Fimages%2F2010%2F9%2F5%2Fsy_20100905190851289019.jpg'
  },
  {
    id: '2',
    imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1562033781&di=475c76854c74c618648a0715d051a288&src=http://img3.redocn.com/tupian/20141105/shengdanjiejinsewujiaoxingsucai_3390853.jpg'
  },
  {
    id: '3',
    imageUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2467331667,1281901889&fm=26&gp=0.jpg'
  },
  {
    id: '4',
    imageUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3620291636,167879879&fm=26&gp=0.jpg'
  },
  {
    id: '5',
    imageUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3167391933,2819253739&fm=26&gp=0.jpg'
  }
])

export const currentCarouselIndexAtom = atom<number>(0) 