
exports.setRequestUrl=function(app){
    app.get('/', function (req, res) {
        res.json({
            hello : 'hello'
        })
    })
};