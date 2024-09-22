import { Button, Card, DatePicker, Space } from 'antd'
import { settingStore } from '@/store/setting'

export default function Index() {
  const { isDark, toggleDark } = settingStore()

  return (
    <div className="h-full">
      <Space direction="vertical">
        <Card>
          <Space>
            <Button type="primary">{`isDark:${isDark}`}</Button>
            <Button type="primary" onClick={toggleDark}>toggle</Button>
          </Space>
        </Card>
        <Card>
          <Space>
            <DatePicker />
          </Space>
        </Card>
      </Space>
    </div>
  )
}
