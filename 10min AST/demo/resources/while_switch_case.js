let case_str = '3|0|2|1'['split']('|');
run_index = 0;
while (!![]) {
    switch (case_str[run_index++]) {
        case '0':
            console.log("code segment 0")
            continue;
        case '1':
            console.log("code segment 1")
            continue;
        case '2':
            console.log("code segment 2")
            continue;
        case '3':
            console.log("code segment 3")
            continue;
    }
    break;
}

