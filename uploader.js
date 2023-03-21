import { create } from "ipfs-http-client";
import fs from "fs";

const auth =
'Basic ' + Buffer.from(process.env.PROJECT_ID + ':' + process.env.PROJECT_SECRET.toString('base64'));

// const imgPath = path.join(__dirname + '/public/1.jpg');

const imageBuffer = fs.readFileSync('public/1.jpg');

async function ipfsClient() {
    const ipfs = await create({
        host:"ipfs.infura.io",
        port:5001,
        protocol: "https",
        headers: {
            authorization: auth,
        },
    });
    return ipfs;
}
async function main() {
    let ipfs = await ipfsClient();

    let result = await ipfs.add(imageBuffer);
    console.log(result);
}

main()
