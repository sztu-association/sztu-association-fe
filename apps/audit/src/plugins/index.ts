import type { App } from 'vue';
import setupAssets from './assets';
import setupDirectives from './directives';
import loadElementIcon from './element';

export default function install(app: App) {
  setupAssets();
  setupDirectives(app);
  loadElementIcon(app);
}
