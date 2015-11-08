let d3 = require('d3');
let queue = require('./Queue');
let Colors = require('./../../constants/Colors');

require('./cordChart.less');

class CordChartModel {
    constructor(data) {

    }

    getLabel(d) {
        return ['Poland', 'Russia', 'USA', 'England'][d.index];
    }

    getTitle(d) {
        return ['Poland', 'Russia', 'USA', 'England'][d.index] + ' ' + d.value.toFixed(0);
    }

    getMatrix() {
        return [
            [11975, 5871, 8916, 2868],
            [1951, 10048, 2060, 6171],
            [8010, 16145, 8090, 8045],
            [1013, 990, 940, 6907]
        ];
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
                return Colors.getColor(d.index);
            })
            .style("stroke", function (d) {
                return Colors.getColor(d.index);
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
            .attr("dy", 15)
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
                return Colors.getColor(d.target.index);
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