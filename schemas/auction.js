const Schema = require('mongoose').Schema;

module.exports = new Schema({

    artID: { type: String, required: true },
    minimumPrice: { type: Number, required: true },
    endDate: { type: Date, required: true },
    auctionWinner: {type: Schema.Types.ObjectId}
});
