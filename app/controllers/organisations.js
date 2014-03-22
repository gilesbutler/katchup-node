'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Organisation = mongoose.model('Organisation'),
    _ = require('lodash');


/**
 * Find organisation by id
 */
exports.organisation = function(req, res, next, id) {
    Organisation.load(id, function(err, organisation) {
        if (err) return next(err);
        if (!organisation) return next(new Error('Failed to load organisation ' + id));
        req.organisation = organisation;
        next();
    });
};

/**
 * Create an organisation
 */
exports.create = function(req, res) {
    var organisation = new Organisation(req.body);
    organisation.admin_user = req.user;

    organisation.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                organisation: organisation
            });
        } else {
            res.jsonp(organisation);
        }
    });
};

/**
 * Update an organisation
 */
exports.update = function(req, res) {
    var organisation = req.organisation;

    organisation = _.extend(organisation, req.body);

    organisation.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                organisation: organisation
            });
        } else {
            res.jsonp(organisation);
        }
    });
};

/**
 * Delete an organisation
 */
exports.destroy = function(req, res) {
    var organisation = req.organisation;

    organisation.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                organisation: organisation
            });
        } else {
            res.jsonp(organisation);
        }
    });
};

/**
 * Show an organisation
 */
exports.show = function(req, res) {
    res.jsonp(req.organisation);
};

/**
 * List of Organisations
 */
exports.all = function(req, res) {
    Organisation.find().sort('-created').populate('user', 'name username').exec(function(err, organisations) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(organisations);
        }
    });
};
