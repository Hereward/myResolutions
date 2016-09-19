import React, {Component} from 'react';

export default class ResolutionSingle extends React.Component {

	constructor() {
		super();
		this.state = {
			text: '',
			editing:false
		};
	}

	toggleChecked() {
		Meteor.call('toggleResolution', this.props.resolution);
	}

	deleteResolution() {
		Meteor.call('deleteResolution', this.props.resolution);
	}	

	updateResolutionText(event) {
		console.log("updateResolutionText " + this.refs.text.value);
		Meteor.call('updateResolutionText', this.props.resolution, this.refs.text.value);
	}	


	saveResolution(event) {
		console.log("saveResolution");
		this.updateResolutionText(event);
		this.setState({editing: false});
	}


	handleChange (event) {
	 	this.updateResolutionText(event);
	}

	componentWillMount() {

	}


	editResolution(event) {
		console.log("Edit Resolution");
        this.setState({editing: true});
	}


	render() {
		const resolutionClass = this.props.resolution.complete ? "checked" : "";
		const status = this.props.resolution.complete ? <span className="completed">Completed</span> : '';
		const saveIconClass = this.state.editing ? "saveIconEditing" : "";
		const hiddenInputClass = this.state.editing ? "hiddenInputShow" : "";
		const resolutionTextClass = this.state.editing ? "resolutionTextEditing" : "resolutionText";


		return (
			<li className={resolutionClass}>
			    
				<input type="checkbox"
					readOnly={true}
					checked={this.props.resolution.complete}
					onClick={this.toggleChecked.bind(this)} />

					
					&nbsp; <a href={`/resolutions/${this.props.resolution._id}`}><i className={"fa fa-image imageIcon"}>&nbsp;</i></a>
					&nbsp; <i onClick={this.editResolution.bind(this)} className="fa fa-edit editIcon"></i> &nbsp;
					<i onClick={this.saveResolution.bind(this)} className={"fa fa-check-square saveIcon " + saveIconClass}>&nbsp;</i>
					<span className={resolutionTextClass}>{this.props.resolution.text}</span>
			
					<input 
					    className = {"hiddenInput " + hiddenInputClass}
	                    defaultValue = {this.props.resolution.text}  
						type="text" 
						ref="text"
						placeholder="Finish React Meteor Series" />
				{status}
				<button className="btn-cancel"
					onClick={this.deleteResolution.bind(this)}>
					&times;
				</button>
				<br/> <img className='imageThumb' src={this.props.link} alt='image' />

			</li>
		);
	}
}

// onSubmit={this.updateResolutionText.bind(this)}
// onBlur = {this.handleChange.bind(this)}
