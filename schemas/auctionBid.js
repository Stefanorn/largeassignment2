const Schema = require('mongoose').Schema;

module.exports = new Schema({

    customerId: { type: String, required: true },
    price: { type: Number, required: true }

});
