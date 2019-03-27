import React, {
  useReducer,
  useContext,
  useEffect,
  lazy,
  Suspense
} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  reducer as PermissionsReducer,
  setPermissions,
  defaultState
} from '../../reducers/PermissionsReducer';
import AuthContext from '../../contexts/AuthContext';

const Permissions = lazy(() => import('./Permissions'));

const PermissionsContainer = () => {
  const [{ permissions }, dispatch] = useReducer(
    PermissionsReducer,
    defaultState
  );
  const auth = useContext(AuthContext);

  useEffect(() => {
    async function fetchPermissions() {
      const params = {
        include: 'resolve'
      };

      if (auth.user.pairKeys.length >= 2) {
        params.where = {
          or: auth.user.pairKeys.map(pairKey => ({ pairKey }))
        };
      } else if (auth.user.pairKeys.length === 1) {
        params.where = {
          pairKey: auth.user.pairKeys[0]
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
      let permissions = res.data;

      dispatch(setPermissions(permissions));
    }
    fetchPermissions();
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
