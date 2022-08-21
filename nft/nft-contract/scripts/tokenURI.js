const { ethers, network } = require("hardhat")

async function tokenURI(tokenIndex) {
  const healthDataNFT = await ethers.getContract("HealthDataNFT")
  console.log(`Get TokenURI at index ${tokenIndex} for NFT contract ${healthDataNFT.address} `)

  const tokenURI = await healthDataNFT.getTokenURI(tokenIndex)
  console.log(` TokenURI ${tokenURI} `)
}

tokenURI("32")
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
