const path = require('path');
const rimraf = require('rimraf');
const webpack = require('webpack');
const Mocha = require('mocha');

const mocha = new Mocha({
    timeout: '10000ms' // 超时响应
});

process.chdir(path.join(__dirname, 'template')); // 设置__dirname的目录为template下

rimraf('./dist', () => {
    const prodConfig = require('../../lib/webpack.prod.js');
    webpack(prodConfig, (err, stats) => {
        if (err) {
            console.error(err);
            process.exit(2)
        }
        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false
        }));

        mocha.addFile(path.join(__dirname, 'html-test.js'));
        mocha.addFile(path.join(__dirname, 'css-js-test.js'));

        mocha.run();
    })
});

