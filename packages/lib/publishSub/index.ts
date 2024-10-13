//定义类接口
type SafeANY = any;
interface EventFace {
  on: (name: string, fn: Function) => void;
  emit: (name: string, ...arg: Array<any>) => void;
  off: (name: string, fn: Function) => void;
  once: (name: string, fn: Function) => void;
}
interface ListFn {
  [key: string]: Array<Function>;
}
//创建实现类
class PublishSub implements EventFace {
  list: ListFn;
  constructor() {
    this.list = {};
  }
  //订阅/监听
  on(name: string, fn: Function) {
    let callbackList = this.list[name] || [];
    callbackList.push(fn);
    this.list[name] = callbackList;
  }
  //发布/注册
  emit(name: string, ...arg: Array<SafeANY>) {
    let eventNames = this.list[name];
    if (eventNames) {
      eventNames.forEach(el => {
        el.apply(this, arg);
      });
    } else {
      console.error(`名称错误${name}`);
    }
  }
  //解除绑定
  off(name: string, fn: Function) {
    let eventNames = this.list[name];
    if (eventNames && fn) {
      let index = eventNames.findIndex(fns => fns === fn);
      eventNames.splice(index, 1);
    } else {
      console.error("该事件未监听");
    }
  }
  //只执行一次
  once(name: string, fn: Function) {
    let decor = (...args: Array<any>) => {
      fn.apply(this, args);
      this.off(name, decor);
    };
    this.on(name, decor);
  }
}
//创建实例
export { PublishSub };
