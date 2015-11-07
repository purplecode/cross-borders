let React = require('react');
var ReactDOM = require('react-dom');
let nanoajax = require('nanoajax');
let mui = require('material-ui');

let Navbar = require('./Navbar.jsx');
let Regions = require('./../stores/Regions');

let Chart = require('./Chart.jsx');
let CordChart = require('./charts/CordChart');

const ThemeManager = new mui.Styles.ThemeManager();

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            regions: [],
            regionsConnections: []
        };
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentDidMount() {
        Regions.getRegions().then((regions) => {
            this.setState({regions: regions});
        });
    }

    render() {
        return (
            <div>
                <Navbar/>

                <div className='content'>
                    <Chart renderer={CordChart} data={this.state.regions}/>
                </div>
            </div>
        );
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};


