'use strict';

// Articles routes use posts controller
var posts = require('../controllers/posts');
var authorization = require('./middlewares/authorization');

// Article authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.post.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/posts', posts.all);
    app.post('/posts', authorization.requiresLogin, posts.create);
    app.get('/posts/:postId', posts.show);
    app.put('/posts/:postId', authorization.requiresLogin, hasAuthorization, posts.update);
    app.del('/posts/:postId', authorization.requiresLogin, hasAuthorization, posts.destroy);

    // Finish with setting up the postId param
    app.param('postId', posts.post);

};