import React, { Suspense } from 'react'
import { connect } from 'react-redux';
// import { setCounter } from './actions';

const LazyComp = React.lazy(() => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(import('./lazy')), 5000);
	});
});

const LazyComp1 = React.lazy(() => {
	return new Promise((resolve, reject) => {
		setTimeout(() => resolve(import('./lazy')), 8000);
	});
});

const Middleware = (props) => {
	const val = props.counter;
	return (
	<>
		<Suspense fallback={<p>First Lazy Loading.....</p>}>
			<LazyComp />
		</Suspense>
		<Suspense fallback={<p>Second Lazy Loading.....</p>}>
			<LazyComp1 />
		</Suspense>
		
		<p>{props.counter}</p>
		<div>Middleware Component</div>
		<button onClick={() => props.addCounter(val + 1)}>Click</button>
		</>
	)
}

const mapStateToProps = (state) => {
	return {
		...state,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log(ownProps)
	return {
		addCounter: (val) => {
			setTimeout(() => {
				dispatch({type: 'ADD_COUNTER', data: val})
			}, 5000)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Middleware);