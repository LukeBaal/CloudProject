import React from 'react';
import UpdateProfile from './UpdateProfile';
import PermissionsContainer from '../permissions/PermissionsContainer';
import DeleteUser from './DeleteUser';

const Profile = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <UpdateProfile />
        <DeleteUser />
      </div>
      <div className="col-md-8">
        <PermissionsContainer />
      </div>
    </div>
  );
};

export default Profile;
