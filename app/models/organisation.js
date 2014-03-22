'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Organisation Schema
 */
var OrganisationSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    admin_user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    sector: {
        type: String,
        default: '',
        trim: true
    },
    logo_url: {
        type: String,
        default: '',
        trim: true
    },
    twitter_username: {
        type: String,
        default: '',
        trim: true
    },
    facebook_url: {
        type: String,
        default: '',
        trim: true
    },
    user_ids: {
        type: Array
    }
});

/**
 * Validations
 */
OrganisationSchema.path('name').validate(function(name) {
    return name.length;
}, 'Name cannot be blank');

/**
 * Statics
 */
OrganisationSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('admin_user', 'name username').exec(cb);
};

mongoose.model('Organisation', OrganisationSchema);
