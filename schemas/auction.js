const Schema = require('mongoose').Schema;

module.exports = new Schema({

    artID: { type: String, required: true },
    minimumPrice: { type: Number, default: 1000 },
    endDate: { type: Date, required: true },
    auctionWinner: {type: Schema.Types.ObjectId}
});
