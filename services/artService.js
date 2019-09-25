const artdb = require('../data/db').Art;

const globalTryCatch = async cb =>{
    try {
        return await cb();
    } catch (e) {
        return e;
    }
};

const artService = () => {

    const getAllArts  = async function () {
        return await globalTryCatch(async () => {
            return artdb.find({});
        });
    };

    const getArtById = async (id) => {
        return await globalTryCatch( async () => {
            return artdb.findById(id);
        });
    };

    const createArt = async (art) =>{
        return await globalTryCatch(async => {
            return artdb.create(art);
        });
    };

    return {
        getAllArts,
        getArtById,
        createArt
    };
};

module.exports = artService();
