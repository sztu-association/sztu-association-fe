import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import router from '@/router';
import { getUserInfo, login } from '@/api/auth';
import { storage } from '@/utils/storage';
import { useNavTabStore } from './navTab';
import { ElNotification, ElMessageBox } from 'element-plus';

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref<string | null>(storage.get('token') || 'test');
  const userInfo = ref<{ username: string; role: string }>(
    storage.get('userInfo') || { username: '', role: '' }
  );
  const permissions = ref<string[]>([]);

  // Getters
  const isLogin = computed(() => Boolean(token.value));

  // Actions
  const resetUser = () => {
    const navTabStore = useNavTabStore();
    storage.remove('userInfo');
    storage.remove('token');
    navTabStore.reset();
    token.value = null;
    userInfo.value = { username: '', role: '' };
    permissions.value = [];
  };

  const setToken = (newToken: string) => {
    token.value = newToken;
    storage.set('token', newToken);
  };

  const setUserInfo = async () => {
    const { data } = await getUserInfo();
    if (data?.permissions?.length) setPermissions(data.permissions);
    userInfo.value = data;
    storage.set('userInfo', data);
  };

  const setPermissions = (newPermissions: string[]) => {
    permissions.value = newPermissions;
  };

  const loginAction = async (params: any) => {
    const { data } = await login(params);
    setToken(data.token);
    router.push((router.currentRoute.value.query?.redirect || '/') as string);
    await setUserInfo();
    ElNotification({
      title: '登录成功!',
      type: 'success',
      message: `欢迎回来，${userInfo.value.username}`
    });
  };

  const logout = () => {
    ElMessageBox.confirm('您确定要退出登录吗？', '提示')
      .then(() => {
        resetUser();
        router.push('/login');
      })
      .catch(() => {});
  };

  return {
    token,
    userInfo,
    permissions,
    isLogin,
    resetUser,
    setToken,
    setUserInfo,
    setPermissions,
    loginAction,
    logout
  };
});
