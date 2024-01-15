import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { MobileSelectedDetails } from '../..';
import { AppCard, EmptyScreenView, Show } from '../../../../../components';
import {
	MobileApp,
	generateIDArray,
	useSelectedMobile,
} from '../../../../../../data';
import SelectedMobile from '../selectedContext';

interface MobileApplicationProps {
	openModal: () => void;
	refresh: () => void;
	mobileInfo: MobileApp[];
	isLoading: boolean;
}

export const MobileApplication: React.FC<MobileApplicationProps> = ({
	openModal,
	refresh,
	mobileInfo,
	isLoading,
}) => {
	const {
		selectedMobileApp,
		setSelectedMobileApp,
		isCurrentMobileSelected,
		changeMobile,
		isNotNull,
	} = useSelectedMobile();

	const [update, dispath] = useState(false);
	const mobileKeys = useMemo(() => {
		return mobileInfo ? generateIDArray(mobileInfo.length) : [];
	}, [mobileInfo]);

	const selectMobile = (mobile: MobileApp) => {
		console.log('1  alo?');

		if (isNotNull() && isCurrentMobileSelected(mobile.id)) return;
		console.log('2   alo?');
		setSelectedMobileApp(mobile);
	};

	useEffect(() => {
		if (selectedMobileApp === null) {
			changeMobile(mobileInfo[0]);
		}
	}, [selectedMobileApp]);

	return (
		<SelectedMobile.Provider value={selectedMobileApp}>
			<Show
				when={mobileInfo && mobileInfo.length !== 0}
				fallback={
					<EmptyScreenView
						buttonText="Add Mobile"
						title={"There's no data to display here"}
						info={'Start by clicking on the button below'}
						event={() => {}}
					/>
				}>
				<>
					<section className="left">
						<div className="add-button">
							<button onClick={openModal} className="btn btn-primary">
								ADD MOBILE APP
							</button>
						</div>

						<div className="list">
							{mobileInfo?.map((mobile: MobileApp, i: number) => (
								<div
									key={mobileKeys[i]}
									className="app-info"
									onClick={(e: React.FormEvent) => {
										e.preventDefault();
										selectMobile(mobile);
									}}>
									<>
										<AppCard
											isActive={isCurrentMobileSelected(mobile.id)}
											onDone={(id: string) => {
												refresh();
												dispath(!update);
											}}
											type={'mobile'}
											id={mobile.id}
											appMedia={mobile.appMedia}
											appDesc={mobile.appDesc}
											appReviews={mobile.appReviews}
											appRank={mobile.appRank}
											appDeveloper={mobile.appDeveloper}
											name={mobile.appName}
										/>
									</>
								</div>
							))}
						</div>
					</section>

					<section className="right">
						<Show when={isNotNull()}>
							<MobileSelectedDetails />
						</Show>
					</section>
				</>
			</Show>
		</SelectedMobile.Provider>
	);
};