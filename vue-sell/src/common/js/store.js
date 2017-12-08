export function saveToLocal(id,key,val){
	//创建一个localStorage
	let seller = window.localStorage.__seller__;
	//如果不存在这个localStorage
	if(!seller) {
		seller = {};
		seller[id] = {};
	}else{
		//如果存在这个localStorage，将json字符串转化成json对象
		seller = JSON.parse(seller);
		//如果不存在商家id，置为空对象
		if(!seller[id]){
			seller[id] = {};
		}
	}
	//如果存在这个商家Id,将val赋值给key
	seller[id][key] = val;
	//把处理好后的seller赋值给localStorage
	window.localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal(id,key,def){
	let seller = window.localStorage.__seller__;
	//如果不存在seller，返回默认值
	if(!seller){
		return def
	}
	//如果存在seller，读取seller中的id赋值给seller
	seller = JSON.parse(seller)[id];
	//如果不存在商家id
	if(!seller){
		//返回默认值
		return def
	}
	//如果存在商家id，取出商家id
	let ret = seller[key];
	//返回value
	return ret || def;
}
