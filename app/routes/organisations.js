'use strict';

// Organisations routes use organisations controller
var organisations = require('../controllers/organisations');
var authorization = require('./middlewares/authorization');

// Organisation authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.organisation.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/organisations', organisations.all);
    app.post('/organisations', authorization.requiresLogin, organisations.create);
    app.get('/organisations/:organisationId', organisations.show);
    app.put('/organisations/:organisationId', authorization.requiresLogin, hasAuthorization, organisations.update);
    app.del('/organisations/:organisationId', authorization.requiresLogin, hasAuthorization, organisations.destroy);

    // Finish with setting up the organisationId param
    app.param('organisationId', organisations.organisation);

};