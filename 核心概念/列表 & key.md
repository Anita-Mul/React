## 列表 & Key
 - JS中的map()
	```javascript
	const numbers = [1, 2, 3, 4, 5];
	const doubled = numbers.map((number) => number * 2);
	console.log(doubled);
	//[2, 4, 6, 8, 10]
	```
***
#### 渲染多个组件
 - 使用{}在`JSX`内构建一个元素集合
	```javascript
	const numbers = [1, 2, 3, 4, 5];
	const listItems = numbers.map((number) =>
	  <li>{number}</li>
	);
	```
 - 把整个 `listItems` 插入到 `<ul>` 元素中，然后渲染进 DOM：
	```javascript
	ReactDOM.render(
	  <ul>{listItems}</ul>,
	  document.getElementById('root')
	);
	```
***
#### 基础列表组件
 - 这个组件接收 numbers 数组作为参数并输出一个元素列表
 - 得给列表元素分配key属性，否则会引起`a key should be provided for list items`警告
	```javascript
	function NumberList(props) {
	  const numbers = props.numbers;
	  const listItems = numbers.map((number) =>
	    <li key={number.toString()}>
	      {number}
	    </li>
	  );
	  return (
	    <ul>{listItems}</ul>
	  );
	}
	
	const numbers = [1, 2, 3, 4, 5];
	ReactDOM.render(
	  <NumberList numbers={numbers} />,
	  document.getElementById('root')
	);
	```
***
## key
 - key 帮助 React 识别哪些元素改变了，比如被添加或删除。
	```javascript
	const numbers = [1, 2, 3, 4, 5];
	const listItems = numbers.map((number) =>
	  <li key={number.toString()}>
	    {number}
	  </li>
	);
	```
 - 一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key：
	```javascript
	const todoItems = todos.map((todo) =>
	  <li key={todo.id}>
	    {todo.text}
	  </li>
	);
	```
 - 当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key：
	```javascript
	const todoItems = todos.map((todo, index) =>
	  // Only do this if items have no stable IDs
	  <li key={index}>
	    {todo.text}
	  </li>
	);
	```
 - 如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。

***
## 用key提取组件
 - 在 map() 方法中的元素需要设置 key 属性。

```javascript
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>
      {value}
    </li>
	
	//正确
	//<li>{props.value}</li>;
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 错误！元素的 key 应该在这里指定：
    <ListItem value={number} />

	//正确
    //<ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
***
## key只是在兄弟节点之间必须唯一
 - 数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值：
	```javascript
	function Blog(props) {
	  const sidebar = (
	    <ul>
	      {props.posts.map((post) =>
	        <li key={post.id}>
	          {post.title}
	        </li>
	      )}
	    </ul>
	  );
	  const content = props.posts.map((post) =>
	    <div key={post.id}>
	      <h3>{post.title}</h3>
	      <p>{post.content}</p>
	    </div>
	  );
	  return (
	    <div>
	      {sidebar}
	      <hr />
	      {content}
	    </div>
	  );
	}
	
	const posts = [
	  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
	  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
	];
	ReactDOM.render(
	  <Blog posts={posts} />,
	  document.getElementById('root')
	);
	```
	***
 - key 会传递信息给 React ，但不会传递给你的组件。如果你的组件中需要使用 key 属性的值，请用其他属性名显式传递这个值：
	```javascript
	const content = posts.map((post) =>
	  <Post
	    key={post.id}
	    id={post.id}
	    title={post.title} />
	);
	```
	上面例子中，Post 组件可以读出 props.id，但是不能读出 props.key。

***
## 在JSX中嵌入map()
 - JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果：
	```javascript
	function NumberList(props) {
	  const numbers = props.numbers;
	  return (
	    <ul>
	      {numbers.map((number) =>
	        <ListItem key={number.toString()}
	                  value={number} />
	      )}
	    </ul>
	  );
	}
	```
