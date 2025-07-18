import { useAtom } from 'jotai'
import { userAtom, themeAtom, languageAtom } from '../stores'
import { getTranslation } from '../i18n'

export const Header = () => {
  const [user, setUser] = useAtom(userAtom)
  const [theme, setTheme] = useAtom(themeAtom)
  const [language, setLanguage] = useAtom(languageAtom)

  const handleModeChange = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }))
  }

  const handleLanguageChange = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh')
  }

  const handleLogout = () => {
    setUser({ isLogin: false })
  }

  const modeImg = theme.mode === 'light' 
    ? 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJWMk0xMiAyMlYyMk0yIDEySDJNMTIgMkMxMy4xMDQ2IDIgMTQuMjA5MSAyLjQwNzcyIDE1LjExMDkgMy4xNzE1N0MxNi4wMTI3IDMuOTM1NDIgMTYuNjU5IDQuOTk5OTkgMTYuOTI5IDYuMjE3OTlDMTcuMTk5IDcuNDM1OTkgMTcuMDY5IDguNzI5OTkgMTYuNTU5IDkuODU5OTlDMTYuMDQ5IDEwLjk4OTkgMTUuMTc5IDExLjg1OTkgMTQuMDQ5IDEyLjM2OTlDMTIuOTE5IDEyLjg3OTkgMTEuNjI1IDEyLjk5OTkgMTAuNDA3IDEyLjcyOTlDOS4xODg5OSAxMi40NTk5IDguMTI0OTkgMTEuODE5OSA3LjM2MDk5IDEwLjkwOTlDNi41OTY5OSA5Ljk5OTkgNi4xOTk5OSA4Ljg5NDk5IDYuMTk5OTkgNy43ODk5OUg2LjE5OTk5QzYuMTk5OTkgNi42ODQ5OSA2LjU5Njk5IDUuNTc5OTkgNy4zNjA5OSA0LjY2OTk5QzguMTI0OTkgMy43NTk5OSA5LjE4ODk5IDMuMTE5OTkgMTAuNDA3IDIuODQ5OTlDMTEuNjI1IDIuNTc5OTkgMTIuOTE5IDIuNjk5OTkgMTQuMDQ5IDMuMjA5OTlDMTUuMTc5IDMuNzE5OTkgMTYuMDQ5IDQuNTg5OTkgMTYuNTU5IDUuNzE5OTlDMTcuMDY5IDYuODQ5OTkgMTcuMTk5IDguMTQzOTkgMTYuOTI5IDkuMzYxOTlDMTYuNjU5IDEwLjU3OTkgMTYuMDEyNyAxMS42NDM5IDE1LjExMDkgMTIuNDA3OEMxNC4yMDkxIDEzLjE3MTYgMTMuMTA0NiAxMy41Nzk0IDEyIDEzLjU3OTRaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+' 
    : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJWMk0xMiAyMlYyMk0yIDEySDJNMTIgMkMxMy4xMDQ2IDIgMTQuMjA5MSAyLjQwNzcyIDE1LjExMDkgMy4xNzE1N0MxNi4wMTI3IDMuOTM1NDIgMTYuNjU5IDQuOTk5OTkgMTYuOTI5IDYuMjE3OTlDMTcuMTk5IDcuNDM1OTkgMTcuMDY5IDguNzI5OTkgMTYuNTU5IDkuODU5OTlDMTYuMDQ5IDEwLjk4OTkgMTUuMTc5IDExLjg1OTkgMTQuMDQ5IDEyLjM2OTlDMTIuOTE5IDEyLjg3OTkgMTEuNjI1IDEyLjk5OTkgMTAuNDA3IDEyLjcyOTlDOS4xODg5OSAxMi40NTk5IDguMTI0OTkgMTEuODE5OSA3LjM2MDk5IDEwLjkwOTlDNi41OTY5OSA5Ljk5OTkgNi4xOTk5OSA4Ljg5NDk5IDYuMTk5OTkgNy43ODk5OUg2LjE5OTk5QzYuMTk5OTkgNi42ODQ5OSA2LjU5Njk5IDUuNTc5OTkgNy4zNjA5OSA0LjY2OTk5QzguMTI0OTkgMy43NTk5OSA5LjE4ODk5IDMuMTE5OTkgMTAuNDA3IDIuODQ5OTlDMTEuNjI1IDIuNTc5OTkgMTIuOTE5IDIuNjk5OTkgMTQuMDQ5IDMuMjA5OTlDMTUuMTc5IDMuNzE5OTkgMTYuMDQ5IDQuNTg5OTkgMTYuNTU5IDUuNzE5OTlDMTYuMDY5IDYuODQ5OTkgMTYuMTk5IDguMTQzOTkgMTUuOTI5IDkuMzYxOTlDMTUuNjU5IDEwLjU3OTkgMTUuMDEyNyAxMS42NDM5IDE0LjExMDkgMTIuNDA3OEMxMy4yMDkxIDEzLjE3MTYgMTIuMTA0NiAxMy41Nzk0IDExIDEzLjU3OTRaIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+'

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 左侧Logo */}
          <div className="flex items-center">
            <img 
              src="/image/rock.jpeg" 
              alt="Logo" 
              className="h-2 w-10 rounded-full"
            />
          </div>

          {/* 右侧控制面板 */}
          <div className="flex items-center space-x-4">
            {/* 弹幕输入 */}
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder={getTranslation(language, 'danmakuPlaceholder')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
                {getTranslation(language, 'sendDanmaku')}
              </button>
            </div>

            {/* 标题 */}
            <div className="flex items-center space-x-2">
              <img src="/image/icon.png" alt="User" className="h-8 w-8 rounded-full" />
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {getTranslation(language, 'welcome')}
              </span>
            </div>

            {/* 模式切换 */}
            <button
              onClick={handleModeChange}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={getTranslation(language, 'mode')}
            >
              <img src={modeImg} alt="Mode" className="h-6 w-6" />
            </button>

            {/* 登录按钮 */}
            {!user.isLogin ? (
              <>
                <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  {getTranslation(language, 'login')}
                </button>
                <button className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
                  {getTranslation(language, 'register')}
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {getTranslation(language, 'logout')}
              </button>
            )}

            {/* 语言切换 */}
            <button
              onClick={handleLanguageChange}
              className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
            >
              {language === 'zh' ? 'EN' : '中文'}
            </button>

            {/* 颜色选择器 */}
            <input
              type="color"
              value={theme.primaryColor}
              onChange={(e) => setTheme(prev => ({ ...prev, primaryColor: e.target.value }))}
              className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  )
} 