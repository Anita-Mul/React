import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//有三个React组件

//Square组件渲染一个单独的<button>
// class Square extends React.Component {
//     constructor(props) {
//         //构造函数必须以super开头
//         super(props);
//         this.state = {
//             value: null,
//         };
//     }

//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.state.value}
//             </button>
//         );
//     }
// }

//把类组件改写成一个函数组件
function Square(props){
    return (
        <button className = "square" onClick = {props.onClick}>
            {props.value}
        </button>
    );
}


//渲染了九个方块
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        //调用了.splice()方法创建了squares数组的一个副本
        const squares = this.state.squares.slice();
        squares[i] = 'x';
        this.setStates({ squares: squares });
    }


    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const status = 'Next player: X';

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//渲染了含有默认值的一个棋盘
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
