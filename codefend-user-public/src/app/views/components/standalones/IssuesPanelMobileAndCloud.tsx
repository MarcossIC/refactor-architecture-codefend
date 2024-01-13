import React, { Fragment, useCallback, useMemo } from 'react';
import { BugIcon, EmptyCard, PageLoader } from '..';
import { useNavigate } from 'react-router';
import { Issues, generateIDArray } from '../../../data';
import '../../styles/table.scss';

interface Props {
	isLoading: boolean;
	issues: Issues[] | Issues;
	refetch?: () => void;
}

export const IssuesPanelMobileAndCloud: React.FC<Props> = (props) => {
	const navigate = useNavigate();

	const formatIssues = useMemo(() => {
		if (!Array.isArray(props.issues)) return [props.issues] as Issues[];

		return props.issues as Issues[];
	}, [props.issues]);

	const isValidRiskScore = useCallback(
		(riskScore: any) => {
			return riskScore && !isNaN(parseInt(riskScore));
		},
		[props.issues],
	);

	const generateVulnerabilityArray = useCallback(
		(riskScore: any) =>
			isValidRiskScore(riskScore)
				? generateIDArray(parseInt(riskScore))
				: [],
		[isValidRiskScore],
	);

	const generateLimitedArray = useCallback(
		(riskScore: any) =>
			isValidRiskScore(riskScore)
				? [...generateIDArray(Math.max(0, 5 - riskScore))]
				: [...generateIDArray(5)],
		[isValidRiskScore],
	);

	const issuesKeys = useMemo(
		() =>
			formatIssues.length !== 0 ? generateIDArray(formatIssues.length) : [],
		[formatIssues],
	);

	console.log({ formatIssue: formatIssues[0] });

	return (
		<>
			<div className="header">
				<div className="title">
					<div className="icon">
						<BugIcon />
					</div>
					<span>resource related vulnerabilities & records</span>
				</div>
				<div className="actions"></div>
			</div>

			<div className="columns-name">
				<div
					className="date codefend-text-red "
					style={{ textDecoration: 'underline' }}>
					published
				</div>
				<div className="username">author</div>
				<div className="vul-class">class</div>
				<div className="vul-risk">risk</div>
				<div className="vul-score">score</div>
				<div className="vul-title">issue title</div>
			</div>

			{!props.isLoading ? (
				<div className="rows">
					{formatIssues.map((vulnerability: Issues, index: number) => (
						<Fragment key={issuesKeys[index]}>
							<div
								className="item"
								onClick={(e: React.FormEvent) => {
									navigate(
										`/issues/${vulnerability.id}_${vulnerability.name}_${vulnerability.riskLevel}`,
									);
									e.preventDefault();
									e.stopPropagation();
								}}>
								<div className="date">{vulnerability.createdAt}</div>
								<div className="username">
									{vulnerability.researcherUsername}
								</div>
								<div className="vul-class">
									{vulnerability.resourceClass}
								</div>
								<div className="vul-risk">
									{vulnerability.riskLevel}
								</div>
								<div className="vul-score flex no-border-bottom">
									<span className="risk-score">
										{vulnerability.riskScore}
									</span>
									<span className="space"></span>
									{generateVulnerabilityArray(
										vulnerability.riskScore,
									).map((value) => (
										<Fragment key={value}>
											<span className="red-border codefend-bg-red risk-score-helper"></span>
										</Fragment>
									))}
									{generateLimitedArray(vulnerability.riskScore).map(
										(value) => (
											<Fragment key={value}>
												<span className="codefend-border-red risk-score-helper"></span>
											</Fragment>
										),
									)}
								</div>
								<div className="vul-title">{vulnerability.name}</div>
							</div>
						</Fragment>
					))}
				</div>
			) : (
				<>
					<PageLoader />
				</>
			)}

			{(!props.isLoading && formatIssues.length === 0) ?? (
				<>
					<EmptyCard />
				</>
			)}
		</>
	);
};