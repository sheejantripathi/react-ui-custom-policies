import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactWidget } from '@jupyterlab/ui-components';
// import Web3 from 'web3';
// import { AbiItem } from 'web3-utils';

// const abi: AbiItem[] = [];


interface Contract {
  _id: string;
  name: string;
  attribute: string;
  childContractAddress: string;
  assetID: {
    fileName: string;
    fileType: string;
  };
}

interface SaveUserToContractMap {
    contractAddress: string;
    eoaAddress: string;
}

const ContractAssignmentComponent: React.FC = () => {
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [eoaAddress, setEoaAddress] = useState<string>('');
  const [contractInformation, setContractInformation] = useState<Contract[]>([]);

  const handleEoaAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEoaAddress(event.target.value);
  };

  const handleContractSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const selected = contractInformation.find((contract) => contract._id === selectedId);
    if (selected) {
      setSelectedContract(selected);
    }
  };

  const backendUrl = 'http://localhost:3000';
  const LS_KEY = 'login-with-metamask:auth';
  const ls = window.localStorage.getItem(LS_KEY);
  const auth = ls && JSON.parse(ls);

  useEffect(() => {
    const { accessToken } = auth;
    axios
      .get(`${backendUrl}/api/v1/transactions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data,  'response.data')
        setContractInformation(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contract information:', error);
        window.alert('Error fetching contract information');
      });
  }, []);

  const handleSaveButton = async (event: React.FormEvent) => {
    

    event.preventDefault();
  
    const formData = new FormData();
    const user_contract_details: SaveUserToContractMap = {
      contractAddress: selectedContract!.childContractAddress,
      eoaAddress: eoaAddress,
    }

    console.log(user_contract_details)
   

formData.append('user_contract_details', JSON.stringify(user_contract_details));

    // Sending a POST request to the backend server using Axios
      try {
        const response = await axios({
          method: "post",
          url: `${backendUrl}/api/v1/policies/add-user-to-contract`,
          data: formData,
          headers: { 
            Authorization: `Bearer ${auth.accessToken}`
          },
        });
        // notify('Policy Saved Successfully and Sma');
        return response.data;
      } catch(error) {
        console.log(error)
      }  
  };

  

  return (
    <div>
      <label htmlFor="eoaAddress">EOA Address:</label>
      <input type="text" id="eoaAddress" value={eoaAddress} onChange={handleEoaAddressChange} />

      <div>
        <h3>Select a Contract:</h3>
        <select onChange={handleContractSelect}>
          <option value="">Select a contract</option>
          {contractInformation.map((contract) => (
            <option key={contract._id} value={contract._id}>
              Attribute:{contract.attribute} - Notebook:{contract.assetID.fileName}.{contract.assetID.fileType}
            </option>
          ))}
        </select>
        <button onClick={handleSaveButton}>Save</button>
        <h3>Selected Contract Details:</h3>
        {selectedContract && (
          <div>
            Contract ID: {selectedContract._id}
            <br />
            Contract Name: {selectedContract.name}
            <br />
            Contract Attribute: {selectedContract.attribute}
          </div>
        )}
      </div>
    </div>
  );
};

export class UserAssignWrapper extends ReactWidget {
  constructor() {
    super();
    this.addClass('jp-react-widget');
  }

  render(): JSX.Element {
    return <ContractAssignmentComponent />;
  }
}
