import React, { useEffect, useState } from 'react';
import { WebApplicationResources } from './components/WebApplicationResources';
import { WebApplicationLocation } from './components/WebApplicationLocation';
import { WebApplicationStatics } from './components/WebApplicationStatics';
import { WebApplicationCredentials } from './components/WebApplicationCredentials';
import { useWebapplication } from '../../../../../data';
import '../../../../styles/card.scss';
import '../../../../styles/table.scss';
import '../../../../styles/flag.scss';
import './webapplication.scss';

const WebApplicationView: React.FC = () => {
	const [showScreen, setShowScreen] = useState(false);
	const { webResources, isLoading, refetch } = useWebapplication();

	useEffect(() => {
		setTimeout(() => setShowScreen(true), 50);
	}, [showScreen]);

	return (
		<main className={`webapp ${showScreen ? 'actived' : ''}`}>
			<section className="left">
				<WebApplicationResources
					isLoading={isLoading}
					refetch={refetch}
					webResources={webResources.resources}
				/>
			</section>
			<section className="right">
				<WebApplicationLocation
					isLoading={isLoading}
					webResources={webResources.resources}
				/>

				<WebApplicationStatics
					webResources={webResources.resources}
					isLoading={isLoading}
				/>

				<WebApplicationCredentials />
			</section>
		</main>
	);
};

export default WebApplicationView;
