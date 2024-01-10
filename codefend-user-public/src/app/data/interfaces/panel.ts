import { ID, Monitoring, ResourceID, User } from '.';

export interface Company extends ID, Monitoring {
	name: string;
	web: string;
	country: string;
	size: string;
	market: string;
	countryCode: string;
	countryProvince: string;
	countryCity: string;
	address: string;

	ownerName: string;
	ownerLastname: string;
	ownerRole: string;
	ownerEmail: string;
	ownerPhone: string;
	profileMedia: string;
	orderSize: string;
}

export interface Resouce extends ResourceID, Monitoring {
	resourceDomain: string;
	resourceDomainDad: string;
	servers: string;
	mainServer: string;
	serverCountry: string;
	serverCountryCode: string;
	serverCountryProvince: string;
	serverCountryCity: string;
}

export interface Webresources extends Resouce {
	childs: Resouce[];
}

export interface CompanyResource {
	web: string | number;
	mobile: string | number;
	cloud: string | number;
	lan: string | number;
	source: string | number;
	social: string | number;
}
export interface IssuesShare {
	total: string | number;
	critical: string | number;
	elevated: string | number;
	medium: string | number;
	low: string | number;
}
export interface IssuesCondition {
	total: string | number;
	fixed: string | number;
	open: string | number;
}

export interface CompanyMember extends ResourceID, Monitoring {
	name: string;
	lastName: string;
	companyRole: string;
	email: string;
	phone: string;
	profileMedia: string;
	country: string;
	countryCode: string;
	countryProvince: string;
	countryCity: string;
}

export interface Issues extends ResourceID, Monitoring {
	resourceClass: string;
	resourceID: string;
	researcherID: string;
	researcherUsername: string;
	riskLevel: string;
	riskScore: string;
	name: string;
	condition: string;
	price: string;
	pricePaid: string;
}

export interface DashboardProps {
	company: Company;
	issues: Issues[];
	members: CompanyMember[];
	resources: CompanyResource;
	issuesShare: IssuesShare;
	issuesCondition: IssuesCondition;
}

export interface WebapplicationProps {
	company: Company;
	resources: Webresources[];
}

export interface MobileApp extends ResourceID, Monitoring {
	appOS: string;
	appName: string;
	appLink: string;
	appAppleSubheader: string;
	appDeveloper: string;
	appDesc: string;
	appRank: string;
	appReviews: string;
	appAndroidDownloads: string;
	appMedia: string;
}

export interface MobileUnique extends MobileApp {
	creds: {} | null;
	issues: Issues;
	issueShare: IssuesShare;
	issueCondition: IssuesCondition;
}

export interface MobileProps {
	error: string;
	available: MobileApp[];
}

export interface CloudApp extends ResourceID, Monitoring {
	appName: string;
	appDesc: string;
	cloudProvider: string;
	cloudFirstKey: string;
	cloudSecondKey: string;
	cloudThirdKey: string;
	appMedia: string;
}
export interface IssueClass {
	total: string;
	web: string;
	mobile: string;
	infra: string;
	source: string;
	social: string;
	research: string;
}

export interface AllIssues {
	issues: Issues[];
	issueClass: IssueClass;
	issueShare: IssuesShare;
	issueCondition: IssuesCondition;
}
