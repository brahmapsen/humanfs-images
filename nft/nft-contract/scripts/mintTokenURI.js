const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")
const { NFTStorage, File } = require("nft.storage")
const mime = require("mime")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY

//fullImagesPath points to filepath with filename
// Attributes is JSON object {"property":"value"}
async function storeNFT(imagePath, name, description, attributes) {
  console.log("StoreNFT...........................")
  const fullImagePath = path.resolve(imagePath)
  const content = await fs.promises.readFile(fullImagePath)
  const type = mime.getType(fullImagePath)
  const fileName = path.basename(fullImagePath)
  const image = new File([content], fileName, { type })
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
  console.log("Call NFTStorage.store with await")

  const response = await nftstorage.store({
    name: name,
    description: `${description} ${fileName}`,
    image,
    attributes: JSON.stringify(attributes),
  })
  console.log(JSON.stringify(response))
  const url = `${response.url}`
  console.log("Response: " + url)
  return url
}

async function mintHealthDataNFT(imagePath, name, description, attributes) {
  const signer = (await ethers.getSigners())[0]

  const tokenURI = await storeNFT(imagePath, name, description, attributes)

  const healthDataNFT = await ethers.getContract("HealthDataNFT")
  console.log(`START Minting data NFT... for ${signer.address}`)
  const mintTx = await healthDataNFT.mintNft(signer.address, tokenURI)
  const mintTxReceipt = await mintTx.wait(4)
  console.log(
    `Minted tokenId ${mintTxReceipt.events[0].args.tokenId.toString()} from contract: ${
      healthDataNFT.address
    }`
  )
  //for local network, simulate block additions
  if (network.config.chainId == 31337) {
    await moveBlocks(2, (sleepAmount = 1000))
  }
}

mintHealthDataNFT(
  "../images/mental1.png",
  "Health NFT",
  "Health Vital Sign",
  '{"Blood Pressure": "60/120"}'
)
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
