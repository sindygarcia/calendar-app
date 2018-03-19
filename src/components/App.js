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
		this.processCalculation = this.processCalculation.bind(this);
		
		this.loadHolidays = this.loadHolidays.bind(this);
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
			this.calculateDays();
		}
	}

	 //Calculates Months and days that need to be display in order to show 
    //number of days given by the user
	calculateDays(){
		this.daysPerCalendar[currentYear] = {};
		this.countDays = parseInt(this.state.numberDays);
		this.initialMonth = parseInt(this.state.startDate.split("/")[0]);
		this.diffDay = parseInt(this.state.startDate.split("/")[1]);
		this.monthDays =  months[this.initialMonth - 1].days; 
		
		var monthsToRender = this.diffDay === 1 && this.monthDays == this.countDays ? 1 : Math.ceil((this.diffDay + this.countDays)/30); 
		var countMonths = new Date((this.initialMonth) + "/01/" + currentYear);

		//Iterates through every month that's going to be rendered to calculate how many days should 
		// be displayed on each one
		Array.apply(0, Array(monthsToRender)).map((m, i) => {
			if(i != 0 ){ countMonths.setDate(countMonths.getDate() + 31); }

			if(this.daysPerCalendar[countMonths.getFullYear()]){
				this.processCalculation(countMonths.getMonth(), i);
			}else{
				currentYear = countMonths.getFullYear();
				this.daysPerCalendar[currentYear] = {};
				this.processCalculation(countMonths.getMonth(), i);
			}

		});
	}  

	//Function called in CalculateDays
	//Params: m (integer) = month index (e.g: 1 for February, 2 for March and so on)
	// 		  i (integer) = index of the element per Year 
	processCalculation(m, i){
		if(i === 0){
			if(this.countDays > (months[m].days - this.diffDay)){
				this.daysPerCalendar[currentYear][i] = [m, months[m].days - this.diffDay, this.state.startDate];
				this.countDays -= this.daysPerCalendar[currentYear][i][1];
			}else{
				this.daysPerCalendar[currentYear][i] = [m, this.countDays - 1, this.state.startDate];
			}
		}else{
			if(this.countDays > (months[m].days)){
				this.daysPerCalendar[currentYear][i] = [m, months[m].days, (m + 1 +"/01/"+ currentYear)];
				this.countDays -= this.daysPerCalendar[currentYear][i][1];
			}else{
				this.daysPerCalendar[currentYear][i] = [m, this.countDays - 1, (m + 1 +"/01/"+ currentYear)];
			}
		}
	}

	//Makes the request to the Holidays API to get the holidays given a Country Code and a year
	//Sent 2017 as year because the free version does not allow to request the current year
	loadHolidays(){
     	fetch('https://holidayapi.com/v1/holidays?key=65948068-d62c-4177-aca1-f38c004ddc0e&country=' + this.state.countryCode.toUpperCase() + '&year=2017')
	        .then(response => response.json())
	        .then( (responseJson) => {
	            this.setState({holidays: responseJson.holidays})
	            // this.holidays = responseJson.holidays;
	    })
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
			   				 Object.keys(this.daysPerCalendar).map((year, j) => 
								Object.keys(this.daysPerCalendar[year]).map((month,i) => 
									 <Calendar key={i} 
											startDate={this.daysPerCalendar[year][month][2]}
								 			monthDays={months[this.daysPerCalendar[year][month][0]].days}
								 			monthName={months[this.daysPerCalendar[year][month][0]].name}
								 			daysPerCalendar={this.daysPerCalendar[year][month][1]}
								 			currentYear={year}
								 			startsOnDate={(i === 0) ? true : false}
								 			countryCode={this.state.countryCode} />
								)
							)
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