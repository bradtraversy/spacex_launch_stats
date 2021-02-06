import React, { Component, Fragment, useEffect, useState } from 'react';
import gql from 'graphql-tag';
import { Query, useQuery } from 'react-apollo';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';

const LAUNCHES_QUERY = gql`
	query LaunchesQuery {
		launches {
			flight_number
			mission_name
			launch_date_local
			launch_success
		}
	}
`;

function Launches() {
	const { loading, error, data } = useQuery(LAUNCHES_QUERY);
	const [launchItems, setLaunchItems] = useState([]);
	const [launchItemsOrder, setLaunchItemsOrder] = useState('desc');

	if (loading) return <h1 className="display-4 my-3">Loading...</h1>;
	if (error) console.log(error);

	if (data && launchItems.length === 0) {
		setLaunchItems(data.launches);
	}

	function updateItemsOrder() {
		setLaunchItems(launchItems.reverse());
		setLaunchItemsOrder(prevLaunchItemsOrder =>
			prevLaunchItemsOrder === 'asc' ? 'desc' : 'asc'
		);
	}

	return (
		<Fragment>
			<h1 className="display-4 my-3">Launches</h1>
			<MissionKey />
			<button className="btn btn-secondary mb-4" onClick={updateItemsOrder}>
				<strong>Order by date: </strong>
				{launchItemsOrder === 'asc' ? 'Ascending' : 'Descending'}
			</button>
			<Fragment>
				{launchItems.map(launch => (
					<LaunchItem key={launch.flight_number} launch={launch} />
				))}
			</Fragment>
		</Fragment>
	);
}
export default Launches;
