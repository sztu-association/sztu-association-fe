import { useContext } from 'react'
import { useFullscreen } from 'ahooks'
import type { MenuProps } from 'antd'
import { Avatar, Dropdown } from 'antd'
import Logo from '@/assets/react.svg'
import { userStore } from '@/store/user'
import { AppLayoutContext } from '@/layout'
import { settingStore } from '@/store/setting'
import { Auth } from '@/api/auth'

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '退出登录',
  },
]
export default function AppHeader({ menu }: { menu: JSX.Element }) {
  const { userInfo } = userStore()
  const { isDark, toggleDark } = settingStore()
  const { refresh } = useContext(AppLayoutContext)
  const [isFullscreen, { toggleFullscreen }] = useFullscreen(document.body)

  function onDropdownClick({ key }: any) {
    if (key === '1') {
      Auth.logout()
    }
  }
  function changeDark() {
    const isAppearanceTransition = !!(document.startViewTransition) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isAppearanceTransition) {
      toggleDark()
      return
    }

    const switchElement = document.querySelector('.dark-switch')!
    const rect = switchElement.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )
    const transition = document.startViewTransition(async () => {
      toggleDark()
    })
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ]
      document.documentElement.animate(
        {
          clipPath: !isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 400,
          easing: 'ease-in',
          pseudoElement: !isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        },
      )
    })
  }
  return (
    <div className="h-[60px] flex items-center justify-between px-[20px]">
      <div className="flex items-center">
        <img
          src={Logo}
          className="h-[32px] w-[32px] animate-spin-slow rounded-full"
          alt="logo"
        />
        <h2 className="text-[20px] font-bold w-[220px] text-left mx-[10px]">
          社团管理系统
        </h2>
      </div>
      <div className="flex-1 mx-auto">
        {menu}
      </div>
      <div className="pr-[15px] flex items-center justify-around w-0 overflow-hidden md:w-auto md:overflow-visible md-px-[25px]">
        <div
          className={`${isFullscreen ? 'icon-[bi--fullscreen-exit]' : 'icon-[bi--arrows-angle-expand]'}  ml-[20px]  cursor-pointer hover:scale-[1.2] transition-all`}
          onClick={toggleFullscreen}
        >
        </div>
        <div
          className={`${isDark ? 'icon-[bi--moon]' : 'icon-[bi--sun]'} dark-switch ml-[20px]  cursor-pointer hover:scale-[1.2] transition-all`}
          onClick={changeDark}
        >
        </div>
        <div
          className="icon-[bi--arrow-repeat] ml-[20px] cursor-pointer text-[16px] transition-all hover:scale-[1.2]"
          onClick={refresh}
        >
        </div>
      </div>
      <div>
        <Dropdown
          menu={{ items, onClick: onDropdownClick }}
          placement="bottom"
        >
          <div className="h-[40px] flex items-center justify-center cursor-pointer rounded-[8px] px-[5px] hover:bg-gray-100">
            <span className="mr-[10px]">{userInfo.username || '-'}</span>
            <a onClick={e => e.preventDefault()}>
              <Avatar size={30} src={userInfo.avatar} />
            </a>
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
