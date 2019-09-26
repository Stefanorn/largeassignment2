const Schema = require('mongoose').Schema;

module.exports = new Schema({

    images: [{ type: String }],
    isAuctionItem : { type: Boolean, default: false},
    title: { type: String, required: true },
    artistId: { type: Schema.Types.ObjectId, required: true },
    date: { type: Date, default: Date.now() , required: true },
    description: String

});
