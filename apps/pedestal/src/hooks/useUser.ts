import { useNavigate } from 'react-router-dom'
import { userStore } from '@/store/user'

export function useUser() {
  const user = userStore()
  const navigate = useNavigate()

  const logout = () => {
    user.setToken('')
    user.setUserInfo({ username: '', avatar: '' })
  }
  const gotoLogin = () => {
    navigate('/login', { replace: true })
  }
  return {
    user,
    navigate,
    logout,
    gotoLogin,
  }
}
