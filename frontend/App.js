import React from 'react';
import * as ReactDOM from 'react-dom';

const App = () => {
	return (
			<div>
				<h2>Test</h2>
			</div>
	);
};

export default App;

const wrapper = document.getElementById("demo-react-container");
wrapper ? ReactDOM.render(<App />, wrapper) : false
