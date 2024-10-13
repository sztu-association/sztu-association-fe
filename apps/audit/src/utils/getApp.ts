const getApp = () => {
  //@ts-ignore
  const globalData = window.microApp?.getGlobalData() ?? {
    pubsub: { publish: () => {} },
    createContext: () => ({ token: '' })
  };
  return globalData;
};
export { getApp };
