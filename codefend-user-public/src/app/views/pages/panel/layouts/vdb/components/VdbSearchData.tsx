import React, { useEffect, useMemo, useState } from 'react';
import { generateIDArray, useInitialVdb } from '../../../../../../data';
import { BugIcon, EnpIcon, PageLoader, Table } from '../../../../../components';

export const VdbSearchData: React.FC = () => {
	const { getVdb, refetch, isLoading, searchData, handleChange } =
		useInitialVdb();
	const [sortBy, setSortBy] = useState('');
	const [selectedNow, setSelectedNow] = useState(false);
	const safelyVdbData = () => (Array.isArray(getVdb()) ? getVdb() ?? [] : []);
	useEffect(() => {
		refetch();
	}, []);

	const vdbKeys = useMemo(() => generateIDArray(getVdb().length), [getVdb()]);

	const columns = new Set(['creacion', 'id', 'cve', 'title', 'score', 'risk']);
	return (
		<>
			<div className="search-bar">
				<div className="search-item">
					<form onSubmit={refetch} className="">
						<input
							type="text"
							value={searchData}
							onChange={handleChange}
							placeholder="Enter a program name (e.g. Mozilla Firefox)"
							className="text"
							required
						/>
						<button type="submit" className="btn btn-primary">
							<EnpIcon />
						</button>
					</form>
				</div>
			</div>
			{Boolean(safelyVdbData().length) && (
				<>
					{!isLoading ? (
						<>
							<div className="mx-3">
								<div className="header">
									<div className="title">
										<div className="icon">
											<BugIcon />
										</div>
										<span>Search vulnerabilities</span>
									</div>
									<select
										onChange={(e) => {
											console.log({ e });
											setSortBy(e.target.value);
											setSelectedNow(true);
										}}
										className="hidden md:inline bg-transparent ml-10">
										<option value="" selected disabled>
											Sort by
										</option>
										<option value="creacion">published</option>
										<option value="score">score</option>
										<option value="risk">risk</option>
										<option value="vdb id">vdb id</option>
									</select>
									<div className="actions"></div>
								</div>
								<Table
									data={getVdb()}
									columns={Array.from(columns)}></Table>
							</div>
						</>
					) : (
						<>
							<PageLoader />
						</>
					)}
				</>
			)}
			{!isLoading ? (
				<div className="content">
					{safelyVdbData().map((vuln: any, i: number) => (
						<div className="search-result" key={vdbKeys[i]}>
							<div className="header">
								<div className="title">{vuln.title}</div>
							</div>
						</div>
					))}
				</div>
			) : (
				<>
					<PageLoader />
				</>
			)}
		</>
	);
};