const fs = require('fs')
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const b_type = require("@babel/types");
const generator = require("@babel/generator").default;
const {decryptStr, decryptStrFnName} = require("./tools_v5")

// 模板
fs.readFile('resources/jsjiami_v5.js', "utf8", (err, input_js_code) => {
    // 将JavaScript源代码转化为AST
    let ast = parser.parse(input_js_code);
    // 对AST各个节点进行遍历，当遍历到visitor内声明的节点时，进入并执行。
    traverse(ast, visitor)
    // 将AST转化为JavaScript代码，jsescOption选项还原16进制和Unicode
    let output_code = generator(ast, {minified: true, jsescOption: {minimal: true}}).code
    fs.writeFileSync('resources/de_jsjiami_v5.js', output_code, {encoding: "utf-8"})
});

function funToStr(path) {
    let {callee, arguments} = path.node
    if (callee.name === decryptStrFnName) {
        let replace_value = decryptStr(arguments[0].value, arguments[1].value)
        let replace_node = b_type.stringLiteral(replace_value)
        path.replaceWith(replace_node)
    }
}

const visitor = {
    CallExpression: {
        enter: [funToStr]
    }
}