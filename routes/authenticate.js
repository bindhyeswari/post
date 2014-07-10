// responsible authentication functions

var users = {
    'hamid': 'Pass1',
    'shilpa': 'Pass2',
    'jyotika': 'Pass3'
};

exports.login = function (req, res) {
    var obj = req.body;
    if ( obj.username in users ) {
        if ( obj.password === users[obj.username] ) {
            res.cookie('user', 'hamid');
            res.json(200, { message: 'USER_AUTHORIZED' });
        } else {
            res.json(200, { message: 'USER_UNAUTHORIZED' });
        }
    } else {
        res.json(200, { message: 'USER_NOT_AVAILABLE' });
    }
};