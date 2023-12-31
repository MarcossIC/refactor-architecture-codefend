import React, { useEffect, useMemo, useState } from 'react';
import { CircleIcon } from '../../../../../components';
import {
	WebApplicationService,
	Webresources,
	generateIDArray,
} from '../../../../../../data';

export const WebApplicationLocation: React.FC<{
	webResources: Webresources[];
	isLoading: boolean;
}> = ({ webResources, isLoading }) => {
	const [resources, setResources] = useState([] as any);

	const getResources = () => (isLoading ? [] : webResources);

	const metrics = useMemo(
		() => WebApplicationService.getCountryMetrics(getResources()),
		[getResources()],
	);

	useEffect(() => {
		setResources(metrics);
	}, [setResources]);

	const resourcesKey = useMemo(
		() => generateIDArray(resources.length),
		[resources.length],
	);

	return (
		<div className="card table">
			<div className="header">
				<div className="title">
					<div className="icon">
						<CircleIcon />
					</div>
					<span>Supervised assets</span>
				</div>
				<div className="actions"></div>
			</div>
			<div className="columns-name">
				<div className="location">location</div>
				<div className="count">count</div>
				<div className="percent">percent</div>
			</div>
			<div className="rows">
				{resources.map((resource: any, index: number) => (
					<section key={resourcesKey[index]} className="item">
						<div className="location">
							<span
								className={`flag flag-${resource.countryCode.toLowerCase()}`}></span>
							{resource.country}
						</div>
						<div className="count">{resource.count}</div>
						<div className="percent">{resource.percentage}%</div>
					</section>
				))}
			</div>
		</div>
	);
};
