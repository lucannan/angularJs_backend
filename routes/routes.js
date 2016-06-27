exports.setRequestUrl = function (app) {
    var ftpService = require('../service/ftpService')
    app.get('/', function (req, res) {
        ftpService.list(
            function (err, folder, items) {
                res.json(
                    {
                        result: folder
                    }
                )
            }
        )
    });

    app.post('/list', function (req, res) {
        var path = req.body.path;

        ftpService.list(path, null).success(function (data) {
            res.json(
                {
                    result: data
                }
            )
        });

    });

    app.post('/angularJs/backend', function (req, res) {
        var path = req.body.path;
        var action = req.body.action;

        switch (action) {
            case 'list':
                ftpService.list(path).then(function (data) {
                    res.json(
                        {
                            result: data
                        }
                    )
                });
                break;
        }


    });
};