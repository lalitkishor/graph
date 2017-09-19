import React, { Component } from 'react';
var d3  = require("d3");
var w = 400 ;
var h = 50;
var monthlySales = [
    {"month":10,"sales":20,"s":5},
    {"month":20,"sales":14,"s":6},
    {"month":30,"sales":20,"s":7},
    {"month":40,"sales":21,"s":8},
    {"month":50,"sales":15,"s":9},
    {"month":60,"sales":13,"s":10},
    {"month":70,"sales":8,"s":11},
    {"month":80,"sales":6,"s":12},
    {"month":90,"sales":33,"s":13},
];
var x = d3.time.scale()
    .range([0, w]);
var y = d3.scale.linear()
    .range([h, 0]);    
var y2 = d3.scale.linear()
    .range([h, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");   
var yAxis2 = d3.svg.axis()
    .scale(y2)
    .orient("left");
var line1 = d3.svg.line()
    .x(function(d) { return x(d.month); })
    .y(function(d) { return y(d.sales); });

var line2 = d3.svg.line()
    .x(function(d) { return x(d.month); })
    .y(function(d) { return y2(d.s); });
var line  = d3.svg.line()
            .x(function(d){return d.month*4;})
            .y(function(d){return h-d.sales;})
            .interpolate("linear");
var svg = d3.select("body").append("svg").attr({
"width":w,
"height":h
});
var label = svg.selectAll("text").data(monthlySales).enter().append("text")
.text(function(d){return d.sales}).attr({
    x:(function(d){return d.month*4}),
    y:(function(d){return h-d.sales})
}); 
var path = svg.append("path").attr({
    d:line(monthlySales),
    "fill":"none",
    "stroke":"blue"
});

d3.json(monthlySales,function(err,data){
    x.domain(d3.extent(monthlySales, function(d) { return d.month; }));
   // y.domain(d3.extent(monthlySales, function(d) { return d.sales; })); // [25, 130]
   // y2.domain(d3.extent(monthlySales, function(d) { return d.s; })); // [0, 65]
    svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis).append("text").text("xaxis");
    svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Value1");

      svg.append("g")
          .attr("class", "y2 axis")
          .attr("transform", "translate(-40,0)") // second axis a little to the left
          .call(yAxis2)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Value2");
    svg.append("path")
          .datum(monthlySales)
          .attr("class", "line1")
          .attr("d", line1);
    svg.append("path")
          .datum(monthlySales)
          .attr("class", "line2")
          .attr("d", line2);
});
class LinearGraph extends Component{
   render(){
       return(<div id="body">
       </div>);
   } 
}
export default LinearGraph;