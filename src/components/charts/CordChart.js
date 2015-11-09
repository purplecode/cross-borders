let d3 = require('d3');
let _ = require('lodash');
let queue = require('./Queue');
let Colors = require('./../../constants/Colors');

require('./cordChart.less');

class CordChartModel {
    constructor(data) {
        this.data = data;
        this.regions = _.uniq(_.pluck(data, 'x'), (region) => {
            return region.key;
        });
        this.regionsIdx = _.reduce(this.regions, (memo, region, idx) => {
            memo[region.key] = idx;
            return memo;
        }, {});
    }

    getLabel(d) {
        return this.regions[d.index].name;
    }

    getTitle(d) {
        return this.getLabel(d) + ' ' + d.value.toFixed(0);
    }

    getColor(d) {
        return Colors.getColor(this.regions[d.index].key);
    }

    getMatrix() {
        let matrix = [];
        // initialize 0's
        this.regions.forEach(() => {
            matrix.push(_.range(0, this.regions.length, 0));
        });
        this.data.forEach((connection) => {
            let x = this.regionsIdx[connection.x.key];
            let y = this.regionsIdx[connection.y.key];
            matrix[x][y] = connection.count;
        });
        return matrix;
    }
}

export default class CordChartView {
    constructor(element, width = 800, height = 800) {
        this.element = element
        this.width = width;
        this.height = height;
    }

    render(data) {

        var model = new CordChartModel(data);

        var layout = d3.layout.chord()
            .padding(.05)
            .sortSubgroups(d3.descending)
            .matrix(model.getMatrix());

        var innerRadius = Math.min(this.width, this.height) * .41,
            outerRadius = innerRadius * 1.1;

        d3.select(this.element).select("svg").remove();

        var svg = d3.select(this.element).append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g")
            .attr("transform", "translate(" + this.width / 2 + "," + this.height / 2 + ")");

        let group = svg.append("g").selectAll("path")
            .data(layout.groups)
            .enter().append("g")
            .attr("class", "group")
            .on("mouseover", fade(.1))
            .on("mouseout", fade(1));

        group.append("path")
            .style("fill", function (d) {
                return model.getColor(d);
            })
            .style("stroke", function (d) {
                return model.getColor(d);
            })
            .attr("id", function (d) {
                return "group" + d.index;
            })
            .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius));

        group.append("title").text(function (d) {
            return model.getTitle(d);
        });

        group.append("svg:text")
            .attr("x", 6)
            .attr("dy", 20)
            //.filter(function(d) { return d.value > 110; })
            .append("svg:textPath")
            .attr("xlink:href", function (d) {
                return "#group" + d.index;
            })
            .text(function (d) {
                return model.getLabel(d);
            });

        svg.append("g")
            .attr("class", "chord")
            .selectAll("path")
            .data(layout.chords)
            .enter().append("path")
            .attr("d", d3.svg.chord().radius(innerRadius))
            .style("fill", function (d) {
                return model.getColor(d.target);
            })
            .style("opacity", 1).append("svg:title")
            .text(function (d) {
                return `${model.getLabel(d.source)} -> ${model.getLabel(d.target)} = ${d.source.value}\n`
                    + `${model.getLabel(d.target)} -> ${model.getLabel(d.source)} = ${d.target.value}`;
            });
        ;


        function fade(opacity) {
            return function (g, i) {
                svg.selectAll(".chord path")
                    .filter(function (d) {
                        return d.source.index != i && d.target.index != i;
                    })
                    .transition()
                    .style("opacity", opacity);
            };
        }

    }
}