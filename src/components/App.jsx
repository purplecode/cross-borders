let React = require('react');
var ReactDOM = require('react-dom');
let nanoajax = require('nanoajax');
let mui = require('material-ui');

let Navbar = require('./Navbar.jsx');
let Regions = require('./../stores/Regions');

let Chart = require('./Chart.jsx');
let CordChart = require('./charts/CordChart');
let UiPalette = require('./../constants/UiPalette');

let ThemeManager = require('material-ui/lib/styles/theme-manager');
let themeManager = new ThemeManager();
themeManager.setPalette(UiPalette);

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
            muiTheme: themeManager.getCurrentTheme()
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


