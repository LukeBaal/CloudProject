import React, { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
// import CompanyProfile from './CompanyProfile';
const CompanyProfile = lazy(() => import('./CompanyProfile'));

const CompanyProfileContainer = () => {
	const [hasInfo, setHasInfo] = useState(null);
	const [companyId, setCompanyId] = useState(null);
	const auth = useContext(AuthContext);

	useEffect(() => {
		const params = {
			where: {
				name: auth.company.name
			}
		};
		const URLParams = encodeURIComponent(JSON.stringify(params));
		axios
			.get(`http://localhost:3000/api/company?filter=${URLParams}`)
			.then(res => {
				if (res.data[0]) {
					setHasInfo(true);
					setCompanyId(res.data[0].companyId);
				} else {
					setHasInfo(false);
				}
			});
	}, []);

	return (
		<div className="card">
			<div className="card-body">
				<Suspense fallback={<h3>Loading...</h3>}>
					{hasInfo !== null && hasInfo ? (
						<CompanyProfile companyId={companyId} />
					) : hasInfo !== null && !hasInfo ? (
						<Redirect to="/company/profile/add" />
					) : (
						<h3>Loading...</h3>
					)}
				</Suspense>
			</div>
		</div>
	);
};

export default CompanyProfileContainer;
