import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.css";

interface RoleMap {
  [org: string]: string[];
}

interface PermissionMap {
  [role: string]: string[];
}

const organizations: string[] = ['Org1', 'Org2', 'Org3'];
const roles: RoleMap = {
  Org1: ['Role1', 'Role2'],
  Org2: ['Role3', 'Role4'],
  Org3: ['Role5', 'Role6'],
};
const permissions: PermissionMap = {
  Role1: ['Permission1', 'Permission2'],
  Role2: ['Permission3', 'Permission4'],
  Role3: ['Permission5', 'Permission6'],
  Role4: ['Permission7', 'Permission8'],
  Role5: ['Permission9', 'Permission10'],
  Role6: ['Permission11', 'Permission12'],
};

const RoleBasedSelection: React.FC = () => {
  const [selectedOrg, setSelectedOrg] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [selectedPermission, setSelectedPermission] = useState<string>('');


  return (
    // <div className="container">
    //   <div className="mt-5 m-auto w-50">
    //   <Select value={selectedOrg} onChange={e => setSelectedOrg(e || '')} autoFocus={true} />
    //       <option value="">Select Organization</option>
    //       {organizations.map(org => (
    //         <option key={org} value={org}>
    //           {org}
    //         </option>
    //       ))}
    //   </div>
    // </div>
    <div>
      <div>
      <div className="container">
      <div className="mt-5 m-auto w-50">
        <select value={selectedOrg} onChange={e => setSelectedOrg(e.target.value)}>
          <option value="">Select Organization</option>
          {organizations.map(org => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
        
        <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)}>
          <option value="">Select Role</option>
          {selectedOrg && roles[selectedOrg].map(role => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
        <select value={selectedPermission} onChange={e => setSelectedPermission(e.target.value)}>
          <option value="">Select Permission</option>
          {selectedRole && permissions[selectedRole].map(permission => (
            <option key={permission} value={permission}>
              {permission}
            </option>
          ))}
        </select>
        </div>
        </div>
      </div>
      <div>
        <h2>Mapping Visualizer</h2>
        <p><b>Selected Organization:</b> {selectedOrg}</p>
        <p><b>Selected Role:</b>{selectedRole}</p>
        <p><b>Selected Permission:</b> {selectedPermission}</p>
      </div>
    </div>
  );
};

export default RoleBasedSelection;
