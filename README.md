### pz_storage 

> 封装localStorage和sessionStorage，使保存值类型与获取对应值的类型一致，可以存入对象

1、安装
```
npm install pz_storage
```
2、使用
```
import storage from 'pz_storage';

// 存储单个值
storage.set('name', 'esther');
// 获取单个值
storage.get('name');
// 删除单个值
storage.remove('name');
// 清空全部
storage.clear();
// 存储对象，key - value形式
storage.setList({
   a: '1',
   b: '2.1',
   c: ['a', 'b', 'c'],
   d: {
      'd-1': 'd-1',
      'd-2': 'd-2'
   },
   e: true,
   f: new Date(),
   g: function(){
      console.log(111);
   }
});
// 获取多个值，传入数组形式的key
storage.getList(['a', 'b', 'd', 'f']);
// 删除多个值，传入数组形式的key
storage.removeList(['a', 'b', 'd', 'f'])

// sessionStorage, api同上
storage.session.set('name', 'esther');
```

也可直接在HTML页面引入dist文件夹下的storage.js
```
<script src="dist/storage.js"></script>
```
