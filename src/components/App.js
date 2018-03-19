import { PropTypes } from 'prop-types';
import { Component } from 'react';
import { Calendar } from './Calendar.js';

//Needed it to save days and name of all months 
const months = {
	0: {
		name: "January",
		days: 31
	},
	1: {
		name: "February",
		days: 28
	},
	2: {
		name: "March",
		days: 31
	},
	3: {
		name: "April",
		days: 30
	},
	4: {
		name: "May",
		days: 31
	},
	5: {
		name: "June",
		days: 30
	},
	6: {
		name: "July",
		days: 31
	},
	7: {
		name: "August",
		days: 31
	},
	8: {
		name: "September",
		days: 30
	},
	9: {
		name: "October",
		days: 31
	},
	10: {
		name: "November",
		days: 30
	},
	11: {
		name: "December",
		days: 31
	}
};

//Tracking current year
var currentYear = new Date().getFullYear();

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			showCalendar : false,
			startDate : "",
			numberDays: "",
			countryCode: "",
			datePlaceholder: "mm/dd/yyyy",
			validDate: false,
			validNumberDays: false,
			holidays:{}
		}

		this.setChange = this.setChange.bind(this);
		this.validateInputs = this.validateInputs.bind(this);
		this.renderCalendar = this.renderCalendar.bind(this);
		this.calculateDays = this.calculateDays.bind(this);

		this.daysPerCalendar = {};
	}
	
	//Track the changes for every element in the form
	setChange(e){
		this.daysPerCalendar = {};
		this.setState({
			showCalendar: false,
			[e.target.name]: e.target.value
		});
		this.validateInputs(e.target.name, e.target.value);
	}

	validateInputs(name, value){
		let validDate = this.state.validDate;
		let validNumberDays = this.state.validNumberDays;

		switch(name){
			case "startDate":
				validDate = value.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/) ? true : false;
				break;
			case "numberDays":
				validNumberDays = value > 0
				break;
			default:
				break;
		}

		this.setState({
			validDate,
			validNumberDays
		})
	}

	//Changes the state property value to allow the calendar rendering 
	renderCalendar(e){
		e.preventDefault();
		if(this.state.validDate && this.state.validNumberDays){
			this.setState({
				showCalendar : true
			});
		}
	}

	calculateDays(){

	}

	render(){
		return (
		    <div>
		   		<form onSubmit={this.renderCalendar} className="calendar-params">
			   		<label>Start Date</label>
			   		<input type="text"
			   				name="startDate"
			   				value={this.state.startDate}
			   				onChange={this.setChange}
			   				required
			   				placeholder={this.state.datePlaceholder}/>
			   		<label>Number of Days</label>
			   		<input type="text"
			   				name="numberDays"
			   				value={this.state.numberDays}
			   				onChange={this.setChange}
			   				required/>
			   		<label>Country Code</label>
			   		<input type="text"
			   				name="countryCode"
			   				value={this.state.countryCode}
			   				onChange={this.setChange}
			   				required/>
			   		<button>Render Calendar</button>
		   		</form>
		   		<div className="form-validation">
		   			{
		   				(this.state.validDate === false || this.state.validNumberDays === false) ? <span>Start Date must be in the format "mm/dd/yyyy", Number of Days should be greater than 0</span> : null
		   			}
		   		</div>
		   		<div className="render-calendars">
			   		{	
			   			(this.state.showCalendar) ? 
		   					<Calendar />
		   				: null
			   		}
		   		</div>
		   	</div>
		)
	}
}


App.defaultProps = {
	starDate: "",
	numberDays: "",
	countryCode: ""
}

App.propTypes = {
	starDate: PropTypes.string.isRequired,
	numberDays: PropTypes.string.isRequired,
	countryCode: PropTypes.string.isRequired,
}

export default App;