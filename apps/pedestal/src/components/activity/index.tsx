import { Avatar, List, Space } from 'antd'
import React from 'react'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import SubTitle from '../SubTitle'

function IconText({ icon, text }: { icon: React.FC, text: string }) {
  return (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  )
}
export default function Activiy() {
  const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }))

  return (
    <div>
      <SubTitle title="活动">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 3,
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={(
                <img
                  width={272}
                  alt="logo"
                  src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                />
              )}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.avatar} />}
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </SubTitle>
    </div>
  )
}
