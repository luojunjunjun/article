const fs = require('fs')
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const b_type = require("@babel/types");
const generator = require("@babel/generator").default;
const {decryptStr, decryptStrFnName, case_arrays} = require("./tools_fullpage9.1.0")

fs.readFile('resources/fullpage.9.1.0.js', "utf8", (err, input_js_code) => {
    // 将JavaScript源代码转化为AST
    let ast = parser.parse(input_js_code);
    //对AST各个节点进行遍历，当遍历到visitor内声明的节点时，进入并执行。
    traverse(ast, visitor)

    // 将AST转化为JavaScript代码，jsescOption选项去除16进制和Unicode
    let output_code = generator(ast, {minified: true, jsescOption: {minimal: true}}).code
    fs.writeFileSync('resources/de_fullpage.9.1.0.js', output_code, {encoding: "utf-8"})
});

let fake_array = []

function affirm_ob_variable(path) {
    let {kind, declarations} = path.node
    fake_array = []
    if (kind !== "var"
        || declarations[0].init === null
        || declarations[0].init.type !== "MemberExpression"
        || declarations[0].init.object.name !== "zmSjO"
        || declarations[0].init.property.name !== decryptStrFnName
    ) return
    fake_array.push(declarations[0].id.name)
    fake_array.push(declarations[1].id.name)
    fake_array.push(declarations[2].id.name)
    path.getFunctionParent().traverse(visitor_2)
    path.getNextSibling().remove()
    path.getNextSibling().remove()
    path.remove()
}

function funToStr(path) {
    let {callee, arguments} = path.node
    if (fake_array.indexOf(callee.name) > -1) {
        let replace_str = b_type.valueToNode(decryptStr(arguments[0].value))
        path.replaceWith(replace_str)
    }

}

function de_planarization(path) {
    let {init, test, update, body} = path.node
    // 判断for循环跳出特征

    if (test.operator !== "!=="
        || test.right.type !== "MemberExpression"
        || test.right.object.type !== "MemberExpression"
        || test.right.object.object.type !== "CallExpression"
        || test.right.object.object.callee.object.name !== "zmSjO"
        || test.right.object.object.callee.property.name !== "$_DB"
    ) return;

    // 用于替换for-switch节点的节点列表
    let replace_node = []
    // case分发器值和相应case代码段、下一步组成的字典
    let case_map = {}


    // 起始代码块索引
    let before_code = path.getPrevSibling()
    // 分发器特征判断
    if (before_code.type !== "VariableDeclaration") return;
    let {declarations, kind} = before_code.node
    // 起始索引
    let start_index = case_arrays[declarations[0].init.object.property.value] [declarations[0].init.property.value]
    // 分发器名
    let dispatcher_name = declarations[0].id.name
    // 删除分发器初始化赋值代码
    before_code.remove()

    // 第一步执行的代码段


    // 遍历 for内代码块
    body.body.forEach(node => {
        if (node.type === "SwitchStatement") {
            // switch case分发器特征是否满足条件
            if (node.discriminant.name !== dispatcher_name) return;
            // 遍历case节点
            node.cases.forEach(SwitchCase => {
                // case对应的分发器值
                let case_index = case_arrays[SwitchCase.test.object.property.value][SwitchCase.test.property.value]
                let next_index;
                // 如果该case最后一句为break则不需要记录下一步分发器的值
                if (!b_type.isBreakStatement(SwitchCase.consequent[SwitchCase.consequent.length - 1])) {
                    SwitchCase.consequent.forEach(Statement => {
                            if (Statement.type === "ExpressionStatement") {
                                let {expression} = Statement
                                if (expression.type !== "AssignmentExpression"
                                    || expression.left.name !== dispatcher_name
                                ) return
                                // 读取下一步分发器的值
                                next_index = case_arrays[expression.right.object.property.value][expression.right.property.value]
                            }
                        }
                    )
                } else {
                    // 移出 最后一句break语句
                    SwitchCase.consequent.pop()
                    // 移出 倒数第二句break中无效的分发器赋值
                    if (b_type.isExpressionStatement(SwitchCase.consequent[SwitchCase.consequent.length - 1])) {
                        let consequent = SwitchCase.consequent[SwitchCase.consequent.length - 1]
                        if (consequent.expression.type === "AssignmentExpression"
                            || consequent.expression.left.name === dispatcher_name
                        ) {
                            SwitchCase.consequent.pop()
                        }

                    }
                }
                // 存入字典
                case_map[case_index] = {
                    "consequent": SwitchCase.consequent,
                    'next_index': next_index
                }

            })

        }
    })
    // 当start_index 为undefined时，结束循环
    while (start_index) {
        // 存在假代码，删除不执行的case
        if (!case_map[start_index]) break
        let consequent = case_map[start_index]["consequent"]
        // 下一步执行顺序
        start_index = case_map[start_index]["next_index"]
        // 将节点数组合并 存入replace_node
        replace_node = replace_node.concat(consequent)
    }
    // 批量替换
    path.replaceWithMultiple(replace_node)
}


const visitor = {
    VariableDeclaration: {enter: [affirm_ob_variable]},
    ForStatement: {enter: [de_planarization]},
}

const visitor_2 = {
    CallExpression: {
        enter: [funToStr]
    }
}