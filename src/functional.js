import React, { memo, useContext, useState, useEffect  } from 'react';
import { myContext } from './App';
import styled from 'styled-components'

const Button = styled.div`
	border: 2px solid red;
	width: 100px;
	margin: 10px;
	background: ${props => props.primary ? 'green' : 'blue'};
`;

const NEW = styled(Button)` 
	width:200px;
`;

const Functional = (props) => {
	const value = useContext(myContext);
	const [id, setId] = useState();
	// console.log({...props, myContext}, id)
	useEffect(() => {
		console.log('useCallback: DidMount');
		return() => { console.log('useCallback: WillUnMount'); }
	}, []);
	useEffect(() => {
		console.log('useCallback: DidUpdate');
	});
	const xx = [{name:'sri',loc:'chennai'},{name:'mena',loc:'bangalore'},{name:'vinay',loc:'delhi'}]
	return (
		<>
			{console.log('AAA')}
			<div>Functional Component {Math.random()} {props?.loc}</div>
			{value}
			<ul>
				{xx.map((a, key) =>  <tr><td onClick={() => setId(key)}>{a.name}</td><br/><td style={{display:id===key?'block':'none'}}>{a.loc}</td></tr>)}
			</ul>
			<Button>NEW</Button>
			<Button primary>OLD</Button>
			<NEW>EXISTING</NEW>
		</>
	)
}

export default memo(Functional);
