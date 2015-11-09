let React = require('react');
var ReactDOM = require('react-dom');
let nanoajax = require('nanoajax');
let mui = require('material-ui');

let Navbar = require('./Navbar.jsx');
let Regions = require('./../stores/Regions');

let Chart = require('./Chart.jsx');
let CordChart = require('./charts/CordChart');
let RegionCard = require('./RegionCard.jsx');
let UiPalette = require('./../constants/UiPalette');

let ThemeManager = require('material-ui/lib/styles/theme-manager');
let themeManager = new ThemeManager();
themeManager.setPalette(UiPalette);

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            regions: [],
            connections: []
        };
    }

    getChildContext() {
        return {
            muiTheme: themeManager.getCurrentTheme()
        };
    }

    componentDidMount() {
        Promise.all([Regions.getRegions(), Regions.getConnections()]).then((result) => {

            console.log(result);

            this.setState({
                regions: result[0],
                connections: result[1]
            });
        });
    }

    render() {
        return (
            <div>
                <Navbar/>

                <div className='content'>
                    <div className='content__left-panel'>
                        <Chart renderer={CordChart} data={this.state.connections}/>
                    </div>
                    <div className='content__right-panel'>
                        <div>
                            {
                                this.state.regions.map((region) => {
                                    return <RegionCard
                                        region={region}
                                        connections={_.filter(this.state.connections, (connection) => { return connection.x.key === region.key; })}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

App.childContextTypes = {
    muiTheme: React.PropTypes.object
};

