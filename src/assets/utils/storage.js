/**
 * 本地存储实现,封装localStorage和sessionStorage
 * 兼容支持es5 的浏览器 ie9+ chrome firefox safari opera

 * api
  set(key, val)  用key和val设置存储
  set(key, val, exp)  设置有时限的存储数据 typeof exp === "number" exp 单位为秒 
  get(key, def)  使用key获取存储，如果没有找到则返回def

  remove(key) 删除

  has(key)  判断是否有 key

  clear()  删除所有的存储

  getAll() 获取所有的存储

  forEach(callback) 每个 storage 分别添加回调函数
 */
let store = {
  /* eslint-disable no-undef */
  // version: __VERSION__,
  storage: window.localStorage,
  session: {
    storage: window.sessionStorage
  }
}

const api = {
  set(key, val, exp) {
    
    if (this.disabled) {
      return
    }
    if (val === undefined) {
      return this.remove(key)
    }
    if (typeof exp === "number") {
      let curTime = new Date().getTime();
      let expMS = exp*1000;
      key = 'exp_'+key;
      this.storage.setItem(key, serialize({data: val, time: curTime, exp: expMS}));
    } else {
      this.storage.setItem(key, serialize(val))
    }
    
    return val
  },
  /**
  exp 传入时间，秒为单位，设置缓存期限expire
  
  */
  get(key, def) {
    let val,prefix, _this = this

    if (this.disabled) {
      return def
    }

    prefix = key.split("_")[0];
    let dataObj = deserialize(this.storage.getItem(key));

    if (prefix == 'exp'  && dataObj) {
      
      let newTime = new Date().getTime();

      if (dataObj.time + dataObj.exp < newTime){
        // 信息过期清除
        this.storage.removeItem(key);

      }else{
        val = dataObj.data;
      }
    } else {
      val = deserialize(this.storage.getItem(key))
    } 
    
    return (val === undefined ? def : val)
  },

  has(key) {
    return this.get(key) !== undefined
  },

  remove(key) {
    if (this.disabled) {
      return
    }
    this.storage.removeItem(key)
  },

  clear() {
    if (this.disabled) {
      return
    }
    this.storage.clear()
  },

  getAll() {
    if (this.disabled) {
      return null
    }
    let ret = {}
    this.forEach((key, val) => {
      ret[key] = val
    })
    return ret
  },

  forEach(callback) {
    if (this.disabled) {
      return
    }
    for (let i = 0; i < this.storage.length; i++) {
      let key = this.storage.key(i)
      callback(key, this.get(key))
    }
  }
}

Object.assign(store, api)

Object.assign(store.session, api)

function serialize(val) {
  return JSON.stringify(val)
}

function deserialize(val) {
  if (typeof val !== 'string') {
    return undefined
  }
  try {
    return JSON.parse(val)
  } catch (e) {
    return val || undefined
  }
}

try {
  const testKey = '__storejs__'
  store.set(testKey, testKey)
  if (store.get(testKey) !== testKey) {
    store.disabled = true
  }
  store.remove(testKey)
} catch (e) {
  store.disabled = true
}

export default store