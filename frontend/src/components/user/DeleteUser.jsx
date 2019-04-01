import React, { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import useFormInput from '../../effects/useFormInput';
import axios from 'axios';

const DeleteUser = () => {
  const auth = useContext(AuthContext);
  const confirmInput = useFormInput('');

  const handleDeleteClick = async e => {
    if (confirmInput.value === 'DELETE') {
      // Change user permissions to be all false
      try {
        const userRes = await axios.get('/api/users/current');
        const { pairKeys } = userRes.data.user;

        const params = {};
        if (pairKeys.length >= 2) {
          params.where = {
            or: pairKeys.map(pairKey => ({ pairKey }))
          };
        } else if (pairKeys.length === 1) {
          params.where = {
            pairKey: pairKeys[0]
          };
        } else {
          params.where = {
            pairKey: ''
          };
        }

        const URLParams = encodeURIComponent(JSON.stringify(params));
        const res = await axios.get(
          `http://localhost:3000/api/permissions?filter=${URLParams}`
        );

        const permissions = res.data;
        await permissions.forEach(async permissionsItem => {
          const newPermissions = {
            ...permissionsItem,
            name: false,
            email: false,
            phone: false,
            address: false,
            age: false
          };
          console.log(newPermissions);
          await axios.put(
            `http://localhost:3000/api/permissions/${permissionsItem.pairKey}`,
            newPermissions
          );
        });

        // Delete user's account
        await axios.delete('/api/users');

        // Logout the user
        auth.logout();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="card mt-2">
      <div className="card-body">
        <button
          type="button"
          className="btn btn-block btn-danger"
          data-toggle="modal"
          data-target="#deleteModal"
        >
          Delete Account
        </button>

        <div
          className="modal fade"
          id="deleteModal"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Delete Account
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="alert alert-danger">
                  WARNING: This action CANNOT be undone. This will delete your
                  account FOREVER
                </div>
                <form>
                  <div className="form-group">
                    <label htmlFor="confirm">
                      Type 'DELETE' and click confirm to delete account
                    </label>
                    <input
                      type="text"
                      name="confirm"
                      id="confirm"
                      {...confirmInput}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                  onClick={handleDeleteClick}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;
