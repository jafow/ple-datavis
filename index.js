/* global d3 data */
// var d = data
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
  .y(function (d) { return y(d.output) })


d3.json('data.json', function (err, _data) {
  if (err) throw err

  x.domain(d3.extent(_data, (d) => d.date))
  y.domain(d3.extent(_data, (d) => Number(d.output.bm_count)))

  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove()

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")

  g.append("path")
    .datum(_data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", l)
})
