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

export class Calendar extends Component {
	contructor(props){
		super(props);
		this.state = {
			"startDate": props.startDate,
			"currentYear": props.currentYear,
			"monthDays": props.monthDays,
			"monthName": props.monthName
		};
	}

	render(){
		return {
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
       			</ul>
			</div>
		}
	}
}

