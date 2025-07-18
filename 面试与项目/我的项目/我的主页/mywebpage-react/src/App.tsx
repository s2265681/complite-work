import { Provider, useAtom } from 'jotai'
import { Header } from './components/Header'
import { WelcomeBanner } from './components/WelcomeBanner'
import { Carousel3D } from './components/Carousel3D'
import { Danmaku } from './components/Danmaku'
import { useEffect } from 'react'
import { themeAtom } from './stores'

function App() {
  const [theme] = useAtom(themeAtom)

  // 根据主题切换暗色模式
  useEffect(() => {
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme.mode])

  return (
    <Provider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className='bg-[#233] h-5 w-1 text-[#f00]'>1212</div>
        {/* 弹幕层 */}
        <Danmaku />
        
        {/* 头部 */}
        <Header />
        
        {/* 欢迎横幅 */}
        <WelcomeBanner />
        
        {/* 主要内容 */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 3D轮播 */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              精彩展示
            </h2>
            <Carousel3D />
          </div>

          {/* 其他内容区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 关于我 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                关于我
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                热爱技术，追求创新。专注于前端开发，喜欢探索新技术。
              </p>
            </div>

            {/* 技能展示 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                技能栈
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">React</span>
                  <span className="text-blue-500">90%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">TypeScript</span>
                  <span className="text-blue-500">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Node.js</span>
                  <span className="text-blue-500">80%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>

            {/* 联系方式 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                联系方式
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">example@email.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* 页脚 */}
        <footer className="bg-white dark:bg-gray-800 shadow-lg mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-600 dark:text-gray-300">
              <p>&copy; 2024 微风不噪. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Provider>
  )
}

export default App
