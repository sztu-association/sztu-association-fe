import { useEffect, useState } from 'react'
import { Button, Form, Image, Input, Space, message, theme } from 'antd'
import { useNavigate } from 'react-router-dom'
import { userStore } from '@/store/user'
import { User } from '@/api/user'
import LoginSvg from '@/assets/login-bg.svg'
import { Auth } from '@/api/auth'

export default function Login() {
  const { token: { colorBgContainer } } = theme.useToken()
  const { setUserInfo, setToken } = userStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '', verifyCode: '', captchaId: '' })
  const [loading, setLoading] = useState<boolean>(false)
  const [formRef] = Form.useForm()
  const [captcha, setCaptcha] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(true)
  async function onFinish() {
    try {
      setLoading(true)
      if (!isLogin) {
        const res = await Auth.register(form)
        console.log(res, 'register')
        if (res.code !== 200) {
          message.error(res.data.message)
          return
        }
      }
      const res = await Auth.login(form)
      if (res.code !== 200) {
        message.error(res.data.message)
        return
      }
      setToken(res.data.token)
      const resUser = await User.getUserInfo()

      if (resUser.code !== 200) {
        message.error(resUser.data.message)
        return
      }
      setUserInfo(resUser.data)
      message.success('登录成功')
      navigate('/index', {
        replace: true,
      })
    }
    catch (error: any) {
      console.log(error)
      message.error(error?.message)
    }
    finally {
      setLoading(false)
    }
  }
  const getCaptcha = async () => {
    try {
      const data = await Auth.getCaptcha()
      setCaptcha(data.data.img)
      setForm(prev => ({ ...prev, captchaId: data.data.id }))
    }
    catch (error) {
      console.log(error)
    }
  }
  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo)
  }
  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }
  useEffect(() => {
    getCaptcha()
  }, [])
  return (
    <div
      className="h-full w-full flex items-center justify-center px-[20px]"
      style={{ backgroundImage: 'linear-gradient(94deg, #232d3c, #162b5b, #20469c, #2863e3)' }}
    >
      <div className="h-[554px] w-full flex overflow-hidden rounded-[10px] lg:w-[960px]" style={{ background: colorBgContainer }}>
        <div className="w-0 flex items-center justify-center overflow-hidden lg:flex-1 lg:overflow-visible">
          <img width={382} height={382} src={LoginSvg} />
        </div>
        <div className="flex flex-1" style={{ background: colorBgContainer }}>
          <Form
            form={formRef}
            size="large"
            className="m-auto overflow-hidden rounded-[8px] p-[30px]"
            style={{ background: colorBgContainer }}
            layout="vertical"
            initialValues={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            onValuesChange={(changedValues) => {
              setForm(prev => ({ ...prev, ...changedValues }))
            }}
          >
            <Form.Item>
              <div className="pb-[20px] text-center text-[22px] text-[#5B86E5] font-bold">
                {isLogin ? '登录' : '注册'}
              </div>
            </Form.Item>
            <Form.Item
              label=""
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
              ]}
            >
              <Input
                prefix={(
                  <div className="icon-[bi--person] px-[5px] text-[20px]">
                  </div>
                )}
                maxLength={15}
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              label=""
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
              ]}
            >
              <Input
                type="password"
                prefix={<div className="icon-[bi--bag-dash] px-[5px] text-[20px]"></div>}
                maxLength={15}
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item
              label=""
              name="verifyCode"
              rules={[
                { required: true, message: '请输入验证码' },
              ]}
            >
              <Space.Compact style={{ width: '100%' }}>
                <Input
                  prefix={<div className="icon-[bi--shield-lock] px-[5px] text-[20px]"></div>}
                  maxLength={6}
                  placeholder="验证码"
                />
                <Image
                  onClick={getCaptcha}
                  width={100}
                  height={40}
                  preview={false}
                  style={{
                    cursor: 'pointer',
                    borderTopRightRadius: '4px',
                    borderBottomRightRadius: '4px',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  src={captcha}
                />
              </Space.Compact>
            </Form.Item>
            <Form.Item className="flex flex-col">
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                {isLogin ? '登录' : '注册'}
              </Button>
              {/* 注册 */}
              <Button
                type="link"
                onClick={toggleLogin}
              >
                {isLogin ? '去注册' : '去登录'}
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}
