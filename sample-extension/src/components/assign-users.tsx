import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactWidget } from '@jupyterlab/ui-components';
import ContractVisualization from './contract-visualization';

interface Contract {
  _id: string;
  name: string;
  group: string;
  childContractAddress: string;
  policyId: {
  assetId: {
      fileName: string;
      fileType: string;
    }
  }
};

interface ContractDetails {
  groupName: string;
  permissions: string;
  accessFrom: number;
  accessTo: number;
  countries: string[];
  organizations: string[];
  contractAddress: string;
}

interface SaveUserToContractMap {
    contractAddress: string;
    eoaAddresses: string[];
    groupName: string;
}

const ContractAssignmentComponent: React.FC = () => {
    const backendUrl = 'http://localhost:3000';
    const LS_KEY = 'login-with-metamask:auth';
    const ls = window.localStorage.getItem(LS_KEY);
    const auth = ls && JSON.parse(ls);
    const { accessToken } = auth;

    const [selectedContract, setSelectedContract] = useState<ContractDetails>();
    // const [myObject, setMyObject] = useState<{ [key: string]: any }>({});
    const [eoaAddress, setEoaAddress] = useState<string>('');
    const [eoaAddresses, setEoaAddresses] = useState<string[]>([]); // State to store multiple EOA addresses
    const [contractInformation, setContractInformation] = useState<Contract[]>([]);


  const handleEoaAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEoaAddress(event.target.value);
  };

  //handle the addtion of multiple EOA addresses
  const handleAddUser = () => {
    const trimmedAddress = eoaAddress.trim();
    if (trimmedAddress !== '' && !eoaAddresses.includes(trimmedAddress)) {
      setEoaAddresses([...eoaAddresses, trimmedAddress]);
      setEoaAddress('');
    }
  };

  const handleContractSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {

    const selectedContract = event.target.value;
    axios
    .get(`${backendUrl}/api/v1/policies/get-contract-details?childContractAddress=${selectedContract}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      console.log(response.data, 'response data of the selected contract')
      setSelectedContract(response.data);
    })
    .catch((error) => {
      console.error('Error fetching contract information:', error);
      window.alert('Error fetching contract information');
    });
    // const selected = contractInformation.find((contract) => contract.childContractAddress === selectedContract);
    // if (selected) {
    //   setSelectedContract(selected);
    // }
    // else{
    //   setSelectedContract(null);
    // }
  };

  const handleRemoveUser = (index: number) => {
    const updatedAddresses = [...eoaAddresses];
    updatedAddresses.splice(index, 1);
    setEoaAddresses(updatedAddresses);
  };

 

  useEffect(() => {
   
    axios
      .get(`${backendUrl}/api/v1/transactions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response.data, 'response data check')
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
      contractAddress: selectedContract!.contractAddress,
      eoaAddresses: eoaAddresses,
      groupName: selectedContract!.groupName
    }

formData.append('user_contract_details', JSON.stringify(user_contract_details));
    // Sending a POST request to the backend server using Axios
      try {
        const response = await axios({
          method: "post",
          url: `${backendUrl}/api/v1/policies/add-users-to-group`,
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
      <button onClick={handleAddUser}>Add User</button>

      {(eoaAddresses.length > 0) && (
        <div>
          <h3>Selected Users:</h3>
          <ul>
            {eoaAddresses.map((address, index) => (
              <li key={index}>
                {address} <button onClick={() => handleRemoveUser(index)}>Remove</button>
              </li>
            ))}
          </ul>
      </div>
      )}
      
      <div>
        <h3>Select a Contract:</h3>
        <select onChange={ handleContractSelect}>
          <option value="">Select a contract</option>
          {contractInformation.map((contract) => (
            <option key={contract._id} value={contract.childContractAddress}>
              Group:{contract.group} - Address:{contract.childContractAddress}
            </option>
          ))}
        </select>
        <button onClick={handleSaveButton}>Save</button>
          {selectedContract &&(
            <ContractVisualization selectedContract={selectedContract} />  
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
