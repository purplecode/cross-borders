let _ = require('lodash');
let React = require('react');

export default class Chart extends React.Component {

    renderChart(renderer, data) {
        if(!_.isEmpty(this.props.data) && this.refs.chartContainer) {
            var element = this.refs.chartContainer.getDOMNode();
            new renderer(element).render(data);
        }
    }

    render() {
        return (
            <div className="chart" ref="chartContainer">
                {this.renderChart(this.props.renderer, this.props.data)}
            </div>
        )
    }
}