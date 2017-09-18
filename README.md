# mission-watch

##### 目的在于解决有若干异步程序互不关联，有一个事件想在这若干个异步程序完全执行完的情况下执行的需求；

> 形如

```javascript
async_function1();
async_function2();
async_function3();

the_end();
```

> 然后我们希望
>
> async_function1()
>
> async_function2() 
>
> async_function1() 同时执行
>
> 等到三个异步程序全都完全执行完毕之后 the_end() 再执行



##### 目前（0.0.4）只是一个思路，以后慢慢优化

思路大概是这样，创建一个函数，传入两个参数，第一个参数是一个由想要执行的不定时完成的异步程序构成的数组，第二个参数是异步完成之后最终执行的函数；

在函数中新建一个对象，监听一个Number类型的变量，该变量初始值为0，每当一个异步程序执行完成该变量累加1，等到变量数值大于等于数组的(长度 - 1)时则表明全部异步程序都执行过；

但是这样子的话，在每一个异步程序的回调里面必须有一个对上述的Number变量操作的动作；

描述有点绕，直接代码。



```javascript
import mw from 'mission-watch'

const time = function(){ // 随机生成一个整百的毫秒数
    let ms = parseInt(Math.random() * 10) * 100; //整百
    return ms
}

let foo = function(name, end){
    let ms = time();

    setTimeout(() => {
        console.log(`这个输出来自${name}, 共延迟了${ms}毫秒`);
        end()
    }, ms)
}

let foo1 = function(f1){
    return foo('foo1', f1)
}

let foo2 = function(f2){
    return foo('foo2', f2)
}

let foo3 = function(f3){
    return foo('foo3', f3)
}

mw([foo1, foo2, foo3], function(){
    console.log('end')
})

```



##### 结果输出

> 这个输出来自foo1, 共延迟了700毫秒
> 这个输出来自foo3, 共延迟了800毫秒
> 这个输出来自foo2, 共延迟了900毫秒
> end



##### 说明

在这个函数中，所要执行的异步函数里面，需要留一个位置给异步函数，作为异步程序执行完毕之后的回调。

```javascript
let foo = function(name, end){
    let ms = time();

    setTimeout(() => {
        console.log(`这个输出来自${name}, 共延迟了${ms}毫秒`);
        end()
    }, ms)
}

let foo1 = function(f1){
    return foo('foo1', f1)
}
```

此处的end就是所谓的异步结束的回调函数