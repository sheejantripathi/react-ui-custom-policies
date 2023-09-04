import React from 'react';

interface PolicyVisualizationProps {
    org: string;
    role: string;
    permission: string;
    access_days: number;
    email_filter: string;
  }
  
  

const PolicyVisualization: React.FC<PolicyVisualizationProps> = ({org, role, permission, access_days,email_filter}) => {
    return (
        <div>
        <h2>Mapping Visualizer</h2>
        <p><b>Selected File:</b> {org}</p>
        <p><b>Selected Organization:</b> {org}</p>
        <p><b>Selected Role:</b>{role}</p>
        <p><b>Selected Permission:</b> {permission}</p>
        <p><b>Total Access days:</b> {access_days}</p>
        <p><b>Email-domain:</b> {email_filter}</p>


        {/* <p><b>Selected Location:</b> {selectedLocation}</p> */}
      </div>
    )

}

export default PolicyVisualization;