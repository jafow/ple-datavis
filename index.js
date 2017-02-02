/* global d3 data */
var d = data
var svg = d3.select('svg')
var margin = { top: 20, right: 20, bottom: 20, left: 20 }
var width = Number(svg.attr('width')) - margin.left - margin.right
var height = Number(+svg.attr('height')) - margin.top - margin.bottom
var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleTime().rangeRound([0, width])
var y = d3.scaleLinear().rangeRound([height, 0])

var l = d3.line()
  .x(function (d) { return x(d.date) })
  .y(function (d) { return y(d.output.bm_count) })

x.domain(d3.extent(d, (_d) => d.date))
y.domain(d3.extent(d, (_d) => d.output.bm_count))

g.data(d)
  .enter()
  .append('g')

