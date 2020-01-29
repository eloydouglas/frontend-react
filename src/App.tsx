import React from 'react'
import './App.scss'

import LatestPosts from './components/LatestPosts'

const App: React.FC = () => {
	const logoMoovin =
		'https://cdn.moovin.com.br/project/manager-panel/img/logo-moovin.svg'

	return (
		<div className='App'>
			<div className='header'>
				<img alt='Logo da Moovin' src={logoMoovin} />
			</div>
			<LatestPosts/>
		</div>
	)
}

export default App
