module.exports = {
    "parser": "babel-eslint", // 指定eslint的解释器，默认是Espree，这里因为安装了babel-eslint，所以用了那个
    "extends": "airbnb-base", // 指定配置的字符串，可以是数组来指定多个，本例是airbnb
    "env": { // 定义全局变量的环境，下面的browser表示的是浏览器环境，node表示的是node环境
        "browser": true,
        "node": true
    }
}