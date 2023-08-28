import { ReactWidget } from '@jupyterlab/ui-components';
// import React, { useEffect, useState, useCallback } from 'react';
import React, { useEffect } from 'react';

import "../style/policies.css";
// import ReusableDropdown from "./components/select-dropdown";
// import RoleBased from './components/role-based-v2';
import RoleBasedSelection from './components/role-based-policies';

// import GeolocationRangeInput from "./components/geo-location";
import Dropzone from './components/asset-select';


import axios from 'axios';

// interface PolicyConstraints {
//   read: boolean;
//   write: boolean;
//   execute: boolean;
// }

const SharingPolicyComponent: React.FC = () => {
//   const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
useEffect(() => {
    const fetchData = async () => {
      try {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
       console.log('@@@@@@@@@@@',persons);
      })
        
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  });
//   const [policyConstraints, setPolicyConstraints] = useState<PolicyConstraints>({
//     read: false,
//     write: false,
//     execute: false,
//   });


  // const handleRangeSave = (range: any) => {
  //   // Implement your logic to save the range here
  //   console.log("Range saved:", range);
  // };
 
  // const [images, setImages] = useState<{ id: string; src: string }[]>([]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform any desired actions with selectedFiles and policyConstraints
    // console.log('Selected Files:', selectedFiles);
    // console.log('Policy Constraints:', policyConstraints);
  };

  return (
    <div className='scrollable-page'>
      <h2>Select Research Assets and Define Sharing Policies</h2>
      <form onSubmit={handleSubmit}>
      <h3>Select Research Assets:</h3>
        <Dropzone />
      <h3>Select Roles and Permissions:</h3>
      <RoleBasedSelection/>

        {/* <div>
          <label>Geo-location:</label>
          <GeolocationRangeInput onSave={handleRangeSave}/>
        </div> */}
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

