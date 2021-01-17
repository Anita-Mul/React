## 将JSX添加到项目
 - 执行`npm init -y`
 - 执行`npm install babel-cli@6 babel-preset-react-app@3`
 - 运行JSX预处理器
  
     - 创建一个src的文件夹并执行这个命令，不要等待它运行结束 —— 这个命令启动了一个对 JSX 的自动监听器。
       `npx babel --watch src --out-dir . --presets react-app/prod`
 - 如果此时你创建一个src/like_button.js文件，监听器会创建一个预处理过的like_button.js文件。当你编辑带有JSX的源文件时，转换过程将自动重新执行

