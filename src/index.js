
/*
	storage

	import storage from 'pz_storage';
	storage.set('name', 'value', 2)
	storage.session.set('name', 'value', 2)
*/

// 移动端无痕模式下localStorage使用
;(function(){
    var KEY = '_localStorage',
        VALUE = 'test';
    
    // 检测是否正常
    try{
        localStorage.setItem(KEY, VALUE);
    }catch(e){
        var noop = function(){};
        
        localStorage.__proto__ = {
            setItem: noop,
            getItem: noop,
            removeItem: noop,
            clear: noop
        }
    }
    
    // 删除测试数据
    if(localStorage.getItem(KEY) === VALUE)
        localStorage.removeItem(KEY);
})()


let store = {
	storage: window.localStorage,
	session: {
		storage: window.sessionStorage
	}
}

let dataList = [];

const storeApi = {

	// expired 以小时(hours)为单位，默认 2 小时
	set(key, value, expired = 2){
		if(!value) return;

		dataList.push({ key, value, expired, startTime: Date.now() });
		this.storage.setItem(key, serialize(value));
	},

	get(key){
		if(!key) return;

		const val = deserialize(key);
		if(!val){
			this.storage.removeItem(key);
			dataList = dataList.filter(item => item.key !== key);
		}

		return val;
	},

	remove(key){
		if(!key) return;

		this.storage.removeItem(key);
		dataList = dataList.filter(item => {
			return item.key !== key
		})
	},

	clear(){
		this.storage.clear();
		dataList = [];
	},

	// 批量保存 obj => (key, value)
	setList(obj){
		for(let i in obj){
			dataList.push({ 
				key: i, 
				value: obj[i]
			});
			this.storage.setItem(i, serialize(obj[i]));
		}
	},

	// 批量获取 array => key 数组
	getList(array){
		let data = {};

		for(let key of array){
			if(this.storage.getItem(key)){
				let value = deserialize(key);
				if(!value){
					this.storage.removeItem(key);
					dataList = dataList.filter(item => item.key !== key);
				}
				data[key] = value;
			}
		}

		return data;
	},

	// 批量删除 array => key 数组
	removeList(array){
		for(let key of array){
			this.storage.removeItem(key);
			dataList = dataList.filter(item => {
				return item.key !== key
			})
		}
	}
}

const serialize = function(value){
	if(!value) return;

	let val = '';
	const type = Object.prototype.toString.call(value);
	if(type === '[object Object]' || type === '[object Array]'){
		val = JSON.stringify(value);
	}else{
		val = value;
	}

	return val;
}

const deserialize = function(key){
	if(!key) return;

	let val = '';

	dataList.map((item) => {
		if(item.expired && Date.now() > item.startTime + (1000 * 60 * 60 * item.expired)){
			val = '';			
		}else{
			if(item.key === key){
				val = item.value;
			}
		}
	})

	return val;
}

Object.assign(store, storeApi);
Object.assign(store.session, storeApi);

export default store;