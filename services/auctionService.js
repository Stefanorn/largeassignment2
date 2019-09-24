const AuctionDB = require('../data/db').Auction;
const AuctionDBBID = require('../data/db').AuctionBid;
//const AuctionDBID = require('../data/db').AuctionBid;

const globalTryCatch = async cb => {
    try {
      return await cb();
    } catch(err) {
      return err;
    }
}

const auctionService = () => {
    const getAllAuctions = async () => {
        return await globalTryCatch( async () =>{
        return await AuctionDB.find({});
        });
    };

    const getAuctionById = async (id) => {
        // Your implementation goes here
        return await globalTryCatch( async() =>{
            return AuctionDB.findById(id);
        });
        
    };

    const getAuctionWinner = async (id) => {
        // Your implementation goes here
        return await globalTryCatch( async() =>{
            return AuctionDBBID.findById(id);
        });
    };

	const createAuction = (auction, cb, errorCb) => {
        // Your implementation goes here
    };

	const getAuctionBidsWithinAuction = (auctionId, cb, errorCb) => {
        // Your implementation goes here
    };

	const placeNewBid = (auctionId, customerId, price, cb, errorCb) => {
		// Your implementation goes here
	}

    return {
        getAllAuctions,
        getAuctionById,
        getAuctionWinner,
		createAuction,
		getAuctionBidsWithinAuction,
		placeNewBid
    };
};

module.exports = auctionService();
