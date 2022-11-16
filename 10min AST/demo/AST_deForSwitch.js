const fs = require('fs')
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const b_type = require("@babel/types");
const generator = require("@babel/generator").default;


fs.readFile('resources/for_switch_case.js', "utf8", (err, input_js_code) => {
    // 将JavaScript源代码转化为AST
    let ast = parser.parse(input_js_code);
    //对AST各个节点进行遍历，当遍历到visitor内声明的节点时，进入并执行。
    traverse(ast, visitor)

    // 将AST转化为JavaScript代码，jsescOption选项去除16进制和Unicode
    let output_code = generator(ast, {minified: false, jsescOption: {minimal: true}}).code
    fs.writeFileSync('resources/de_for_switch_case.js', output_code, {encoding: "utf-8"})
});

function de_planarization(path) {
    let {init, test, update, body} = path.node
    // 判断for循环跳出特征
    if (test.operator !== "!==") return;

    // 起始代码块索引
    let start_index = init.declarations[0].init.value
    // 结束索引
    let end_index = test.right.value
    // 索引在源代码中的名字
    let dispatcher_name = test.left.name;

    // 替换节点
    let replace_node = []
    body.body.forEach(node => {
        if (node.type === "SwitchStatement") {
            // switch case分发器特征是否满足条件
            if (node.discriminant.name !== dispatcher_name) return;
            // 按源代码顺序迭代case
            for (let i = start_index; i !== end_index;) {
                let SwitchCase = node.cases[i]
                let need_save = []
                SwitchCase.consequent.forEach(Statement => {
                    // 获取下一个执行的代码块index
                    if (Statement.type !== 'ExpressionStatement'
                        || Statement.expression.type !== "AssignmentExpression"
                        || Statement.expression.left.name !== dispatcher_name
                    ) {
                        // 将其与代码保存
                        need_save.push(SwitchCase.consequent.indexOf(Statement))
                        return
                    }
                    // 下一个执行的代码块
                    i = Statement.expression.right.value
                })
                need_save.forEach(index => {
                    let case_code = SwitchCase.consequent[index]
                    // 删除continue
                    if (b_type.isContinueStatement(case_code)) return;
                    replace_node = replace_node.concat(case_code);
                })
                // replace_node = replace_node.concat(SwitchCase.consequent);
            }
            path.replaceWithMultiple(replace_node)
        }
    })
}

const visitor = {
    ForStatement: {
        enter: [de_planarization]
    }
}