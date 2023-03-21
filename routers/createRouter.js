import express from "express";
import multer from 'multer';
import NFTModel from '../model/nftModel.js';
import { create } from "ipfs-http-client";
import fs from 'fs';
import { config } from "dotenv";
config();

const router = express.Router();
const auth =
    'Basic ' + Buffer.from(process.env.PROJECT_ID + ':' + process.env.PROJECT_SECRET).toString('base64');
const upload = multer({ dest: 'public/' });

async function ipfsClient() {
    const ipfs = await create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth,
        },
    });
    return ipfs;
}

router.post("/", upload.single('image'), async (req, res) => {
    let imageName = req.file.filename;
    console.log("imageName", imageName);
    let ipfs = await ipfsClient();
    const imageBuffer = fs.readFileSync(`public/${imageName}`);
    let savedImage = await ipfs.add(imageBuffer);
    let newNFT = {
        nftImgPath:  `https://ipfs.io/ipfs/${savedImage.path}`,
        nftName: req.body.nftName,
        nftDescription: req.body.nftDescription,
        nftProperties: req.body.nftDescription
    };

    let nft = new NFTModel(newNFT);
    await nft.save().
        then(savedUser => {
            res.send(savedUser._id.toString());
        });
    // res.send("641943ce2242b49cda964328");
})

export default router;