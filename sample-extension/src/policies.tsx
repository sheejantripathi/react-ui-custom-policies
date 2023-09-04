import { ReactWidget } from '@jupyterlab/ui-components';
import React, { useState } from 'react';

import "../style/policies.css";
import RoleBasedSelection from './components/role-based-policies';
import LocationRestrictionForm from './components/location/LocationForm';
import PolicyVisualization from './components/policy-visualization';


import Dropzone from './components/asset-select';


// import axios from 'axios';

const SharingPolicyComponent: React.FC = () => {
  //state management for selected files
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  //state management for organization, role and permissions
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedPermission, setSelectedPermission] = useState<string>('');

  //state management for access days and email filter
  const [selectedAccessTime, setSelectedAccessTime] = useState<number>(0);
  const [selectedEmailFilter, setSelectedEmailFilter] = useState<string>('');

//   const [policyConstraints, setPolicyConstraints] = useState<PolicyConstraints>({
//     read: false,
//     write: false,
//     execute: false,
//   });

  // const [images, setImages] = useState<{ id: string; src: string }[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform any desired actions with selectedFiles and policyConstraints
    // console.log('Selected Files:', selectedFiles);
    // console.log('Policy Constraints:', policyConstraints);
  };

  return (
    <div className='scrollable-page'>
      <h2>Custom Policies Definition</h2>
      <form onSubmit={handleSubmit}>
      <h3>Select Research Assets:</h3>
        <Dropzone selectedFile={selectedFiles} setSelectedFile={setSelectedFiles}/>
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
        Access Days:
        <input type="number" name="Access days" value={selectedAccessTime} onChange={e => setSelectedAccessTime(parseInt(e.target.value))}/>
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
      <PolicyVisualization org={selectedOrg} role={selectedRole} permission={selectedPermission} access_days={selectedAccessTime} email_filter={selectedEmailFilter}/>
      <button type="submit">Define Policies</button>
      </form>
    </div>
  );
};

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

