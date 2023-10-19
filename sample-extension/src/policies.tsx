import { ReactWidget } from '@jupyterlab/ui-components';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import {Button } from '@material-ui/core';
import "../style/policies.css";
// import RoleBasedSelection from './components/role-based-policies';
// import LocationRestrictionForm from './components/location/LocationForm';
// import PolicyVisualization from './components/policy-visualization';
// import DatePickerComponent from './components/date-picker';
import LocationComponent from './components/location';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ContractDetails } from './sampleExtension';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

import Dropzone from './components/asset-select';

const SharingPolicyComponent: React.FC = () =>{
  //state management for selected file
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const notify = (notify_value: string) => toast(notify_value);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };
  interface Input {
    attribute: string;
    permissions: string;
    access_from: Dayjs | null;
    access_to: Dayjs | null;
  }

  //state management for organization, role and permissions
  // const [selectedOrg, setSelectedOrg] = useState<string>('');
  // const [selectedRole, setSelectedRole] = useState<string>('');
  // const [selectedPermission, setSelectedPermission] = useState<string>('');
  // const [fromValue, setFromValue] = useState<Dayjs | null>(null);
  // const [toValue, setToValue] = useState<Dayjs | null>(null);
  const [inputs, setInputs] = useState<Input[]>([{ attribute: '', permissions: '', access_from:null, access_to: null}]);

  const handleInputChange = (
    index: number,
    value: string | Dayjs | null,
    field: string
  ) => {
    const values = [...inputs];
    if (value !== null) {
      if (field === 'attribute' || field === 'permissions') {
        values[index][field] = value as string;
      } else if (field === 'access_from' || field === 'access_to') {
        values[index][field] = value as Dayjs;
      }
      setInputs(values);
    }
  };
  

  const handleAddInput = () => {
    setInputs([...inputs, { attribute: '', permissions: '', access_from:null, access_to: null}]);
  };

  const handleRemoveInput = (index: number) => {
    const values = [...inputs];
    if(values) {
      values.splice(index, 1);
      setInputs(values);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    

    event.preventDefault();
  
    const formData = new FormData();
    const contract_details: ContractDetails = {
      // role: selectedRole,
      attributes: inputs,
      // organization: selectedOrg,
      // permissions: selectedPermission,
      location: JSON.stringify([{ latitude: '0.0', longitude: '0.0' }]),
    }

    console.log(contract_details)
   
// Append the file(s)
selectedFiles.forEach((file, index) => {
  formData.append(`file${index}`, file);
});

formData.append('contract_details', JSON.stringify(contract_details));

const LS_KEY = 'login-with-metamask:auth';

const ls = window.localStorage.getItem(LS_KEY);
const auth = ls && JSON.parse(ls);

    // Define the URL of your local backend server
    const backendUrl = 'http://localhost:3000';
    // Sending a POST request to the backend server using Axios
      try {
        const response = await axios({
          method: "post",
          url: `${backendUrl}/api/v1/policies/add`,
          data: formData,
          headers: { 
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "multipart/form-data" 
          },
        });
        notify('Policy Saved Successfully and Sma');
        return response.data;
      } catch(error) {
        console.log(error)
      }  
  };
  

  return (
    <div className='scrollable-page'>
      <h2>Custom Policies Definition</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
      <h3>Select Research Assets:</h3>
        <Dropzone onFilesSelected={handleFilesSelected} />
        
      {/* {inputs.map((input, index) => (
        <div style={{ display: 'flex', gap: '10px',padding: '20px' }} key={index}>
          <input
            type="text"
            name="address"
            placeholder="User Address"
            value={input.address}
            onChange={(event) => handleInputChange(index, event.target.value, 'address')}
          />
          <select
            name="permissions"
            value={input.permissions}
            onChange={(event) => handleInputChange(index, event.target.value, 'permissions')}
          >
            <option value="">Select a permission</option>
            <option value="read_access">Read Access</option>
            <option value="edit_access">Edit Access</option>
            <option value="unlimited_access">Unlimited Access</option>
          </select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker value={input.access_from} onChange={(date) => handleInputChange(index, date?date.toISOString():'', 'access_from')}/>
        <DatePicker value={input.access_to} onChange={(date) => handleInputChange(index, date?date.toISOString():'', 'access_to')}/>
        </LocalizationProvider>
          <button type="button" onClick={() => handleRemoveInput(index)}>
            Remove
          </button>
        </div>
      ))} */}
  
      <div>
          <h3>Attributes and Permissions:</h3>
          <button type="button" onClick={handleAddInput}>Add</button>
      </div>
      {inputs.map((input, index) => (
        <div style={{ display: 'flex', gap: '10px',padding: '20px' }} key={index}>
            <input
            type="text"
            name="attribute"
            placeholder="Attribute Name"
            value={input.attribute}
            onChange={(event) => handleInputChange(index, event.target.value, 'attribute')}
          />
      <select
            name="permissions"
            value={input.permissions}
            onChange={(event) => handleInputChange(index, event.target.value, 'permissions')}
          >
            <option value="">Select a permission</option>
            <option value="read_access">Read Access</option>
            <option value="edit_access">Edit Access</option>
            <option value="unlimited_access">Unlimited Access</option>
      </select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker label="Access From" value={input.access_from} onChange={(date) => handleInputChange(index, date?date.toISOString():'', 'access_from')}/>
        <DatePicker label="Access To" value={input.access_to} onChange={(date) => handleInputChange(index, date?date.toISOString():'', 'access_to')}/>
        </LocalizationProvider>
          <button type="button" onClick={() => handleRemoveInput(index)}>
            Remove
          </button>
        </div>
      ))}
      <div>
      <label>
        Location
      </label>
      <LocationComponent />
      </div>
      <div >
				<Button variant="contained" type="submit">Save Policies</Button>
			</div>
      {/* <PolicyVisualization org={selectedOrg} role={selectedRole} permission={selectedPermission} access_from={fromValue} access_to={toValue}/> */}
    
      </form>
    </div>
  );
};

// export default SharingPolicyComponent;

export class SharingPolicyForm extends ReactWidget {
    /**
     * Constructs a new CounterWidget.
     */
    constructor() {
      super();
      this.addClass('jp-react-widget');
    }
  
    render(): JSX.Element {
      return <SharingPolicyComponent />;
    }
  }

