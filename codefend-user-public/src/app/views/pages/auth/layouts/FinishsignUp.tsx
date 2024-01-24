import React, { ChangeEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import { PrimaryButton } from '../../../components';
import { useAppSelector } from '../../../../data/redux/';
import { useAuthState, RegisterFinishParams } from '../../../../data';

const FinishSignUpLayout = () => {
	const loading = useAppSelector((state: any) => state.authState.loading);
	const { signUpFinish } = useAuthState();

	const [userState, setUserState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		isLoading: false,
	});

	const navigate = useNavigate();
	const { ref } = useParams();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserState((prevUserState) => ({
			...prevUserState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (userState.password !== userState.confirmPassword) {
			toast.error('Password does not match, Kindly check and try again !!!');
			return;
		}
		if (!userState.email.trim() || userState.email.length > 50) {
			toast.error('Invalid username');
			return;
		}

		if (!userState.password.trim() || userState.password.length > 50) {
			console.log({ pass: userState.password });
			toast.error('Invalid password');
			return;
		}

		const requestParams: RegisterFinishParams = {
			username: userState.email,
			password: userState.password,
			lead_reference_number: ref,
		};

		setUserState((prevState) => ({ ...prevState, isLoading: true }));

		signUpFinish(requestParams)
			.then((response: any) => {
				console.log(response);
				if (response?.data?.error && response.data.error != 0) {
					return toast.error(response.data.info);
				}

				/* 	if (response.status != 401) {
					return toast.error('An error has occurred...');
				}

				if (!response.data.session) {
					return toast.error('Invalid token response...');
				}

				if (!response.data.user) {
					return toast.error('Invalid user response...');
				} */

				toast.success('Successfully Added User...');

				return navigate('/auth/signin');
			})
			.finally(() => {
				setUserState((prevState) => ({
					...prevState,
					isLoading: false,
				}));
			});

		return null;
	};

	return (
		<>
			<section className="access log-component">
				<div className="container">
					<div className="forms">
						<div className="nav">
							<span className="active">
								<a href="#">finish registration</a>
							</span>
						</div>
						<form onSubmit={handleSubmit}>
							<div className="input-group">
								<input
									type="email"
									name="email"
									value={userState.email}
									onChange={handleChange}
									className="w-full"
									placeholder="Select Username"
									required
								/>
							</div>

							<div className="input-group">
								<input
									type="password"
									name="password"
									value={userState.password}
									onChange={handleChange}
									className="w-full"
									placeholder="Select Password"
									required
								/>
							</div>

							<div className="input-group">
								<input
									type="password"
									name="confirmPassword"
									value={userState.confirmPassword}
									onChange={handleChange}
									className="w-full"
									placeholder="Select Confirm Password"
									required
								/>
							</div>

							<div className="mt-6">
								<span className="text-sm text-alt3">
									I have read and accept the <u>Privacy Policy</u> and{' '}
									<u>Terms of Use.</u>
								</span>
							</div>
							<div
								className="mt-6"
								onClick={(e: React.FormEvent) => {
									e.preventDefault();
									e.stopPropagation();
								}}>
								<PrimaryButton
									text="Proceed"
									type="submit"
									isDisabled={loading}
									click={() => {}}
									className="flex items-center gap-x-2"
								/>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};

export default FinishSignUpLayout;
