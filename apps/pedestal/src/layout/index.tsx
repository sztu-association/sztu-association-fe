import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { Layout, Spin, theme } from 'antd'
import { routerStore } from '@/store/router'

import AppHeader from '@/layout/AppHeader'
import AppMain from '@/layout/AppMain'
import AppMenu from '@/layout/AppMenu'

const { Header, Content } = Layout

const defaultContext = {
  refresh: () => ({}),
}
export const AppLayoutContext = createContext<{
  refresh: () => void
}>(defaultContext)

export default function AppLayout() {
  const { token: { colorBgContainer } } = theme.useToken()
  const [refreshing, setRefreshing] = useState(false)
  const { setMenuList } = routerStore()

  const refresh = useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    })
  }, [])

  useEffect(() => {
    setMenuList()
  }, [setMenuList])

  const contextValue = useMemo(() => ({ refresh }), [refresh])

  return (
    <AppLayoutContext.Provider value={contextValue}>
      {
        !refreshing
          ? (
              <Layout className="h-full">
                <Layout>
                  <Header className="h-auto px-0 leading-none" style={{ background: colorBgContainer }}>
                    <AppHeader
                      menu={
                        <AppMenu />
                      }
                    />
                  </Header>
                  <Content className="overflow-y-auto ">
                    <AppMain />
                  </Content>
                </Layout>
              </Layout>
            )
          : (
              <Layout className="h-full flex items-center justify-center overflow-hidden">
                <Spin size="large" />
              </Layout>
            )
      }
    </AppLayoutContext.Provider>
  )
}
