/**
 * @description 退出登录
 */
export function logout() {
  window.localStorage.clear()
  window.location.reload()
  window.location.href = `${window.location.origin}/login`
}
