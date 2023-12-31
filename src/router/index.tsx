import App from '@/App'
import Global from '@/Global'
import Common from '@/Common'
import { createHashRouter, Navigate } from 'react-router-dom'
export const router = createHashRouter([
	{
		path: '/',
		children: [
			{
				index: true,
				element: <Navigate to="/home" />
			}
		]
	},
	{
		path: '/home',
		element: <App />,
	},
	{
		path: 'common',
		element: <Common /> 
	}
])
