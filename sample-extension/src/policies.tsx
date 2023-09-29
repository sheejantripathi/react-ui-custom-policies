import { ReactWidget } from '@jupyterlab/ui-components';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import {Button } from '@material-ui/core';
import "../style/policies.css";
import RoleBasedSelection from './components/role-based-policies';
import LocationRestrictionForm from './components/location/LocationForm';
import PolicyVisualization from './components/policy-visualization';
import DatePickerComponent from './components/date-picker';
import axios from 'axios';


import Dropzone from './components/asset-select';

// interface policies {
//   organization: string;
//   role: string;
//   permissions: string;
//   location: Array<{
//     latitude: string;
//     longitude: string;
//   }>;
//   // // access_from: Date | undefined;
//   access_from: Dayjs | null;

//   // // access_to: Date| undefined;
//   access_to: Dayjs | null;

//   email_filter: string;
// }
const SharingPolicyComponent: React.FC = () => {
  //state management for selected file
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };

  //state management for organization, role and permissions
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedPermission, setSelectedPermission] = useState<string>('');
  const [fromValue, setFromValue] = useState<Dayjs | null>(null);
  const [toValue, setToValue] = useState<Dayjs | null>(null);

  const handleFromValueChange = (value: Dayjs | null) => {
    // Handle 'from' value change in the parent component
    setFromValue(value)
  };

  const handleToValueChange = (value: Dayjs | null) => {
    // Handle 'to' value change in the parent component
    setToValue(value)
  };
  

  //state management for access days and email filter
  const [selectedEmailFilter, setSelectedEmailFilter] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    // Collecting data from the state or wherever it's stored
    // const collected_data: policies = {
    //   organization: selectedOrg,
    //   role: selectedRole,
    //   permissions: selectedPermission,
    //   location: [{ latitude: '0.0', longitude: '0.0' }],
    //   email_filter: selectedEmailFilter,
    //   access_from: fromValue,
    //   access_to: toValue
    // };
  
    const formData = new FormData();

// Append values to formData
formData.append('organization', selectedOrg);
formData.append('role', selectedRole);
formData.append('permissions', selectedPermission);
formData.append('email_filter', selectedEmailFilter);

// Append location as a JSON string
formData.append('location', JSON.stringify([{ latitude: '0.0', longitude: '0.0' }]));

// Convert Dayjs objects to string (assuming a suitable string representation for Dayjs)
if(fromValue!=null) formData.append('access_from', fromValue.toISOString());
if(toValue!=null) formData.append('access_to', toValue.toISOString());

// Append the file(s)
selectedFiles.forEach((file, index) => {
  formData.append(`file${index}`, file);
});

    // Define the URL of your local backend server
    const backendUrl = 'http://localhost:3000';
    // Sending a POST request to the backend server using Axios
      try {
        const response = await axios({
          method: "post",
          url: `${backendUrl}/api/v1/policies/add`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });

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
      <h3>Select Roles and Permissions:</h3>
      <RoleBasedSelection
        selectedOrg={selectedOrg}
        selectedRole={selectedRole}
        selectedPermission={selectedPermission}
        setSelectedOrg={setSelectedOrg}
        setSelectedRole={setSelectedRole}
        setSelectedPermission={setSelectedPermission}
      />
      <div>
      <h3>Access Valid days and Email filter:</h3>
      <label>
        Access Time:
        <DatePickerComponent
        onFromValueChange={handleFromValueChange}
        onToValueChange={handleToValueChange}
      />

      </label>
      <br/>
      <label>
        Email Filter:
        <input type="string" name="Email Domain" value={selectedEmailFilter} onChange={e => setSelectedEmailFilter(e.target.value)}/>
      </label>
      </div>
      <div>
      <LocationRestrictionForm/>
      </div>
      <PolicyVisualization org={selectedOrg} role={selectedRole} permission={selectedPermission} access_from={fromValue} access_to={toValue} email_filter={selectedEmailFilter}/>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
										<Button variant="contained" type="submit">
											Save Policies
										</Button>
									</div>
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

