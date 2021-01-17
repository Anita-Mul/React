## CDN链接
可以通过CDN获得React和ReactDOM的UMD版本
```javascript
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```
上述版本仅用于开发环境，不适合用于生产环境。压缩优化后可用于生产的 React 版本可通过如下方式引用：
```javascript
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```
如果需要加载指定版本的 `react` 和 `react-dom`，可以把 17 替换成所需加载的版本号。
***
###### 为什么要使用crossorigin属性
如果你通过 CDN 的方式引入 React，我们建议你设置 crossorigin 属性：

```html
<script crossorigin src="..."></script>
```
我们同时建议你验证使用的 CDN 是否设置了 Access-Control-Allow-Origin: * HTTP 请求头：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210117160821646.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)
