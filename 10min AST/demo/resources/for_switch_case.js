for (let index = '3'; index !== '4';) {
    switch (index) {
        case '0':
            console.log('This is case 0');
            index = '2';
            continue;
        case '1':
            console.log('This is case 1');
            index = '4';
            continue
        case '2':
            console.log('This is case 2');
            index = '1';
            continue;
        case '3':
            console.log('This is case 3');
            index = '0';
    }
}