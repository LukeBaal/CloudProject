import React, { useReducer, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import {
  reducer as PermissionsReducer,
  fetchPermissions,
  defaultState
} from '../../reducers/PermissionsReducer';

const Permissions = lazy(() => import('./Permissions'));

const PermissionsContainer = () => {
  const [{ permissions }, dispatch] = useReducer(
    PermissionsReducer,
    defaultState
  );

  useEffect(() => {
    fetchPermissions(dispatch);
  }, []);

  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h4 className="card-title">Permissions</h4>
          <Link className="btn btn-success" to="/permissions/add">
            <i className="fas fa-pencil-alt" />
            Add
          </Link>
        </div>
        <Suspense fallback={<h3>Loading...</h3>}>
          {permissions
            ? permissions.map(permissionsItem => (
                <Permissions
                  key={permissionsItem.pairKey}
                  permissions={permissionsItem}
                />
              ))
            : ''}
        </Suspense>
      </div>
    </div>
  );
};

export default PermissionsContainer;
