/* global d3 data */
var d = data

d3.select('.axis-y')
  .selectAll('div')
  .data(d)
  .enter().append('div')
  .text(function (n) {
    return `${n.date} `
  })

