import React from 'react'
import './App.scss'
import logoMoovin from './assets/logo-moovin.svg'

import LatestPosts from './components/LatestPosts'

const App: React.FC = () => {

	return (
		<div className='App'>
			<div className='appHeader'>
				<img alt='Logo da Moovin' src={logoMoovin} />
			</div>
			<LatestPosts/>
		</div>
	)
}

export default App
