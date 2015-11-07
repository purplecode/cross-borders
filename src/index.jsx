let React = require('react');
let ReactDOM = require('react-dom');

require("react-tap-event-plugin")();
require("font-awesome-webpack");

var App = require('./components/App.jsx');

ReactDOM.render(<App />, document.getElementById("react-container"));
