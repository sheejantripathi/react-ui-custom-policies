import { ReactWidget } from '@jupyterlab/ui-components';
import React, { useState } from 'react';
import "../style/policies.css";

interface PolicyConstraints {
  read: boolean;
  write: boolean;
  execute: boolean;
}

const SharingPolicyComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [policyConstraints, setPolicyConstraints] = useState<PolicyConstraints>({
    read: false,
    write: false,
    execute: false,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(Array.from(files));
    }
  };

  const handlePolicyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setPolicyConstraints((prevConstraints) => ({
      ...prevConstraints,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Perform any desired actions with selectedFiles and policyConstraints
    console.log('Selected Files:', selectedFiles);
    console.log('Policy Constraints:', policyConstraints);
  };

  return (
    <div>
      <h2>Select Files and Define Sharing Policies</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Select Files:</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="read"
              checked={policyConstraints.read}
              onChange={handlePolicyChange}
            />
            Read Access
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="write"
              checked={policyConstraints.write}
              onChange={handlePolicyChange}
            />
            Write Access
          </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="execute"
              checked={policyConstraints.execute}
              onChange={handlePolicyChange}
            />
            Execute Access
          </label>
        </div>
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

