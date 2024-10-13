import { useEffect, useState } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider, theme } from 'antd'
import { routerList } from '@/router'
import { pubsub } from '@/utils/pubsub'
import { useUser } from '@/hooks'
// import 'dayjs/locale/zh-cn'
import { settingStore } from '@/store/setting'
import microApp from '@micro-zoe/micro-app'
import { useContext } from '@/utils/createContext'
function App() {
  const { isDark } = settingStore()
  const location = useLocation()
  const { user, gotoLogin, navigate,logout } = useUser()
  const element = useRoutes(routerList)
  const { token } = user
  const [load, setLoad] = useState(false)
  pubsub.on('openLogin', () => {
    logout()
    gotoLogin()
  })

  pubsub.on('logout', () => {
    logout()
  })

  useEffect(() => {
    const createContext = useContext(user)
    microApp.setGlobalData({createContext, pubsub})
  }, [user])
  useEffect(() => {
    setLoad(false)
    if (token) {
      if (location.pathname === '/')
        navigate('/index', { replace: true })
      else if (location.pathname === '/login')
        navigate('/', { replace: true })
    }
    else {
      gotoLogin()
    }
    setLoad(true)
  }, [location.pathname, navigate, token])

  useEffect(() => {
    const html = document.querySelector('html')
    html?.classList.add(isDark ? 'dark' : 'light')
    html?.classList.remove(isDark ? 'light' : 'dark')
  }, [isDark])

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        cssVar: true,
        token: {
          fontSize: 14,
        },
      }}
      prefixCls="sztu-association-pedestal"
    >
      {load && element}
    </ConfigProvider>
  )
}

export default App
