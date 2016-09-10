import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

	constructor() {
		super();
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


	saveResolution(event) {
		console.log("saveResolution");
		this.updateResolutionText(event);
		$(`#${this.text_input_id}`).hide();
		$(`#${this.text_id}`).show();
		$(`#${this.text_save_icon_id}`).hide();
	}


	handleChange (event) {
	 	this.updateResolutionText(event);
	 	//console.log("Handle Change");
	}

	componentWillMount() {
		this.text_id = this.props.resolution._id+'_text';
		this.text_input_id = this.props.resolution._id+'_input';
		this.text_save_icon_id = this.props.resolution._id+'_save';
	}


	editResolution(event) {
		console.log("Edit Resolution " + this.text_form_id);
        $(`#${this.text_id}`).hide();
        $(`#${this.text_input_id}`).show();
        //$(`#${this.text_form_id}`).css( "display", "inline");
        $(`#${this.text_save_icon_id}`).show();
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
				&nbsp; <i onClick={this.editResolution.bind(this)} className="fa fa-edit editIcon"></i> &nbsp;
				<i id={this.text_save_icon_id} onClick={this.saveResolution.bind(this)} className="fa fa-check-square saveIcon">&nbsp;</i>
				<span id={this.text_id}>{this.props.resolution.text}</span>
			
					<input 
					    className = "hiddenInput"
					    id = {this.text_input_id}
	                    defaultValue = {this.props.resolution.text}  
						type="text" 
						ref="text"
						placeholder="Finish React Meteor Series" />
				{status}
				<button className="btn-cancel"
					onClick={this.deleteResolution.bind(this)}>
					&times;
				</button>
			</li>
		);
	}
}

// onSubmit={this.updateResolutionText.bind(this)}
// onBlur = {this.handleChange.bind(this)}
