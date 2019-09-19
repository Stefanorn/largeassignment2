const Schema = require('mongoose').Schema;

module.exports = new Schema({

    images: [{ type: String }],
    isAuctionItem : Boolean,
    title: { type: String, required: true },
    artistId: { type: String, required: true },
 //   artistId: { type: Schema.artist.artistId, required: true },
    date: { type: Date, required: true },
    description: String

});
