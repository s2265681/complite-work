import { useState, useEffect } from 'react'

export const WelcomeBanner = () => {
  const [currentText, setCurrentText] = useState(0)
  const welcomeTexts = ['你好！', '你来啦～', '欢迎欢迎！']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => (prev + 1) % welcomeTexts.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [welcomeTexts.length])

  return (
    <div className="relative w-full h-32 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 overflow-hidden">
      {/* 背景动画 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* 文字内容 */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center">
          <h1 className="bg-[#f0f] text-[40px] text-[#f00] text-4xl md:text-6xl font-bold text-white mb-4 animate-bounce">
            {welcomeTexts[currentText]}
          </h1>
          <p className="text-xl text-white/90 font-light">
            微风不噪 - 个人主页
          </p>
        </div>
      </div>

      {/* 装饰元素 */}
      <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full animate-spin"></div>
      <div className="absolute top-8 right-8 w-12 h-12 border-2 border-white/30 rounded-full animate-ping"></div>
      <div className="absolute bottom-4 left-1/4 w-8 h-8 border-2 border-white/30 rounded-full animate-bounce"></div>
      <div className="absolute bottom-8 right-1/4 w-10 h-10 border-2 border-white/30 rounded-full animate-pulse"></div>
    </div>
  )
} 