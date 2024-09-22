/**
 * 页面路径
 * index: 社团首页 dashboard
 * member: 成员管理
 * audit: hr | 审核系统
 */
export const PageKey = {
  index: 'index',
  member: 'member',
  audit: 'audit',
}

const PageName =  {
  [PageKey.index]: '首页',
  [PageKey.member]: '成员管理',
  [PageKey.audit]: '审核系统',

}



export const Page = {
  [PageKey.index]: {
    Name: PageName[PageKey.index],
  },
  [PageKey.member]: {
    Name: PageName[PageKey.member],
  },
  [PageKey.audit]: {
    Name: PageName[PageKey.audit],
  },
}

export type PageKeyType = keyof typeof PageKey