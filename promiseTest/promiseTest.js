'user strict'
var Promise = require('bluebird');
var Client = require('ftp');
var connectedStatus = false;

// var options = {
//     user: 'lcn',
//     host: 'localhost',
//     port: 21,
//     password: 'lcn123',
//     secure: false
// };
//
// var connect = function () {
//     return new Promise(function (resolve, reject) {
//         var ftpClient = new Client();
//         Promise.promisifyAll(Object.getPrototypeOf(ftpClient));
//         ftpClient.connect(options);
//         ftpClient.on('ready', function () {
//             resolve(ftpClient);
//         });
//     });
// };
//
//
// process.on('promiseFulfilled', function (promise, child) {
//     console.log(promise);
// });
//
//
// connect().then(function (ftpClient) {
//     ftpClient.listAsync('/').then(function (list) {
//         var folder = [];
//         var items = [];
//         list.forEach(function (data) {
//             if (data['type'] === 'd') {
//                 folder.push(data);
//             } else if (data['type'] === '-') {
//                 items.push(data);
//             }
//         });
//         Array.prototype.push.apply(items, folder);
//         return items;
//     }).then(function (data) {
//         console.log(data);
//         ftpClient.end();
//     });
//
// });

// setTimeout(function () {
//    setTimeout(function () {
//      console.log('hello world');
//    },1000)
// },1000);


// Promise.delay(1000).delay(1000).then(function () {
//    console.log('hello world');
// });

// function returnThree() {
//     return 3;
// }
//
// Promise.resolve([5]).map(returnThree).then(function (val) {
//     console.log("Hello Value!", val);
// });
var makePromise = function (name, delay) {
    return new Promise(function (resolve) {
        console.log(`${name} started`);
        setTimeout(function () {
            console.log(`${name} completed`)
            resolve(name);
        }, delay);
    });
};

var data = [2000, 1, 1000];

// Promise.all(data.map(function (item, index) {
//     return makePromise(index, item)
// })).then(res => {
//     console.log(res);
// });
//
// Promise.map(data, (item, index) =>
//     makePromise(index, item)
// ).then(res => {
//     console.log(res);
// });

Promise.reduce(data, (total, item, index) => {
    return makePromise(index, item).then(res => {
        return total + res;
    });
}, '').then(res => {
    console.log(res)
});


Promise.mapSeries(data, (item, index)=> makePromise(index, item), 0).then(res => {
    console.log(res);
});


Promise.each(data, (item, index)=> makePromise(index, item), 0).then(res => {
    console.log(res);
});