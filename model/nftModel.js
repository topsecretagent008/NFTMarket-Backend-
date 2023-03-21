import mongoose from 'mongoose';

const NFTSchema = new mongoose.Schema({
    nftImgPath: {
        type: String,
        require: true,
    },
    nftName: {
        type: String,
        required: true,
    },
    nftDescription: {
        type: String,
        required: true,
    },
    nftProperties: {
        type: Object,
        required: true,
    },
    nftRoyalty: {
        type: String,
    },
    nftPrice: {
        type: String,
    }
});

const NFTModel = mongoose.model("NFTS", NFTSchema);
export default NFTModel;