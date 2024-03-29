import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
  } from "react-router-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import Login from './layout/login/Login';
import Home from './layout/home/Home';
import MainLayout from './mainLayout/MainLayout';
import ProductDetails from './layout/productDetails/ProductDetails';
import Favourites from './layout/favourites/Favourites';
import { AuthProvider, useAuth } from './context/AuthContext';

const RequireAuth = ({ children }) => {
	const {isAuth} = useAuth();
	console.log(isAuth);
	if(!isAuth) return <Navigate to="/login" />;
	return children;
  };

const RootRedirect = () => {
const { isAuth } = useAuth();
	return <Navigate to={isAuth ? "/home" : "/login"} replace />;
};

const router = createBrowserRouter([
	{
	  path: '/',
	  element: <RootRedirect />,
	},
	{
	  path: 'login',
	  element: <Login />,
	},
	{
	  path: '/',
	  element: <RequireAuth><MainLayout /></RequireAuth>,
	  children: [
		{
		  path: 'home',
		  element: <Home />,
		  index: true,
		},
		{
		  path: 'product/:id',
		  element: <ProductDetails />,
		},
		{
		  path: 'favourites',
		  element: <Favourites />,}
	  ],
	},
  ]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);