import fixtures from './fixtures';

run(fixtures); // entry point

async function run(a: Array<Function>) {
    console.dir(a);
    console.log('<<< executing an array of functions ...');
    // - "Этот массив функций должен быть выполнен"
    // run them all in parallel and wait
    let result = await Promise.all(
        a.map(async (fun) =>              // <- return fired up Promise
                Promise.resolve()       // init Promise chain
                .then(fun)          // then call function
                .catch((e) => {     // catch errors locally to prevent rejection of root
                    // "Ошибка в работе функции означает завершение ее работы."
                    console.error(`<<<<<<<< error caught :`, e);
                })
        )
    );
    // - "В консоли браузера должно выводиться сообщение о завершении 
    // выполнения ПОСЛЕ выполнения массива функций."
    console.log('<<< execution has been completed!');
    console.dir(result);
}

