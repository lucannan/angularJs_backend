"use strict";
var Client = require('ftp');
var async = require('async');

var options = {
    host: 'localhost',
    port: 21,
    user: 'lcn',
    password: 'lcn123',
    secure: false
};


var connectedStatus = false;


(function () {
    var ftpClient = new Client();

    ftpClient.connect(options);

    ftpClient.on('ready', function () {
        connectedStatus = true;
    });

    exports.list = function (path, callback) {
        var folder = [];
        var items = [];
        ftpClient.list(path, function (err, list) {
            if (err) throw err;

            list.forEach(function (data) {
                if (data['type'] === 'd') {
                    folder.push(data);
                } else if (data['type'] === '-') {
                    items.push(data);
                }
            });

            Array.prototype.push.apply(items, folder);
            callback(err, items);
        });
    };

})();



