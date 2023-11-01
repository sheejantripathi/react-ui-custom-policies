import { ReactWidget } from '@jupyterlab/ui-components';
import { Dayjs } from 'dayjs';
import React, { useState, useEffect } from 'react';
import FileSelect from "./components/select-wrapper";
import {
  TextField,
  Button,
  Grid,
  MenuItem
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import "../style/policies.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ContractDetails } from './sampleExtension';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  

import Dropzone from './components/asset-select';


const LS_KEY = 'login-with-metamask:auth';

const ls = window.localStorage.getItem(LS_KEY);
const auth = ls && JSON.parse(ls);

// Define the URL of your local backend server
const backendUrl = 'http://localhost:3000';

interface FileOption {
  id: string;
  name: string;
  IPFSHash: string;
}

interface Input {
  group: string;
  permissions: string;
  access_from: Dayjs | null;
  access_to: Dayjs | null;
  organizations: string[];
  countries: string[];
}


const SharingPolicyComponent: React.FC = () =>{
  //state management for selected file

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);


  const notify = (notify_value: string) => toast(notify_value);

  const handleFilesSelected = (files: File[]) => {
    setSelectedFiles(files);
  };
 
  const [selectedIPFSFiles, setSelectedIPFSFiles] = useState<FileOption[]>([]);
  const [userUploadedFiles, setUserUploadedFiles] = useState<FileOption[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  const loadUserUploadedFiles = async () => { 
    const { accessToken } = auth;
		axios(`${backendUrl}/api/v1/users/uploadedFiles`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => {
				const uploadedFiles = response.data
        let selectOptions = uploadedFiles.rows.map((file: any) => {
          return {id: file.id, name:file.metadata.name, IPFSHash: file.ipfs_pin_hash}
        })
        setUserUploadedFiles(selectOptions)
			})
			.catch(window.alert);
  };
  
  const [inputs, setInputs] = useState<Input[]>([{ group: '', permissions: '', access_from:null, access_to: null, organizations: [], countries: []}]);

  useEffect(() => {
		loadUserUploadedFiles()
	}, []);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((response) => {
        console.log(response.data);
        const countryList = response.data.map((country: any) => country.name.common);
        setCountries(countryList);
      })
    .catch(error => console.error(error));
	}, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const options = {
  //       method: 'GET',
  //       url: 'https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all',
  //       headers: {
  //         'X-RapidAPI-Key': 'e1f8b84723msh2a474ff53b5ba1bp17122fjsn2a4c2f209f30',
  //         'X-RapidAPI-Host': 'ajayakv-rest-countries-v1.p.rapidapi.com'
  //       }
  //     };

  //     try {
  //       const response = await axios.request(options);
  //       console.log(response.data);
  //       //     const countryList = response.data.map((country: any) => country.name.common);
  //   //     setCountries(countryList);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const handleInputChange = (
    index: number,
    value: string | Dayjs | null | string[],
    field: string
  ) => {
    const values = [...inputs];
    if (value !== null) {
      if (field === 'group' || field === 'permissions') {
        values[index][field] = value as string;
      } else if (field === 'access_from' || field === 'access_to') {
        values[index][field] = value as Dayjs;
      }
      else if (field === 'organizations' || field === 'countries') {
        values[index][field] = value as string[];
      }
      setInputs(values);
    }
  };
  
  const handleIPFSFileSelection = (selectedFiles: FileOption[]) => {
    setSelectedIPFSFiles(selectedFiles);
  };

  const handleAddInput = () => {
    setInputs([...inputs, { group: '', permissions: '', access_from:null, access_to: null, organizations: [], countries: []}]);
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
      policies: inputs,
      filesToBeAssociated: selectedIPFSFiles,
      location: JSON.stringify([{ latitude: '0.0', longitude: '0.0' }]),
    }

    formData.append('contract_details', JSON.stringify(contract_details));

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
  
  const handleIPFSUpload = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const formData = new FormData();
    
    // Append the file(s)
    selectedFiles.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });


 try {
        const response = await axios({
          method: "post",
          url: `${backendUrl}/api/v1/policies/asset-upload`,
          data: formData,
          headers: { 
            Authorization: `Bearer ${auth.accessToken}`,
            "Content-Type": "multipart/form-data" 
          },
        })
        if(response.data) {
          notify('Files uploaded to IPFS Successfully');
          loadUserUploadedFiles()
          return response.data;
        }        
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="contained" onClick={handleIPFSUpload}>Upload Files to IPFS</Button>
        </div>
        <div>
          <h3>Groups and Permissions:</h3>
          <button type="button" onClick={handleAddInput}>Add</button>
        </div>
        {inputs.map((input, index) => (
          <div key={index} style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input
                type="text"
                name="group"
                placeholder="Group Name"
                value={input.group}
                onChange={(event) => handleInputChange(index, event.target.value, 'group')}
                style={{ flex: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
              />
              <select
                name="permissions"
                value={input.permissions}
                onChange={(event) => handleInputChange(index, event.target.value, 'permissions')}
                style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginLeft: '10px' }}
              >
                <option value="">Select a permission</option>
                <option value="read_access">Read Access</option>
                <option value="edit_access">Edit Access</option>
                <option value="unlimited_access">Unlimited Access</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <Grid container spacing={3}>
			<Grid item xs={6}>
      <TextField
              select
              label="Organizations"
              fullWidth
              SelectProps={{
                multiple: true,
                value: input.organizations,
                onChange: (event) => {
                  handleInputChange(index, event.target.value as string[], 'organizations')
                },
                renderValue: (selected) => (selected as string[]).join(', '),
              }}
            >
          <MenuItem value="UVA">UVA</MenuItem>
          <MenuItem value="VU">VU</MenuItem>
          {/* Add more organizations */}
        </TextField>
			</Grid>
			
			<Grid item xs={6}>
            <Autocomplete
          multiple
              value={input.countries}
              onChange={(event, newValue) => {
                handleInputChange(index, newValue, 'countries')
                }}
              options={countries}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  variant="standard"
                />
              )}
            />
        </Grid>
            </Grid>
            </div>
           
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ flex: 1, marginRight: '10px' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Access From"
                    value={input.access_from}
                    onChange={(date) => handleInputChange(index, date ? date.toISOString() : '', 'access_from')}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ flex: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Access To"
                    value={input.access_to}
                    onChange={(date) => handleInputChange(index, date ? date.toISOString() : '', 'access_to')}
                  />
                </LocalizationProvider>
              </div>
              <div style={{ flex: 1 }}>
                <FileSelect
                  files={userUploadedFiles}
                  onSelect={handleIPFSFileSelection}
                />
              </div>
            </div>
            <button type="button" onClick={() => handleRemoveInput(index)} style={{ backgroundColor: '#ff0000', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', alignSelf: 'flex-end' }}>
              Remove
            </button>
            {(selectedIPFSFiles.length > 0 ) && (
              <div>
                <h2>Selected IPFS files:</h2>
                <ul>
                  {selectedIPFSFiles.map((file, index) => (
                    <li key={index}>
                      {file.name} - {file.IPFSHash}
                    </li>
                  ))}
                </ul>
            </div>
              )}
            
          </div>
        ))}
        <div style={{ alignItems: 'center' }}>
          <Button variant="contained" type="submit" >Save Policies</Button>
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

