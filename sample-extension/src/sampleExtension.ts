import { Dayjs } from 'dayjs';

export interface Policy {
    group: string;
    permissions: string;
    access_from?: Dayjs | null;
    access_to?: Dayjs | null;
  }

  interface FileOption {
    id: string;
    name: string;
    IPFSHash: string;
  }
  
  
  export interface ContractDetails {
    policies: Policy[];
    access_from?: Dayjs | null;
    access_to?: Dayjs | null;
    email_filter?: string;
    location?: string;
    filesToBeAssociated?: FileOption[];
    organizations?: string[];
    countries?: string[];
  }
  
  export interface CustomPolicy {
    policy_version: string;
    assetId: string;
    data_sensitivity_level: 'public' | 'internal' | 'confidential' | 'classified';
    fileHash: string;
    contract_details: ContractDetails[];
    asset_owner: string; // Assuming this is the ObjectId as a string
  }
  
  