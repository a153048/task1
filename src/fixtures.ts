// Дан массив произвольных функций

export default [
    ///////////////////////// sync
    () => true,
    () => false,
    () => 2 * 2,
    ///////////////////////// exceptions
    () => {
        throw (new Error()); // caught by wrapper
    },
    () => {
        setTimeout(() => {
            throw (new Error()); // uncaught!
        }, 2000
        );
    },
    ///////////////////////// async
    () => { // xhr request
        let post = randomInteger(0, 20);
        xhrRequest(`GET`, `https://jsonplaceholder.typicode.com/posts/${post}`, true)
            .then(function (e: Event) {
                // console.log((<XMLHttpRequest>e.target).response);
            });
    },
    () => { // Promise + setTimeout
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('Promise + setTimeout');
            }, 5000 // provide desired timeout here
            );
        })
    },
    async () => await new Promise((resolve, reject) => {
        setTimeout(() => { // Promise + setTimeout with async function
            resolve('Promise + setTimeout inside async function');
        }, 10000 // provide desired timeout here
        );
    })
]

// helper for random integer in range
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
// ...
function xhrRequest(method, url, async) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, async);
        xhr.onload = resolve;
        xhr.onerror = reject;
        xhr.send();
    });
}
