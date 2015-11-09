let _ = require('lodash');
let React = require('react');
let FontAwesome = require('react-fontawesome');
let Avatar = require('material-ui/lib/avatar');

let Card = require('material-ui/lib/card/card');
let CardMedia = require('material-ui/lib/card/card-media');
let CardHeader = require('material-ui/lib/card/card-header');
let CardTitle = require('material-ui/lib/card/card-title');
let CardText = require('material-ui/lib/card/card-text');
let CardActions = require('material-ui/lib/card/card-actions');

let Table = require('material-ui/lib/table/table');
let TableHeader = require('material-ui/lib/table/table-header');
let TableRow = require('material-ui/lib/table/table-row');
let TableRowColumn = require('material-ui/lib/table/table-row-column');
let TableHeaderColumn = require('material-ui/lib/table/table-header-column');
let TableBody = require('material-ui/lib/table/table-body');
let TableFooter = require('material-ui/lib/table/table-footer');

let Flag = require("react-flags");

let Colors = require('../constants/Colors');

require('./regionCard.less');

export default class RegionCard extends React.Component {


    render() {
        return (
            <Card initiallyExpanded={false} className="region-card">
                <CardHeader
                    title={this.props.region.name}
                    subtitle={"Total outgoing: " + this.props.region.count}
                    avatar={
                        <Avatar backgroundColor={Colors.getColor(this.props.region.key)}>
                            <Flag
                                name={this.props.region.key}
                                format="png"
                                pngSize={24}
                                shiny={false}
                            />
                        </Avatar>}
                    actAsExpander={true}
                    showExpandableButton={true}>
                </CardHeader>
                <CardText expandable={true}>
                    <Table>
                        <TableHeader displaySelectAll={false}>
                            <TableRow>
                                <TableHeaderColumn>
                                </TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody
                            displayRowCheckbox={false}
                            showRowHover={true}
                            stripedRows={false}>
                            {
                                this.props.connections.map((connection) => {
                                    return <TableRow>
                                        <TableRowColumn>
                                            <Flag
                                                name={connection.y.key}
                                                format="png"
                                                pngSize={32}
                                                shiny={false}
                                                />
                                        </TableRowColumn>
                                        <TableRowColumn>{connection.y.name}</TableRowColumn>
                                        <TableRowColumn>{connection.count}</TableRowColumn>
                                    </TableRow>
                                })
                            }
                        </TableBody>
                    </Table>
                </CardText>
            </Card>
        )
    }
}
