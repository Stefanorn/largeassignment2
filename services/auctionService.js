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
            await AuctionDB.find({}).then(function (auctions) {
               auctions.forEach( async function (auction) {

                   // if i encounter a auction that is not expired, i will do nothing
                   if( auction.endDate <= Date.now()){}

                   // if i encounter a auction with winner then i will skip the extra step.
                   else if(auction.auctionWinner != null){}
                   // finaly i have encounterd a auction without a winner that should have a winner
                       // so i will add the winner.
                   else {
                       const auctionWinner = await AuctionDBBID
                           .find({"auctionId": auction._id})
                           .findOne()
                           .sort({price: '-1', endDate: '1'});


                        await AuctionDB.findById(auction._id).updateOne(
                           {},
                           {$set: {"auctionWinner": auctionWinner.customerId}},
                           {upsert: false, multi: true});
                   }
               });
            });
            return await AuctionDB.find({});
        });
    };

    const getAuctionById = async (id) => {

        return await globalTryCatch( async() =>{
            var auction = await AuctionDB.findById(id);

            // if i encounter a auction that is not expired, there is no winner so i will return
            // the auction as is.
            if( auction.endDate <= Date.now()){
                return await auction;
            }
            // if i encounter a auction with winner then i will skip the extra step and return.
            else if(auction.auctionWinner != null){
                return await auction;
            }
            // if i encounter a auction that dose not hae a winner i will add that row
            else {
                const auctionWinner = await AuctionDBBID
                    .find({"auctionId": id})
                    .findOne()
                    .sort({price: '-1', endDate: '1'});

                await AuctionDB.findById(id).updateOne(
                    {},
                    {$set: {"auctionWinner": auctionWinner}},
                    {upsert: false, multi: true});

                auction = await AuctionDB.findById(id);
                return await auction;
            }
        });
        
    };

    function checkCustomer(){
        
    }
    const getAuctionWinner = async ( auctionId ) => {
        return await globalTryCatch( async() =>{

         const auction = await AuctionDBBID
             .find({"auctionId":auctionId})
             .findOne()
             .sort({price: '-1', endDate:'1'});
        
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
