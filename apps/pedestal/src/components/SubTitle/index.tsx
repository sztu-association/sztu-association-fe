import { DoubleRightOutlined } from '@ant-design/icons'

interface SubTitleProps {
  children: React.ReactNode
  title: string
}

export default function SubTitle(props: SubTitleProps) {
  const { children, title } = props
  return (
    <div>
      <div className="flex flex-row justify-between mb-4">
        <h3>{title}</h3>
        <DoubleRightOutlined />
      </div>
      { children }
    </div>
  )
}
