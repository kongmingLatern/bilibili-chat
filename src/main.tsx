// import 'regenerator-runtime/runtime'
import ReactDOM from 'react-dom/client'
// import './samples/node-api'
import './index.scss'
import '@unocss/reset/normalize.css'
import '@unocss/reset/tailwind.css'
import 'uno.css'
import '@/assets/reset.scss'
import '@fontsource/roboto/500.css'
import { ConfigProvider, theme } from 'antd'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import * as buffer from "buffer";
 
if (typeof (window as any).global === "undefined"){  
   (window as any).global = window;
}
if (typeof (window as any).Buffer === "undefined") { 
   (window as any).Buffer = buffer.Buffer;
}

ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
).render(
	<ConfigProvider
		theme={
			{
				// 1. 单独使用暗色算法
				// algorithm: theme.darkAlgorithm,
				// 2. 组合使用暗色算法与紧凑算法
				// algorithm: [
				// 	theme.darkAlgorithm,
				// 	theme.compactAlgorithm,
				// ],
			}
		}
	>
		{/* <Global /> */}
		{/* <App /> */}
		<RouterProvider router={router} />
	</ConfigProvider>
)

// postMessage({ payload: 'removeLoading' }, '*')
