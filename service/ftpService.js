"use strict";
var Promise = require('bluebird');
var Client = require('ftp');

var options = {
    host: 'localhost',
    port: 21,
    user: 'lcn',
    password: 'lcn123',
    secure: false
};

var connect = function () {
    return new Promise(function (resolve, reject) {
        var ftpClient = new Client();
        Promise.promisifyAll(Object.getPrototypeOf(ftpClient));
        ftpClient.connect(options);
        ftpClient.on('ready', function () {
            resolve(ftpClient);
        });
    });
};


var list = function (path) {
    return new Promise(function (resolve, reject) {
        connect().then(function (ftpClient) {
            var folders = [];
            var items = [];
            ftpClient.list(path, function (err, list) {
                list.forEach(function (data) {
                    if (data['type'] === 'd') {
                        folder.push(data);
                    } else if (data['type'] === '-') {
                        items.push(data);
                    }
                });
                Array.prototype.push.apply(items, folders);
                ftpClient.end();
                resolve(items);
            })
        })
    });
};


var list2 = function (path) {
    return connect().then(ftpClient => {
        return ftpClient.listAsync(path).then(list => {
            var folders = [];
            var items = [];
            list.forEach(data => {
                if (data['type'] === 'd') {
                    folders.push(data);
                } else if (data['type'] === '-') {
                    items.push(data);
                }
            });
            Array.prototype.push.apply(items, folders);
            ftpClient.end();
            return items;
        })
    })
};

exports.list = list2;

