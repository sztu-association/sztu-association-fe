import { useEffect, useState } from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import { routerStore } from '@/store/router'

export default function AppMenu() {
  const { menuList } = routerStore()
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const openKeys = location.pathname.split('/').reduce((pre, cur) => {
      if (cur && !cur.includes('?')) {
        cur = `${pre.slice(-1) || ''}${cur.startsWith('/') ? cur : `/${cur}`}`
        return [...pre, cur]
      }
      else {
        return pre
      }
    }, [] as string[])
    setOpenKeys(openKeys)
    setActiveKeys([location.pathname])
  }, [location.pathname])

  const onChangeMenu = ({ key }: { key: string }) => {
    navigate(key)
  }

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find(key => !openKeys.includes(key))
    if (!menuList.map(item => item?.key).includes(latestOpenKey as string))
      setOpenKeys(keys)
    else
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  return (
    <Menu
      className='h-[35px] mt-[25px]'
      theme="light"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      selectedKeys={activeKeys}
      onClick={e => onChangeMenu(e)}
      items={menuList}
      mode="horizontal"
    />
  )
}
