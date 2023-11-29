import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@galvanize-inc/jwtdown-for-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider baseUrl={process.env.REACT_APP_API_HOST}>
			<Provider store={store}>
				<App />
			</Provider>
		</AuthProvider>
	</React.StrictMode>
);
