const { ethers, network } = require("hardhat")
const { moveBlocks } = require("../utils/move-blocks")

async function mint(tokenURI, ownerAddress) {
  if (!tokenURI) {
    console.log("\n>Please provide a value for tokenURI")
    process.exit(1)
  }
  const signer = (await ethers.getSigners())[0]
  const healthDataNFT = await ethers.getContract("HealthDataNFT")
  console.log(`START Minting data NFT... for signer ${signer.address}`)

  if (!ownerAddress) {
    ownerAddress = signer.address
  }

  console.log("NFT Owner", ownerAddress)

  const mintTx = await healthDataNFT.mintNft(ownerAddress, tokenURI)
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

mint("", "")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
