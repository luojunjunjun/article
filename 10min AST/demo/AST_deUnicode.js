const fs = require('fs')
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const b_type = require("@babel/types");
const generator = require("@babel/generator").default;

// 模板
fs.readFile('resources/Unicode.js', "utf8", (err, input_js_code) => {
    // 将JavaScript源代码转化为AST
    let ast = parser.parse(input_js_code);
    // 对AST各个节点进行遍历，当遍历到visitor内声明的节点时，进入并执行。
    traverse(ast, visitor)

    // 将AST转化为JavaScript代码，jsescOption选项还原16进制和Unicode
    let output_code = generator(ast, {minified: true, jsescOption: {minimal: true}}).code
    fs.writeFileSync('resources/de_Unicode.js', output_code, {encoding: "utf-8"})
});

const visitor = {}