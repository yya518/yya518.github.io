var margin = { top: 50, right: 300, bottom: 50, left: 50 },
    outerWidth = 1650,
    outerHeight = 800,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();


var xValue = function(d) { return d.x;}, // data -> value
    xScale = d3.scale.linear().range([0, width]); // value -> display
var yValue = function(d) {return d.y;}, // data -> value
    yScale = d3.scale.linear().range([height, 0]); // value -> display

/*
var xCat = "Calories",
    yCat = "Potassium",
    rCat = "Protein (g)",
    colorCat = "Manufacturer";
*/

d3.csv("fb.csv", function(error, data) {

  // change string (from CSV) into number format
  data.forEach(function(d) {
    d.x = +d.x;
    d.y = +d.y
    //console.log(d);
  });

  var xMax = d3.max(data, function(d) { return d.x; }) * 1.05,
      xMin = d3.min(data, function(d) { return d.x; }),
      xMin = xMin > 0 ? 0 : xMin,
      yMax = d3.max(data, function(d) { return d.y; }) * 1.05,
      yMin = d3.min(data, function(d) { return d.y; }),
      yMin = yMin > 0 ? 0 : yMin;

  x.domain([xMin, xMax]);
  y.domain([yMin, yMax]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom")
      .tickSize(-height);

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .tickSize(-width);

  var color = d3.scale.category10();

/*  var tip = d3.tip()
      .attr("class", "d3-tip")
      .offset([-10, 0])
      .html(function(d) {
        return "<b>" + d["brand"]  + "<b/>";
      });
*/
  var zoomBeh = d3.behavior.zoom()
      .x(x)
      .y(y)
      .scaleExtent([0, 500])
      .on("zoom", zoom);

  var svg = d3.select("#scatter")
    .append("svg")
      .attr("width", outerWidth)
      .attr("height", outerHeight)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(zoomBeh);

 // svg.call(tip);

  svg.append("rect")
      .attr("width", width)
      .attr("height", height);

  svg.append("g")
      .classed("x axis", true)
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .append("text")
      .classed("label", true)
      .attr("x", width)
      .attr("y", margin.bottom - 10);

  svg.append("g")
      .classed("y axis", true)
      .call(yAxis)
    .append("text")
      .classed("label", true)
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left)
      .attr("dy", ".71em");

  var objects = svg.append("svg")
      .classed("objects", true)
      .attr("width", width)
      .attr("height", height);

  objects.append("svg:line")
      .classed("axisLine hAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", width)
      .attr("y2", 0)
      .attr("transform", "translate(0," + height + ")");

  objects.append("svg:line")
      .classed("axisLine vAxisLine", true)
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", height);


  objects.selectAll(".dot")
      .data(data)
      .enter().append("circle")
      .classed("dot", true)
      .attr("r", 5)
      .attr("transform", transform)
      .style("fill", "#58ACFA");


  svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
                .text(function(d) {
                    return d["brand"];
                })
                .attr("x", function(d) {
                    return d.x;  // Returns scaled location of x
                })
                .attr("y", function(d) {
                   return d.y;  // Returns scaled circle y
                })
                .attr("transform", transform)
                .attr("font_family", "sans-serif")  // Font type
                .attr("font-size", "9px")  // Font size
                .attr("fill", "black");   // Font color
                
      //.on("mouseover", tip.show)
      //.on("mouseout", tip.hide);

/*
  d3.select("input").on("click", change);

  function change() {
    xCat = "Carbs";
    xMax = d3.max(data, function(d) { return d[xCat]; });
    xMin = d3.min(data, function(d) { return d[xCat]; });

    zoomBeh.x(x.domain([xMin, xMax])).y(y.domain([yMin, yMax]));

    var svg = d3.select("#scatter").transition();

    svg.select(".x.axis").duration(750).call(xAxis).select(".label").text(xCat);

    objects.selectAll(".dot").transition().duration(1000).attr("transform", transform);
  }
*/
  function zoom() {
    svg.select(".x.axis").call(xAxis);
    svg.select(".y.axis").call(yAxis);

    svg.selectAll(".dot")
        .attr("transform", transform);

        svg.selectAll("text")
        .attr("transform", transform);
  }

  function transform(d) {
    return "translate(" + x(d.x) + "," + y(d.y) + ")";
  }
});

