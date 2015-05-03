var github = require('../../configs/github');

function controller(request, reply) {
    controller.rateLimit().then(function(result) {
        console.log('[#rateLimit] Done with promise');
        return reply(result);
    });
}

controller.rateLimit = function() {
    return new Promise(function(resolve, reject) {
        github().misc.rateLimit({}, function(error, result) {
            if (error) {
                var err = error.toJSON();
                var errorCode = parseInt(err.code, 10);
                var errorMsg = '';

                try {
                    errorMsg = JSON.parse(err.message).message;
                }
                catch(e) {
                    errorMsg = err.message;
                }

                reject({code: errorCode, msg: errorMsg});
            }
            else {
                resolve(result.resources.core);
            }
        });
    });
};

module.exports = controller;