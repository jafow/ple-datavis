/* global d3 */

var svg = d3.select('svg')
var margin = { top: 20, right: 20, bottom: 20, left: 20 }
var width = Number(svg.attr('width')) - margin.left - margin.right
var height = Number(+svg.attr('height')) - margin.top - margin.bottom
var g = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

var parseTime = d3.timeParse('%d-%b-%y')

var x = d3.scaleTime().rangeRound([0, width])
var y = d3.scaleLinear().rangeRound([height, 0])

var l = d3.line()
  .x(function (d) { return x(parseTime(d.date)) })
  .y(function (d) { return y(d.output) })

d3.json('./clean2.json', function (err, data) {
  if (err) throw err
  var formatted = data.map(d => ({date: parseTime(d.date), bc: d.bc}))

  x.domain(d3.extent(formatted, (d) => d.date))
  y.domain(d3.extent(formatted, (d) => d.bc))

  g.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x))
  .select('.domain')
    // .remove()

  g.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 6)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')

  g.append('path')
    .datum(formatted)
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('d', l)
    // .attr('stroke-linejoin', 'round')
    // .attr('stroke-linecap', 'round')
    // .attr('stroke-width', 1.5)
})
