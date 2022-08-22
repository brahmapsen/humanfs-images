import React, { useState } from 'react';
import axios from 'axios';
import { useAccount, chain } from 'wagmi';
import { Form } from '@web3uikit/core';
import networkMapping from '../constants/networkMapping.json';
import { ethers } from 'ethers';
import healthDataABI from '../constants/HealthDataNFT.json';

//image https://ipfs.io/ipfs/QmeK4BXjQUTNka1pRTmWjURDEGVXC7E8uEB8xUsD2DGz2c
//url: 'ipfs://bafyreiegi5br4ppsyzwtqaecgq5nqtrp526dyyrvempfudenectfuvecx4/metadata.json'
//ipfs://bafyreidoza4mt3v2acd53ug2p2gnab4n3x4thwwkigqbrg4e7m5t4qm3xm/metadata.json

const CallAPI = function () {
  const [cid, setCid] = useState('');
  const { address } = useAccount();

  async function createNFT(data) {
    const _name = data.data[0].inputResult;
    const _description = data.data[1].inputResult;
    const _filePath = data.data[2].inputResult;
    const gender = data.data[3].inputResult;
    const vitalSigns = data.data[4].inputResult;
    console.log(
      `Args ${_name} ${_description}  ${_filePath} ${gender} ${vitalSigns}`
    );

    const attributes = {
      gender,
      vitalSigns,
      // date,maritalStatus,allergies,currentMedications,symptoms,
    };

    const params = {
      name: _name,
      description: _description,
      filePath: _filePath,
      attributes: attributes,
    };

    const ethereum = window.ethereum;
    let provider = new ethers.providers.Web3Provider(window.ethereum);

    let chainId = await ethereum.request({ method: 'eth_chainId' });
    let chainIdString = parseInt(chainId).toString();
    console.log('Address', address, 'ChainID', chainIdString);
    let nftContractAddress = networkMapping[chainIdString].HealthDataNFT[0];

    const signer = await provider.getSigner();

    const healthDataNFTContract = new ethers.Contract(
      nftContractAddress,
      healthDataABI,
      signer
    );

    const tokenURL = await updateNFT(params);
    console.log('TokenURL', tokenURL);

    console.log('Mint NFT Token');
    const tx = await healthDataNFTContract.mintNft(
      address,
      tokenURL
      // {
      // gasLimit: '100000',
      // }
    );
    await tx.wait(1);
    console.log(`Tx value ${JSON.stringify(tx)}`);

    const tokenId = await healthDataNFTContract.getTokenCounter();
    console.log('Token Id: ' + tokenId);
  }

  async function updateNFT(params) {
    console.log('updateNFT........');
    let _cid = '';
    await axios
      .post('/api/updateNFT', {
        params,
      })
      .then((res) => {
        _cid = res.data.url;
        console.log(_cid);
        setCid(_cid);
      })
      .catch((err) => console.log(err));
    console.log('done:', cid);
    return _cid;
  }

  return (
    <div>
      <Form
        onSubmit={createNFT}
        data={[
          {
            inputWidth: '25%',
            name: 'Name',
            type: 'text',
            value: 'John',
            key: 'name',
          },
          {
            inputWidth: '50%',
            name: 'Description',
            type: 'text',
            value: 'Health Data',
            key: 'description',
          },
          {
            inputWidth: '25%',
            name: 'ImageFile',
            type: 'text',
            value: 'images/vital-sign1.png',
            key: 'imageFile',
          },
          {
            inputWidth: '25%',
            name: 'Gender',
            type: 'text',
            value: 'Male',
            key: 'gender',
          },
          {
            inputWidth: '25%',
            name: 'VitalSigns',
            type: 'text',
            value: 'bp 80/120, pulse rate 15',
            key: 'vitalsigns',
          },
        ]}
        title="Create Health data NFT"
        id="createHealthDataNFT"
      ></Form>
    </div>
  );
};
export default CallAPI;
