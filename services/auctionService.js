const AuctionDB = require('../data/db').Auction;
const AuctionDBBID = require('../data/db').AuctionBid;
const customerDB = require('../data/db').Customer;

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
        return await globalTryCatch( async() =>{
            return AuctionDB.findById(id);
        });
        
    };

    function checkCustomer(){
        
    }
    const getAuctionWinner = async () => {
        return await globalTryCatch( async() =>{
        
         const auction = await AuctionDBBID.findOne().sort('-price');
 
         //console.log(auction);
 
         const customer = await customerDB.findById(auction.customerId);
 
         return customer;
     });  
     }

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
