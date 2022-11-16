const fs = require('fs')
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const b_type = require("@babel/types");
const generator = require("@babel/generator").default;


fs.readFile('resources/while_switch_case.js', "utf8", (err, input_js_code) => {
    // 将JavaScript源代码转化为AST
    let ast = parser.parse(input_js_code);
    //对AST各个节点进行遍历，当遍历到visitor内声明的节点时，进入并执行。
    traverse(ast, visitor);

    // 将AST转化为JavaScript代码，jsescOption选项去除16进制和Unicode
    let output_code = generator(ast, {minified: false, jsescOption: {minimal: true}}).code;
    fs.writeFileSync('resources/de_while_switch_case.js', output_code, {encoding: "utf-8"})
});

function de_planarization(path) {
    let {body, test} = path.node
    // 判断while内是否为!![]
    if (test.type !== "UnaryExpression" || test.operator !== "!" || test.argument.type !== "UnaryExpression" || test.argument.operator !== "!" || test.argument.argument.type !== "ArrayExpression" || test.argument.argument.elements.length !== 0) return;

    // 判断while内代码块是否为switch case
    if (body.body.length === 0 || body.body[0].type !== 'SwitchStatement' || body.body[1].type !== 'BreakStatement') return;

    // 取switch内分发器名字
    let discriminant = body.body[0].discriminant
    let dispatcher_name = discriminant.object.name

    // 取while循环上面的兄弟节点，用于获取case执行步骤
    let PrevSiblings = path.getAllPrevSiblings();
    // case执行步骤
    let replace_node = []

    //迭代兄弟节点
    PrevSiblings.forEach(Sibling => {
        // 判断是否为分发器的赋值语句
        if (Sibling.node.type === "VariableDeclaration" && Sibling.node.declarations[0].id.name === dispatcher_name) {
            let {callee, arguments} = Sibling.node.declarations[0].init

            // 分发器字符串切割符号
            let split_str = arguments[0].value
            // 分发器字符串的值
            let dispatcher_value = callee.object.value
            // 分发器处理函数，一般看源码就可以确认了，split_str、dispatcher_func可以不获取
            let dispatcher_func = callee.property.value

            // case代码块执行步骤
            let real_steps = dispatcher_value[dispatcher_func](split_str)
            // let real_steps = dispatcher_value.split('|')

            let switch_node = body.body[0]
            real_steps.forEach(step => {
                // 获取case内代码块
                let consequent = switch_node.cases[step].consequent
                // 移出最后一句continue代码
                if (b_type.isContinueStatement(consequent[consequent.length - 1])) {
                    consequent.pop();
                }

                replace_node = replace_node.concat(consequent);
            })
        }
        //删除前面的兄弟节点
        Sibling.remove();
    })

    //替换整个while节点
    path.replaceWithMultiple(replace_node);
}

const visitor = {
    WhileStatement: {
        enter: [de_planarization]
    }
}