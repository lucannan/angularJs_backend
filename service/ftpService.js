"use strict";
var async = require('async');
var Promise = require('bluebird')
var Client = Promise.promisifyAll(require('ftp'));

var options = {
    host: 'localhost',
    port: 21,
    user: 'lcn',
    password: 'lcn123',
    secure: false
};

var connectedStatus = false;

var connect = function () {
    return new Promise(function (resolve, reject) {
        var ftpClient = new Client();
        ftpClient.connect(options);
        ftpClient.on('ready', function () {
            resolve(ftpClient);
        });
    });
};


var list2 = function (path, callback) {
    return new Promise(function (resolve, reject) {
        connect().then(function (ftpClient) {
            var folder = [];
            var items = [];
            ftpClient.list(path, function (err, list) {
                list.forEach(function (data) {
                    if (data['type'] === 'd') {
                        folder.push(data);
                    } else if (data['type'] === '-') {
                        items.push(data);
                    }
                });
                Array.prototype.push.apply(items, folder);
                ftpClient.end();
                resolve(items);
            })
        })
    });

};

exports.list = list2;


//connect().then(function (ftpClient) {
//    connectedStatus = true;
//    var folder = [];
//    var items = [];
//    ftpClient.list(path, function (err, list) {
//        list.forEach(function (data) {
//            if (data['type'] === 'd') {
//                folder.push(data);
//            } else if (data['type'] === '-') {
//                items.push(data);
//            }
//        });
//        Array.prototype.push.apply(items, folder);
//        ftpClient.end();
//        callback(null, items);
//    });
//});
