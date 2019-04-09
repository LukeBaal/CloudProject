import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import axios from 'axios';

import CompanyPermissions from './CompanyPermissions';

const CompanyProfile = ({ companyId }) => {
	const auth = useContext(AuthContext);
	const [permissions, setPermissions] = useState([]);

	useEffect(() => {
		async function fetchData() {
			// Get Permissions for company
			const params = {
				where: {
					company: `resource:ca.uoit.consensusnetwork.Company#${companyId}`
				}
			};
			const URLParams = encodeURIComponent(JSON.stringify(params));
			const res = await axios.get(
				`http://localhost:3000/api/permissions?filter=${URLParams}`
			);

			setPermissions(res.data);
		}
		fetchData();
	}, [companyId]);

	return (
		<div className="card">
			<div className="card-body">
				<h3 className="card-title">{auth.company.name}</h3>
				<ul className="list-group">
					{permissions.length > 0 ? (
						permissions.map(permissionsItem => (
							<CompanyPermissions
								key={permissionsItem.pairKey}
								permissions={permissionsItem}
							/>
						))
					) : (
						<h5>No Entries</h5>
					)}
				</ul>
			</div>
		</div>
	);
};

export default CompanyProfile;
