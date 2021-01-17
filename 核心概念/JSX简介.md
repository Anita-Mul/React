## JSX简介
- 下面这个标签语法是JSX
	```javascript
	const element = <h1>Hello, world!</h1>;
	```
 - JSX可以生成React元素
***
## 在JSX中嵌入表达式
 - 介绍`ReactDOM`的`render`
	使用`react`开发网页，使用两个包：
	`react`（react的核心代码）
	`react-dom`（涉及DOM操作的部分）
	react的核心思想是虚拟DOM，而react-dom包的核心功能就是把这些虚拟DOM渲染到文档中变成实际DOM。
	render用于将React渲染的虚拟DOM渲染到浏览器DOM
	```javascript
	render(ReactElement element,DOMElement container,[function callback])
	```
	例如：
	```javascript
	import ReactDOM from 'react-dom';
	
	ReactDOM.render(<Example />, document.getElementById('root'));
	```
	***
 - 可以在大括号内放置任何有效的JavaScript表达式（就是有确定值的）
	```javascript
	const name = 'Josh Perez';
	const element = <h1>Hello, {name}</h1>;
	
	ReactDOM.render(
	  element,
	  document.getElementById('root')
	);
	```
	***
 - 可以放置函数调用的结果
	```javascript
	function formatName(user) {
	  return user.firstName + ' ' + user.lastName;
	}
	
	const user = {
	  firstName: 'Harper',
	  lastName: 'Perez'
	};
	
	const element = (
	  <h1>
	    Hello, {formatName(user)}!
	  </h1>
	);
	
	ReactDOM.render(
	  element,
	  document.getElementById('root')
	);
	```
***
## JSX也是一个表达式
 - 可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX：
	```javascript
	function getGreeting(user) {
	  if (user) {
	    return <h1>Hello, {formatName(user)}!</h1>;
	  }
	  return <h1>Hello, Stranger.</h1>;
	}
	```
***
## JSX特定属性
  - 为属性值指定为字符串字面量
	```javascript
	const element = <div tabIndex="0"></div>;
	```
 - 为属性值插入一个Javascript表达式
	```javascript
	const element = <img src={user.avatarUrl}></img>;
	```
 - 仅可以使用引号（对于字符串值）或大括号（对于表达式）中的一个，对于同一属性不能同时使用这两种符号。
***
## 使用JSX指定子元素
 - 假如一个标签里面没有内容，你可以使用 /> 来闭合标签
	```javascript
	const element = <img src={user.avatarUrl} />;
	```
 - JSX 标签里能够包含很多子元素:
	```javascript
	const element = (
	  <div>
	    <h1>Hello!</h1>
	    <h2>Good to see you here.</h2>
	  </div>
	);
	```
***
## JSX表示对象
 - Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。
 - 以下两种示例代码完全等效：
	```javascript
	const element = (
	  <h1 className="greeting">
	    Hello, world!
	  </h1>
	);
	```
	```javascript
	const element = React.createElement(
	  'h1',
	  {className: 'greeting'},
	  'Hello, world!'
	);
	```
 - React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：
	```javascript
	// 注意：这是简化过的结构
	const element = {
	  type: 'h1',
	  props: {
	    className: 'greeting',
	    children: 'Hello, world!'
	  }
	};
	```
 - 这些对象被称为 “React 元素”。它们描述了你希望在屏幕上看到的内容。React 通过读取这些对象，然后使用它们来构建 DOM 以及保持随时更新。
   