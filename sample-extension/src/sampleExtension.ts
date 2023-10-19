import { Dayjs } from 'dayjs';

export interface Attribute {
    attribute: string;
    permissions: string;
    access_from?: Dayjs | null;
    access_to?: Dayjs | null;
  }
  
  export interface ContractDetails {
    attributes: Attribute[];
    access_from?: Dayjs | null;
    access_to?: Dayjs | null;
    email_filter?: string;
    location?: string;
  }
  
  export interface CustomPolicy {
    policy_version: string;
    assetId: string;
    data_sensitivity_level: 'public' | 'internal' | 'confidential' | 'classified';
    fileHash: string;
    contract_details: ContractDetails[];
    asset_owner: string; // Assuming this is the ObjectId as a string
  }
  
  