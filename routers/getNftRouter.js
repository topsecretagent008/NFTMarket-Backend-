import express from "express";
import NFTModel from '../model/nftModel.js';

const router = express.Router();

router.get("/:id", (req, res) => {
    const nftID = req.params.id;
    NFTModel.findById(nftID)
        .then((nft) => {
            res.send(nft);
        })
        .catch((err) => {
            console.log(err);
        })
})

router.post("/mint/:id", async (req, res) => {
    const nftID = req.params.id;
    await NFTModel.updateOne({ _id: nftID }, { nftRoyalty: req.body.nftRoyalty });
})

router.post("/price/:id", async (req, res) => {
    const nftID = req.params.id;
    await NFTModel.updateOne({ _id: nftID }, { nftPrice: req.body.nftPrice });

})
export default router;