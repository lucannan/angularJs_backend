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
    })

    app.post('/list', function (req, res) {
        var path = req.body.path;

        ftpService.list(
            path,
            function (err, items) {
                res.json(
                    {
                        result: items
                    }
                )
            }
        )
    })
};