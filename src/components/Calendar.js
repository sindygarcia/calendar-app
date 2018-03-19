import {Component} from 'react';

const days = {
	0: "Su",
	1: "Mo",
	2: "Tu",
	3: "We",
	4: "Th",
	5: "Fr",
	6: "Sa"
};

//Component for rendering the days
class CalendarDay extends Component {	
	//Adds Style depending on the day's type
	componentWillMount(){
		this.style={
			backgroundColor: (this.props.date) 
										? ( (this.props.date.getDay() == 0 || this.props.date.getDay() == 6 ) ? "Yellow" : "DarkSeaGreen" ) 
										: "gray"
		}
	}

	render(){
		return (
        	<li style={this.style}>{(this.props.date) ? this.props.date.getDate() : ""}</li>
		)
	}
}

export class Calendar extends Component {
	constructor(props){
		super(props);
		this.state = {
			"startDate": props.startDate,
			"currentYear": props.currentYear,
			"monthDays": props.monthDays,
			"monthName": props.monthName
		};
	}

	render(){
		return (
			<div id="calendar">
				<div className="calendar-header">
	       			<ul>
	       				<li>{this.state.monthName}<br/><span>{this.state.actualYear}</span></li>
	       			</ul>
	       		</div>
       			<ul className="calendar-weekdays">
       				<li>{days[0]}</li>
       				<li>{days[1]}</li>
				  	<li>{days[2]}</li>
				  	<li>{days[3]}</li>
				  	<li>{days[4]}</li>
				  	<li>{days[5]}</li>
				  	<li>{days[6]}</li>
       			</ul>
       			<ul className="calendar-days">
       				<CalendarDay />
       			</ul>
			</div>
		)
	}
}

