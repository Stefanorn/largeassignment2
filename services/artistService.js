const artistDb = require('../data/db').Artist;

const globalTryCatch = async cb =>{
    try {
        return await cb();
    } catch (e) {
        return e;
    }
};

const artistService = () => {

    const getAllArtists = async () => {
        return await globalTryCatch( async () =>{
            return artistDb.find({});
        });
    };

    const getArtistById = async (id) => {
        return await globalTryCatch( async () =>{
            return artistDb.findById(id);
        });
    };

    const createArtist = async (artist) => {
        return await globalTryCatch( async () =>{
            return artistDb.create(artist);
        });
    };

    return {
        getAllArtists,
        getArtistById,
        createArtist
    };
}; 

module.exports = artistService();
