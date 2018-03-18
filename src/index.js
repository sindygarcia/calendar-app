import React from 'react';
import './style/index.scss'
import './style/calendar.scss'
import { render } from 'react-dom';
import App  from './components/App.js';

window.React = React;

render(
    <App />,
    document.getElementById("calendar-container")
)

