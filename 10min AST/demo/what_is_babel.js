const fs = require('fs')
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const b_type = require("@babel/types");
const generator = require("@babel/generator").default;


fs.readFile('resources/input.js', "utf8", (err, input_js_code) => {
    // 将JavaScript源代码转化为AST
    let ast = parser.parse(input_js_code);
    //对AST各个节点进行遍历，当遍历到visitor内声明的节点时，进入并执行。
    traverse(ast, visitor)

    // 将AST转化为JavaScript代码，jsescOption选项去除16进制和Unicode
    let output_code = generator(ast, {minified: true, jsescOption: {minimal: true}}).code
    fs.writeFileSync('resources/output.js', output_code, {encoding: "utf-8"})
});

function funToStr(path) {
    // @babel/types常用api
    // let new_node = b_type.stringValue()
    // let new_node = b_type.numberValue()
    // let new_node = b_type.valueToNode()

    // 替换节点
    // path.replaceWith(string_node)
    // path.replaceWithMultiple(string_node)

    // 删除节点
    // path.remove()
    // 在这之前、之后插入节点
    // path.insertBefore()
    // path.insertAfter()

    // 获取兄弟节点
    // path.getAllPrevSiblings()
}


const visitor = {
    // 调用函数节点
    CallExpression: {enter: [funToStr]},
    // ...
}