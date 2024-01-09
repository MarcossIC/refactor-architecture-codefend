import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthServices from '../../services/auth.service';
import { RegResponse, RegistrationData } from '../..';



export const loginThunk = createAsyncThunk<
	LoginResponse,
	LoginParams,
	{ rejectValue: string }
>('auth/login', async (loginParams: LoginParams, { rejectWithValue }) => {
	try {
		const { user, token, response, message } =
			await AuthServices.login(loginParams);

		if (response !== 'success') throw new Error(message);

		return { user, token, response };
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});

export const registerThunk = createAsyncThunk<
	RegResponse,
	RegisterParams,
	{ rejectValue: string }
>(
	'auth/register',
	async (registroParams: RegisterParams, { rejectWithValue }) => {
		try {
			const response = await AuthServices.register(registroParams);
			// Realiza una conversión explícita del tipo AxiosResponse al tipo RegisterResponse
			const registerResponse: RegResponse = response.data;
			return registerResponse;
		} catch (error) {
			return rejectWithValue(error as string);
		}
	},
);

export const registerFinishThunk = createAsyncThunk<
	RegistrationData,
	RegisterParams, 
	{ rejectValue: string } 
>('auth/finish', async (finishParams: RegisterParams, { rejectWithValue }) => {
	try {
		const response = await AuthServices.registerFinish(finishParams);
		const finishResponse: RegistrationData = response.data;
		return finishResponse;
	} catch (error) {
		return rejectWithValue(error as string);
	}
});
