import { useState } from 'react';
import axios from 'axios';

//image https://ipfs.io/ipfs/QmeK4BXjQUTNka1pRTmWjURDEGVXC7E8uEB8xUsD2DGz2c
//url: 'ipfs://bafyreiegi5br4ppsyzwtqaecgq5nqtrp526dyyrvempfudenectfuvecx4/metadata.json'

const callAPI = function () {
  const [gender, setGender] = useState('Male');
  const [uid, setUid] = useState('');

  const attributes = {
    gender,
    // date,maritalStatus,allergies,currentMedications,symptoms,vitalSigns,
  };

  const params = {
    name: 'John',
    description: 'Health Data',
    filePath: 'images/vital-sign1.png',
    attributes: attributes,
  };

  async function updateNFT() {
    console.log('updateNFT........');
    await axios
      .post('/api/updateNFT', {
        params,
      })
      .then((res) => {
        const _uid = res.data.ipnft;
        console.log(_uid);
        setUid(_uid);
      })
      .catch((err) => console.log(err));
    console.log('done:', uid);
  }

  return (
    <div>
      <button onClick={async () => updateNFT()}> Call API</button>
    </div>
  );
};
export default callAPI;
