import fs from 'fs';
import path from 'path';
import mime from 'mime';

const { NFTStorage, Blob, File } = require('nft.storage');
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;
//console.log('NFTStorageToken:', NFT_STORAGE_KEY);

module.exports = async (req, res) => {
  console.log('call save file in IPFS---');
  const { params } = req.body;
  const { attributes, name, description, filePath } = params; //req.query;
  console.log(
    ` attributes:${JSON.stringify(attributes)}
      name:${name} description ${description} file ${filePath}`
  );

  const content = fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  const fileName = path.basename(filePath);
  const image = new File([content], fileName, { type });

  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
  const response = await nftstorage.store({
    name: fileName,
    description: `${description} - ${fileName}`,
    image,
    attributes: JSON.stringify(attributes),
  });

  console.log('File uploaded using NFT.storage: ', response);

  try {
    res.send(response);
  } catch (error) {
    res.status(501);
    console.log('Error in updateNFT(): ', error);
  }
  res.end();
};
