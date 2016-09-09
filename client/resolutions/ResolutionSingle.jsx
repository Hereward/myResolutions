import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

	toggleChecked() {
		Meteor.call('toggleResolution', this.props.resolution);
	}

	deleteResolution() {
		Meteor.call('deleteResolution', this.props.resolution);
	}	

	updateResolutionText(event) {
		event.preventDefault();
		console.log("updateResolutionText " + this.props.resolution.text);
		Meteor.call('updateResolutionText', this.props.resolution);
	}	


	handleChange () {
	 	//this.setState({value: event.target.value});
	 	//this.updateResolutionText.bind(this);

	 	console.log("Handle Change");
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
	                    id = {this.props.resolution._id}
	                    defaultValue = {this.props.resolution.text}
	                    onChange={this.handleChange()}
						type="text" 
						ref="resolution"
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