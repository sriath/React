import React from 'react';

var HocData = {
	name: 'Sridhar',
	loc: 'chennai'
}

const Hoc = (ComposedComponent, ComposedComponent1) => class extends React.Component  {
	render() {
		return (
			<>
				<p>Higher Order Component</p>
				<ComposedComponent {...HocData} />
				<ComposedComponent1 {...HocData} />
			</>
		)
	}
}

class WrappedComponent extends React.Component {
	render() {
		return (
			<>
				<div>Wrapped Class Component {this.props.name} {this.props.loc}</div>
				
			</>
		)
	}
}

const WrappedComponent1 = (props) => {
	return (
		<>
			<div>Wrapped Functional Component {props.name} {props.loc}</div>
			<div onClick={() => console.log("outer")}>
			  <div onClick={() => console.log("inner")}>
				click me
			  </div>
			</div>
		</>
	)
}

export default Hoc(WrappedComponent1, WrappedComponent);
