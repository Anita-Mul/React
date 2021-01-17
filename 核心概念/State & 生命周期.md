# State & 生命周期
 - state是私有的，并且完全受控于当前组件
 - `componentDidMount`：挂载，当类组件第一次被渲染到DOM的时候使用
 - `componentWillUnmount`：卸载，当类组件被删除的时候使用
```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
 - 让我们来快速概括一下发生了什么和这些方法的调用顺序：
1. 当 `<Clock />` 被传给 `ReactDOM.render()`的时候，`React` 会调用 `Clock` 组件的构造函数。因为 `Clock` 需要显示当前的时间，所以它会用一个包含当前时间的对象来初始化 `this.state`。我们会在之后更新 `state`。
2. 之后 `React` 会调用组件的 `render()` 方法。这就是 `React` 确定该在页面上展示什么的方式。然后 `React` 更新 `DOM` 来匹配 `Clock` 渲染的输出。
3. 当 `Clock` 的输出被插入到 `DOM` 中后，`React` 就会调用 `ComponentDidMount()` 生命周期方法。在这个方法中，`Clock` 组件向浏览器请求设置一个计时器来每秒调用一次组件的 `tick()` 方法。
4. 浏览器每秒都会调用一次 `tick()` 方法。 在这方法之中，`Clock` 组件会通过调用 `setState()` 来计划进行一次 `UI` 更新。得益于 `setState()` 的调用，`React` 能够知道 `state` 已经改变了，然后会重新调用 `render()` 方法来确定页面上该显示什么。这一次，`render()` 方法中的 `this.state.date` 就不一样了，如此以来就会渲染输出更新过的时间。`React` 也会相应的更新 `DOM`。
5. 一旦 `Clock` 组件从 `DOM` 中被移除，`React` 就会调用 `componentWillUnmount()` 生命周期方法，这样计时器就停止了。

***

## 正确地使用State
 - 不要直接修改`State`，而是使用`setState()`，构造函数是唯一可以给`this.state`赋值的地方
	```javascript
	// Wrong
	this.state.comment = 'Hello';

	// Correct
	this.setState({comment: 'Hello'});
	```
	***
 - `State` 的更新可能是异步的
	出于性能考虑，`React` 可能会把多个 `setState()` 调用合并成一个调用。
因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态。
例如，此代码可能会无法更新计数器：
	```javascript
	// Wrong
	this.setState({
	  counter: this.state.counter + this.props.increment,
	});
	```
	要解决这个问题，可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 `state` 作为第一个参数，将此次更新被应用时的 `props` 做为第二个参数：
	```javascript
	// Correct
	this.setState((state, props) => ({
	  counter: state.counter + props.increment
	}));
	
	
	// Correct
	this.setState(function(state, props) {
	  return {
	    counter: state.counter + props.increment
	  };
	});
	```
	***
 - 数据是向下流动的
	 - 组件中可以选择把它的`state`作为`props`向下传递到它的子组件中
		```javascript
		<FormattedDate date={this.state.date} />
		```
   - 	`FormattedDate` 组件会在其 `props` 中接收参数 `date`，但是组件本身无法知道它是来自于 Clock 的 `state`，或是 `Clock` 的 `props`，还是手动输入的：
		```javascript
		function FormattedDate(props) {
		  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
		}
		```
	 - 任何的 `state` 总是所属于特定的组件，而且从该 `state` 派生的任何数据或 `UI` 只能影响树中“低于”它们的组件。
	 - 每个组件都是独立的