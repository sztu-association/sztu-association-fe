import { viteMockServe } from 'vite-plugin-mock';

export default (viteEnv: ImportMetaEnv) => {
  return viteMockServe({
    mockPath: 'mock',
    prodEnabled: false, //生产是否启用mock开关(默认开启)
    injectCode: `
      import { setupProdMockServer } from '../mock'
			setupProdMockServer()
		`
  });
};
