'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Post Schema
 */
var PostSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    attachments: {
        type: Array
    },
    category_ids: {
        type: Array
    },
    tag_ids: {
        type: Array
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    organisation: {
        type: Schema.ObjectId,
        ref: 'Organisation'
    }
});

/**
 * Validations
 */
PostSchema.path('content').validate(function(content) {
    return content.length;
}, 'Content cannot be blank');

/**
 * Statics
 */
PostSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Post', PostSchema);
