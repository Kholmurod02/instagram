import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/app/providers/theme-provider'
import Router from './router/router'
import './styles/globals.css'
import { store } from './store/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
				<Router />
			</ThemeProvider>
		</Provider>
	</StrictMode>
)