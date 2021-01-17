## 组件 & Props
 - 组件：类似于`Javascript`函数。它接受任意的入参（即"`Props`"），并返回用于描述页面展示内容的`React`元素

***
## 函数组件与class组件
###### 1. 函数组件：
 - 接收唯一带有数据的 “props”（代表属性）对象与并返回一个 React 元素。
	```javascript
	function Welcome(props) {
	  return <h1>Hello, {props.name}</h1>;
	}
	```
	***
###### 2. class组件:
 - 继承`React.Component`，调用`render`，且有返回值
	```javascript
	class Welcome extends React.Component {
	  render() {
	    return <h1>Hello, {this.props.name}</h1>;
	  }
	}
	```
***

## 渲染组件
 - DOM标签作为React元素
	```javascript
	const element = <div />;
	```
	***
 - 用户自定义的组件作为React元素
	```javascript
	function Welcome(props) {
	  return <h1>Hello, {props.name}</h1>;
	}
	
	const element = <Welcome name="Sara" />;
	ReactDOM.render(
	  element,
	  document.getElementById('root')
	);
	```
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210117205059874.png)

***
## 组合组件
 - 创建一个可以多次渲染Welcome组件的App组件
	```javascript
	function Welcome(props) {
	  return <h1>Hello, {props.name}</h1>;
	}
	
	function App() {
	  return (
	    <div>
	      <Welcome name="Sara" />
	      <Welcome name="Cahal" />
	      <Welcome name="Edite" />
	    </div>
	  );
	}
	
	ReactDOM.render(
	  <App />,
	  document.getElementById('root')
	);
	```
	![在这里插入图片描述](https://img-blog.csdnimg.cn/20210117205506599.png)
***
## 提取组件
 - 该组件用于描述一个社交媒体网站上的评论功能，它接收 `author`（对象），`text` （字符串）以及 `date`（日期）作为 `props`。
	```javascript
	function Comment(props) {
	  return (
	    <div className="Comment">
	      <div className="UserInfo">
	        <img className="Avatar"
	          src={props.author.avatarUrl}
	          alt={props.author.name}
	        />
	        <div className="UserInfo-name">
	          {props.author.name}
	        </div>
	      </div>
	      <div className="Comment-text">
	        {props.text}
	      </div>
	      <div className="Comment-date">
	        {formatDate(props.date)}
	      </div>
	    </div>
	  );
	}
	``
 - 提取 `Avatar` 组件
	```javascript
	function Avatar(props) {
	  return (
	    <img className="Avatar"
	      src={props.user.avatarUrl}
	      alt={props.user.name}
	    />
	  );
	}
	```
  - 提取 `UserInfo` 组件，该组件在用户名旁渲染 `Avatar` 组件	
	```javascript
	function UserInfo(props) {
	  return (
	    <div className="UserInfo">
	      <Avatar user={props.user} />
	      <div className="UserInfo-name">
	        {props.user.name}
	      </div>
	    </div>
	  );
	}
	```
 - 进一步简化 Comment 组件：
	```javascript
	function Comment(props) {
	  return (
	    <div className="Comment">
	      <UserInfo user={props.author} />
	      <div className="Comment-text">
	        {props.text}
	      </div>
	      <div className="Comment-date">
	        {formatDate(props.date)}
	      </div>
	    </div>
	  );
	}
	```
***
## Props的只读性
 - 纯函数：不能修改自身的props
	```javascript
	function sum(a, b) {
	  return a + b;
	}
	```
 - 不是纯函数：更改自己的入参
	```javascript
	function withdraw(account, amount) {
	  account.total -= amount;
	}
	```
 - `所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。`
