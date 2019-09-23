const Schema = require('mongoose').Schema;

module.exports = new Schema({

    images: [{ type: String }],
    isAuctionItem : { type: Boolean, required: true},
    title: { type: String, required: true },
    artistId: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, required: true },
    description: String

});
