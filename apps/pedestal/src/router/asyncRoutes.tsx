import { lazy } from 'react'
import { HomeOutlined, UserAddOutlined, UsergroupDeleteOutlined } from '@ant-design/icons'
import type { IRoute } from '.'
import { Page, PageKey, type PageKeyType } from '@/constants/page'

type ImportMetaGlob = Record<string, () => Promise<{ default: React.ComponentType }>>
const modules = import.meta.glob(['../views/**/*.(t|j)sx', '!../views/basics/**']) as ImportMetaGlob

/**
 * 子应用icon
 */
// eslint-disable-next-line react-refresh/only-export-components
const PageIcon = {
  [PageKey.index]: <HomeOutlined />,
  [PageKey.member]: <UsergroupDeleteOutlined />,
  [PageKey.audit]: <UserAddOutlined />,
}

const asyncRoutes: Array<IRoute> = Object.entries(modules).map(([key, value]) => {
  const path = key
    .replace('../views', '')
    .replace(/\.(j|t)sx$/, '')
    .replace(/\/index$/, '')
  const pathKey = path.split('/').slice(-1)[0]
  return {
    path,
    element: (Component => <Component />)(lazy(value)),
    meta: {
      title: Page[pathKey as PageKeyType].Name,
      icon: PageIcon[pathKey as PageKeyType],
    },
  }
})

const menuList = buildTree(asyncRoutes)

function buildTree(routes: IRoute[]): IRoute[] {
  const root: IRoute[] = []
  routes.forEach((route) => {
    const parts = route.path.split('/').filter(part => part)
    let currentLevel = root

    parts.forEach((_part, index) => {
      const partPath = `/${parts.slice(0, index + 1).join('/')}`
      let existingNode = currentLevel.find(node => node.path === partPath)

      if (!existingNode) {
        existingNode = {
          path: partPath,
          element: null,
          children: [],
          meta: {
            title: route.meta.title,
            icon: route.meta.icon,
          },
        }
        currentLevel.push(existingNode)
      }

      if (index === parts.length - 1) {
        existingNode.element = route.element
        existingNode.meta = { ...route.meta, ...existingNode.meta }
      }

      if (!existingNode.children) {
        existingNode.children = []
      }

      currentLevel = existingNode.children
    })
  })
  const routerList = ['index', 'member', 'audit']
  root.sort((a, b) => {
    return routerList.indexOf(a.path.split('/')[1]) - routerList.indexOf(b.path.split('/')[1])
  })
  return root
}
export { asyncRoutes, menuList }
