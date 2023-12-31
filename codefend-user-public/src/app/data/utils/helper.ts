import { User } from "..";


/** Gets token in localStorage */
export const getToken = () => localStorage.getItem('token') ?? '';

/** Set token in localStorage */
export const setToken = (token: string) =>
	window.localStorage.setItem('token', token);

/** persist user data in localStorage */
export const persistUser = (userData: User) =>
	window.localStorage.setItem('user', JSON.stringify(userData));

/** persist user data in localStorage */
export const getUser = (): User | null => {
	const userData = window.localStorage.getItem('user');
	if (userData !== null) return JSON.parse(userData);
	return userData;
};

/** set token and user data for Auth */
export const setAuth = (token: string, user: User) => {
	if (!(token && user)) return;
	setToken(token);
	persistUser(user);
};

/** clear token and user data for Auth */
export const clearAuth = () => {
	window.localStorage.removeItem('token');
	window.localStorage.removeItem('user');
};

/** Date formatter */
export const formatDate = (stringDate: string): string => {
	const date = new Date(stringDate);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

/** calculate percentage  */
export const renderPercentage = (value: string, total: string) => {
	if (value === '0') {
		return '0%';
	}
	let percentValue =
		((parseInt(value) / parseInt(total)) * 100).toFixed() + '%';

	return percentValue;
};

/** check if  data is empty/zeros */
export const isEmptyData = (data: any) => {
	if (data.constructor !== Object) return true;

	return Object.values(data).every(
		(item) => Boolean(item) == false || item == 0,
	);
};

/* Funcion para generar UUID Ramdom */
export const generateID = () => crypto.randomUUID();

/**
 * Genera un Array de ID's ramdoms segun una cuenta
 *
 * @param {number} count - La cantidad de IDs que se deben generar.
 * @returns {Array<string>} - Un array de de ID.
 */
export const generateIDArray = (count: number): string[] => {
	return Array.from({ length: count }, () => {
		return generateID();
	});
};
