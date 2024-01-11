import React, { useEffect, useState } from 'react';
import { IssueCreationPanel } from './components/IssueCreationPanel';
import './issues.scss';

const IssuesCreation: React.FC<{}> = () => {
	const [showScreen, setShowScreen] = useState(false);
	const [reShow, setReshow] = useState(false);

	useEffect(() => {
		setShowScreen(false);
		const timeoutId = setTimeout(() => {
			setShowScreen(true);
		}, 50);

		return () => clearTimeout(timeoutId);
	}, [reShow]);
	useEffect(() => {
		const script = document.createElement('script');
		script.src = '/public/editor/tinymce.min.js';
		script.async = true;
		document.body.appendChild(script);
		return () => {
			document.body.removeChild(script);
		};
	}, []);
	return (
		<main className={`issue-detail w-full ${showScreen ? 'actived' : ''}`}>
			<section className="issue">
				<IssueCreationPanel issues={[]} />
			</section>
			<section className="h-full flex-grow"></section>
		</main>
	);
};

export default IssuesCreation;
