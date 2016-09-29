import React from 'react';
import AccountsUI from '../../startup/both/AccountsUI.jsx';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

export default class MainLayout extends React.Component {

	constructor() {
		super();
	}

	componentDidMount() {
         
    }
	
	render() {
			return (
				<div className="main-layout">
					<header>
						<h2>My Resolutions</h2>
						<nav>
							<Link to="/"><i className="fa fa-home"></i></Link>
							<Link to="/about">About</Link>
							<AccountsUI />
						</nav>
					</header>
					<main>
						{this.props.children}
					</main>
				</div>
			);
	}
	
}

//import {MainLayout} from './MainLayout.jsx';
//import { Loading } from '../components/Loading.js';



/*
	shouldComponentUpdate(nextProps, nextState) {
		//return nextProps.id !== this.props.id;
	
	}

*/



// {this.props.children}

/*
export default createContainer(() => {
  return {};
}, MainLayout);
*/

// this.props.loading ? <Loading /> : 

/*
		const clonedChildren = this.props.children && React.cloneElement(this.props.children, {
			key: this.props.location.pathname,
		 });
*/

 //  {this.props.loading ? <Loading /> : clonedChildren}

//{ this.props.children }

/*
export const Layout = ({ loading, resolutions }) => {
  return loading ? <Loading /> : RenderLayout();
};

export const RenderLayout = ({ children }) => {
	return (
		<div className="main-layout">
			<header>
				<h2>My Resolutions</h2>
				<nav>
					<a href="/"><i className="fa fa-home"></i></a>
					<a href="/about">About</a>
					<AccountsUI />
				</nav>
			</header>
			<main>
				<div>{ children }</div>
			</main>
		</div>
	);
}
*/
