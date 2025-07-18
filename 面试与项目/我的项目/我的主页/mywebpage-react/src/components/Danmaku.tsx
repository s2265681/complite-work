import { useAtom } from 'jotai'
import { danmakuListAtom } from '../stores'
import { useEffect, useState } from 'react'

export const Danmaku = () => {
  const [danmakuList, setDanmakuList] = useAtom(danmakuListAtom)
  const [danmakuInput, setDanmakuInput] = useState('')

  const addDanmaku = (content: string) => {
    if (!content.trim()) return

    const newDanmaku = {
      id: Date.now().toString(),
      content: content.trim(),
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      timestamp: Date.now()
    }

    setDanmakuList(prev => [...prev, newDanmaku])
    setDanmakuInput('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addDanmaku(danmakuInput)
  }

  // 自动清理旧的弹幕
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setDanmakuList(prev => prev.filter(danmaku => now - danmaku.timestamp < 8000))
    }, 1000)

    return () => clearInterval(interval)
  }, [setDanmakuList])

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {/* 弹幕显示区域 */}
      <div className="relative w-full h-full overflow-hidden">
        {danmakuList.map((danmaku) => (
          <div
            key={danmaku.id}
            className="absolute whitespace-nowrap text-white font-bold text-lg pointer-events-none animate-danmaku"
            style={{
              color: danmaku.color,
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              top: `${Math.random() * 60 + 10}%`,
              left: '100%',
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: '8s'
            }}
          >
            {danmaku.content}
          </div>
        ))}
      </div>

      {/* 弹幕输入框 */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={danmakuInput}
            onChange={(e) => setDanmakuInput(e.target.value)}
            placeholder="发送弹幕..."
            className="px-4 py-2 bg-black bg-opacity-50 text-white rounded-lg border border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            maxLength={50}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            发送
          </button>
        </form>
      </div>
    </div>
  )
} 