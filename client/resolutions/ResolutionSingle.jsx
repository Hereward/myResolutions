import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

	constructor() {
		super();
		this.state = {
			text: ''
		}
	}

	toggleChecked() {
		Meteor.call('toggleResolution', this.props.resolution);
	}

	deleteResolution() {
		Meteor.call('deleteResolution', this.props.resolution);
	}	

	updateResolutionText(event) {
		event.preventDefault();
		console.log("updateResolutionText " + this.refs.text.value);
		Meteor.call('updateResolutionText', this.props.resolution, this.refs.text.value);
	}	


	handleChange (event) {
	 	this.updateResolutionText(event);
	 	//console.log("Handle Change");
	}

	componentDidMount() {
	 	 this.state.text = this.props.resolution.text;
	}

	updateState() {
		this.state.text = this.props.resolution.text;
	}


	// <a href={`/resolutions/${this.props.resolution._id}`}>{this.props.resolution.text}</a>

	render() {
		const resolutionClass = this.props.resolution.complete ? "checked" : "";
		const status = this.props.resolution.complete ? <span className="completed">Completed</span> : '';

		return (
			<li className={resolutionClass}>
				<input type="checkbox"
					readOnly={true}
					checked={this.props.resolution.complete}
					onClick={this.toggleChecked.bind(this)} />
				{this.props.resolution.text} <br/>
				<form className="new-resolution" onSubmit={this.updateResolutionText.bind(this)}>
					<input 
	                    defaultValue = {this.props.resolution.text}
	                    onBlur = {this.handleChange.bind(this)}
						type="text" 
						ref="text"
						placeholder="Finish React Meteor Series" />
				</form>
				{status}
				<button className="btn-cancel"
					onClick={this.deleteResolution.bind(this)}>
					&times;
				</button>
			</li>
		);
	}
}