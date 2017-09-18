const mw = function(array, callback){
    if(array.constructor !== Array){
        console.error('第一个参数必须为数组,顶你个肺啊')
        return;
    }

    let len = array.length;
    let proxy = new Proxy({ progress: 0 }, {
        set(target, key, value, receiver){
            if(proxy.progress >= len - 1){
                callback();
            }
            return Reflect.set(target, key, value, receiver);
        }
    })

    array.forEach((item) => {
        item(function(){
            proxy.progress += 1;
        })
    })
}

export default mw;