const customerDb = require('../data/db').Customer;
const auctionBidDb = require('../data/db').AuctionBid;

const globalTryCatch = async cb =>{
    try {
        return await cb();
    } catch (e) {
        return e;
    }
};

const customerService = () => {

    const getAllCustomers = async () => {
        return await globalTryCatch( async () => {
          return customerDb.find({});
        });
    };

    const getCustomerById = async (id) => {
        return await globalTryCatch( async () =>{
            return customerDb.findById(id);
        });
    };

    const getCustomerAuctionBids = async (customerId) => {
        return await globalTryCatch(async() => {
            return await auctionBidDb.find({"customerId": customerId});
        });
    };

	const createCustomer = async (customer)=>{
	    return await globalTryCatch(async() => {
            return customerDb.create(customer);
        });
    };

    return {
        getAllCustomers,
        getCustomerById,
        getCustomerAuctionBids,
		createCustomer
    };
};

module.exports = customerService();
