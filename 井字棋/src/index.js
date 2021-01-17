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
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}


//渲染了九个方块
class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //对于棋盘来说，状态是：
            //1.每次落子时，棋盘的情况（因为要表示出每一个小方格的状态，所以用数组表示）
            //2.下次落啥子（只有两种情况，所以用true和false来表示）
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }


    renderSquare(i) {
        return (<Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />);
    }

    // render函数的return是HTML语句，主要用来展示数据
    // 每个小方格都是Square，如果要使用Square，必须传入value值和点击时候调用的函数
    // 如果要知道value值，必须知道现在这个棋盘，这个位置上的值是啥
    // 
    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner' + winner;
        } else {
            status = 'Next player：' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
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
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                //棋盘的初始状态
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        //调用了.splice()方法创建了squares数组的一个副本
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            //concat()方法和push()方法不太一样，它并不会改变原数组
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'Go to game start';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });


        let status;

        if (winner) {
            status = 'Winner' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
