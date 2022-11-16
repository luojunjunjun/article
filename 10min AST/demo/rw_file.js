// 读取input.js文件base64编码后写入output.js
// node.js 在16.00之后也有atob，btoa了

const fs = require('fs')

fs.readFile('resources/input.txt', "utf8", (err, input_js_code) => {
    console.log(input_js_code);
    let output_code = btoa(encodeURIComponent(input_js_code));
    console.log(output_code);
    fs.writeFileSync('resources/output.txt', output_code, {encoding: "utf-8"})
});

// 输出：
// 又是一个爬虫er
// JUU1JThGJTg4JUU2JTk4JUFGJUU0JUI4JTgwJUU0JUI4JUFBJUU3JTg4JUFDJUU4JTk5JUFCZXI=
