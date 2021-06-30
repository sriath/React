import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import axios from 'axios'
import { ClassComponent } from './App'
import Functional from './functional';
import { useHistory } from 'react-router-dom';

class External extends React.PureComponent {
	
	constructor(props) {
		super(props);
		console.log('constructor');
		this.state = {
			pageData: [],
		}
		// const history = useHistory();
	}
	componentWillMount() {
		console.log('componentWillMount', axios);
		/*axios.get('https://api.github.com/users/hacktivist123/repos')
		.then((data) => {
			console.log(data.data);
			this.setState({pageData: data.data});
		})*/
	}
	componentDidMount() {
		console.log('componentDidMount');
		/*fetch('https://api.github.com/users/hacktivist123/repos')
		.then((response) => 
			response.json().then((data) => {
				console.log(data);
				this.setState({pageData: data});
			})
		)*/
		/*var aa = new Promise((resolve, reject) => {
			fetch('https://api.github.com/users/hacktivist123/repos')
			.then((response) => resolve(response.json()))
		})
		aa.then((res) => console.log(res))*/
		/*let aa = async () => {
			let bb = await fetch('https://api.github.com/users/hacktivist123/repos')
			.then((response) => { return response.json() })
			console.log(bb)
			this.setState({pageData: bb});
		}
		aa();*/
	}
	componentWillUpdate() {
		console.log('componentWillUpdate');
	}
	componentDidUpdate(prevProps, prevState) {
		console.log('componentDidUpdate', prevProps, prevState);
	}
	componentWillReceiveProps(prevProps, nextProps) {
		console.log('componentWillReceiveProps', prevProps, nextProps);
	}
	static getDerivedStateFromProps(prevProps, nextProps) {
		console.log('getDerivedStateFromProps', prevProps, nextProps);
	}
	/*getSnapshotBeforeUpdate(prevProps, prevState) {
		console.log('getSnapshotBeforeUpdate', prevProps, prevState);
	}
	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		console.log('getDerivedStateFromError', error);
		return { hasError: true };
  }
	shouldComponentUpdate() {
		return true;
	}*/
	render() {
		console.log('render', this.props.storeName);
		return (
			<>
				<div>External Componenet: {this.props.storeName.name} {this.props.storeLoc}</div>
				<button onClick={() => this.props.setName({name:'Menaka'})}>Set Name</button>
				<button onClick={() => this.props.setLoc('Chennai')}>Set Loc</button>
				<table>
					{this.state.pageData.map((li) => <tr key={li.id}><td>{li.name}</td></tr> )}
				</table>
				<ClassComponent loc={this.props.storeLoc}/>
				<Functional loc={this.props.storeLoc}/>
				<p onClick={() => this.props.history.push('/forms/basic/' + this.props.storeName.name)}>Go to Form Page</p>
			</>
		)
	};
}

const mapStateToProps = (state) => {
	return {
		...state,
	}
}

const mapDispatchToProps = {
	...actions
};

const storeConnect = connect(mapStateToProps, mapDispatchToProps)(External);

export default storeConnect;