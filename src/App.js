import React, { useState, useEffect, useCallback, Suspense } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Link, Switch, useHistory } from 'react-router-dom';
import External from './external';
import Hoc from './hoc';
import Functional from './functional';
import Middleware from './middleware';

const LoadLazyComp = React.lazy(() => {
 return new Promise(resolve => {
    setTimeout(() => resolve(import('./functional')), 5000);
  });
});

const perform = new Set();
export const myContext = React.createContext();

const Login = (props) => {
	// console.log({...props})
	
	const [count, setCount] = useState(0);
	const [resetCounts, resetCountner] = useState(false);
	useEffect(() => {
		console.log('USE EFECT', count, resetCounts);
		if (count > 0 && !resetCounts) {
			setTimeout(() => { setCount(count+1) }, 5000)
			
		}
	});
	const resetCount = useCallback((value) => {
		resetCountner(!resetCounts);
	}, [])
	// perform.add(resetCount);
	// console.log(perform, perform.size)
	return (
		<>
			<div>Home Page</div>
			<button onClick={() => { setCount(count+1);  }}>START</button>
			<button onClick={() => { setCount(0); resetCountner(!resetCounts); }}>STOP</button><br/>
			<button onClick={() => setCount(count+1)}>+</button><br/>
				{count}<br/>
			<button onClick={() => setCount(count-1)}>-</button>
			<LoginChild count={count} resetCount={resetCount} />
		</>
	)
}

const LoginChild = (props) => {
	console.log({...props})
	const [formValues, setFormData] = useState({name:''})
	const webWorker = new Worker('./../script.js');
	//webWorker.postMessage(10)
	webWorker.onmessage = (e) => {
		document.getElementById('workerID').innerHTML = e.data;
	}
	useEffect(() => {
		//webWorker.terminate();
	})
	const formData = (key, e) => {
		if (key === 'fname' || key === 'lname') {
			setFormData({...formValues, [key]: e.target.value})
		} else {
			setFormData({...formValues, [key]: e})
		}
	}
	const submitFormData = (event) => {
		event.preventDefault();
		console.log(formValues)
		axios.get('/getNames', {formValues})
	}
	return (
	
		<>
			<div>LoginChild Page {props.count}</div>
			<button onClick={() => props.resetCount()}>Reset</button>
			<div id="workerID"></div>
			<form onSubmit={submitFormData}>
				first Name: <input type="text" name="fname" id="fname"  value={formValues.fname} onChange={(e) => formData('fname', e)} /><br/>
					{!formValues.fname && <p>Enter First name</p>}
				Last Name: <input type="text" name="lname" onChange={(e) => formData('lname', e)} /><br/>
				sex: Male <input type="radio" name="sex" onChange={(e) => formData('sex', 'male')} /> Female<input type="radio" name="sex" onChange={(e) => formData('sex', 'female')} /><br/>
				<button type="submit">SUBMIT</button>
			</form>
		</>
	)
}

const Contact = (props) => {
	const { name, loc } = props;
	console.log(name, loc, myContext);
	const refs = React.createRef();
	useEffect(() => {
		refs.current.focus();
		refs.current.value = 8;
	})
	return (
		<>
			<div>Contact Page</div>
			<input ref={refs} />
			<Suspense fallback={<div>Loading....</div>}>
				<LoadLazyComp />
			</Suspense>
		</>
	)
}

export class ClassComponent extends React.PureComponent {
	// const history = useHistory();
	submitForm = (e) => {
		let opt, choose = [];
		const dropdown = document.getElementById('dropdown')?.value;
		const radioOpt = document.getElementsByName('radios');
		const checkboxOPt = document.getElementsByName('sex');
		for(let i=0; i<radioOpt.length; i++){
			 if(radioOpt[i].checked) opt = radioOpt[i].value;
		}
		for(let i=0; i<checkboxOPt.length; i++){
			
			 if(checkboxOPt[i].checked) choose = [...choose, checkboxOPt[i].value];
		}
		console.log(dropdown, opt, choose);
		e.preventDefault();
		fetch('http://localhost:8000/getDetails').then((res) => res.json().then((resp) =>  console.log('Fetch', resp)))
		const newPromise = new Promise((resolve, reject) => {
			fetch('http://localhost:8000/getDetails').then((res) => resolve(res.json()) )
		})
		newPromise.then((res) => console.log('Promise', res))		
		let config = {
		  headers: {},
		  body: {
			name: dropdown
		  },
		}
		const asy = async () => {
			return await axios.get("http://localhost:8000/getDetails", {params: { name: dropdown }}) 
		}
		asy().then((res) => console.log('Async', res.data))
		

		console.log('XXXX');
	}

	render() {
		return (
		<>
			<div>Class Componenet {Math.random()} {this.props.loc}</div>
			<form onSubmit={this.submitForm.bind(this)} >
			<select id='dropdown' name='dropdown'>
				<option value='sri'>SRI</option>
				<option value='mena'>MENA</option>
				<option value='vinay'>VINAY</option>
			</select>
			<br/>
			<input type='radio' name='radios' id='radios' value='yes' />YES <input type='radio' name='radios' id='radios' value='no' />NO <input type='radio' name='radios' id='radios' value='none' />NONE
			<br/>
			<input type='checkbox' name='sex' id='sex' value='male' />MALE <input type='checkbox' name='sex' id='sex' value='female' />FEMALE <input type='checkbox' name='sex' id='sex'  value='none' />NONE
			<button name='submit'>SUBMIT</button>
			</form>
			<p onClick={() => this.props.history.push('/home')}>Go to Home Page</p>
		</>
		)
	};
}

ClassComponent.defaultProps = {
	loc: 'Delhi',
}

const Forms = (props) => {
	console.log(props);
	const { name, loc } = props;
	const refs = React.createRef();
	useEffect(() => {
	})
	const submitForms = (e) => {
		e.preventDefault();
		console.log(refs.current.value);
	}
	return (
		<>
			<div>Form Page</div>
			<form onSubmit={(e) => submitForms(e)}>
				<input ref={refs} />
				<button>SUBMIT</button>
			</form>
			<div id='parent-div'>
				<div id='first-div'>First Div</div>
				<div id='second-div'>Second Div</div>
				<div id='third-div'>Third Div</div>
				<div id='fourth-div'>Fourth Div</div>
			</div>
		</>
	)
}

function App() {
  return (
    <div className="App" style={{display:'flex', flexDirection:'column'}}>
		<BrowserRouter>
			<Link to="/home">Home</Link>
			<Link to="/contact">Contact</Link>
			<Link to="/render">Render</Link>
			<Link to="/child">Child</Link>
			<Link to="/class">Class Component</Link>
			<Link to="/external" className='focus'>External Component</Link>
			<Link to="/forms">Forms Component</Link>
			<Link to="/hoc">HOC Component</Link>
			<Link to="/middleware">Middleware Component</Link>
			
			<div style={{marginTop:'100px'}}>
				<Route path="/home" exact component={Login} />
				<Route path="/contact" exact component={() => (<myContext.Provider value="Aricent"><Contact name='sri menaka' loc='bangaloe' /></myContext.Provider>)} />
				<Route path="/render" exact render={() => <div>Render Page</div>} />
				<Route path="/child" exact>
					<div>Child Page</div>
					<Functional loc='bangalore'/>
				</Route>
				<Route path="/class" exact component={ClassComponent} />
				<Route path="/external" exact component={External} />
				<Route path="/forms" component={Forms} />
				<Route path="/hoc" exact component={Hoc} />
				<Route path="/middleware" exact component={Middleware} />
			</div>
		</BrowserRouter>
    </div>
  );
}

export default App;
