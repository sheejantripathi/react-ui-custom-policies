import '../style/Profile.css';

import jwtDecode from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import Blockies from 'react-blockies';
import axios from 'axios';



import { Auth } from './API/types';



interface Props {
	auth: Auth;
	onLoggedOut: () => void;
}

interface State {
	loading: boolean;
	user?: {
		_id: number;
		username: string;
	};
	username: string;
}

interface JwtDecoded {
	payload: {
		id: string;
		publicAddress: string;
	};
}

export const Profile = ({ auth, onLoggedOut }: Props): JSX.Element => {
	const [state, setState] = useState<State>({
		loading: false,
		user: undefined,
		username: '',
	});

    const backendUrl = 'http://localhost:3000';

	useEffect(() => {
		const { accessToken } = auth;
        const decodedToken = jwtDecode<JwtDecoded>(accessToken);

        const { id } = decodedToken.payload;

        

		axios(`${backendUrl}/api/v1/users/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((response) => response.data)
			.then((user) => setState({ ...state, user }))
			.catch(window.alert);
	}, []);

	const handleChange = ({
		target: { value },
	}: React.ChangeEvent<HTMLInputElement>) => {
		setState({ ...state, username: value });
	};

	const handleSubmit = () => {
		const { accessToken } = auth;
		const { user, username } = state;

		setState({ ...state, loading: true });

        console.log(user)

		if (!user) {
			window.alert(
				'The user id has not been fetched yet. Please try again in 5 seconds.'
			);
			return;
		}
        axios.put(`${backendUrl}/api/v1/users/${user._id}`, { username }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
            console.log(response.data)
          setState({ ...state, loading: false, user: response.data });
        })
        .catch((error) => {
          window.alert(error);
          setState({ ...state, loading: false });
        });
	};

	const { accessToken } = auth;

	const {
		payload: { publicAddress },
	} = jwtDecode<JwtDecoded>(accessToken);

	const { loading, user } = state;

	const username = user && user.username;

	return (
		<div className="Profile">
			<p>
				Logged in as <Blockies seed={publicAddress} />
			</p>
			<div>
				My username is {username ? <pre>{username}</pre> : 'not set.'}{' '}
				Your publicAddress is <pre>{publicAddress}</pre>
			</div>
			<div>
				<label htmlFor="username">Change username: </label>
				<input name="username" onChange={handleChange} />
				<button disabled={loading} onClick={handleSubmit}>
					Submit
				</button>
			</div>
            {/* <div> */}
            {/* <button onClick={onLoggedOut}></button> */}
			<p>
				<button onClick={onLoggedOut}>Logout</button>
			</p>
		</div>
	);
};
