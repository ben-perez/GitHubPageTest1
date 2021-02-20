
var megUsesCsvPath = "Asset/MEG Uses.csv";

var megChart = d3.select("#meg-bar-chart");

var margin = 50;
var width = megChart.attr("width") - margin;
var height = megChart.attr("height") - margin;

var xScale = d3.scaleBand().range([0,width]).padding(0.4);
var yScale = d3.scaleLinear().range([height,0]);

d3.csv(megUsesCsvPath, function(err, data) {
    
    if(err){
        throw err;
    }

    xScale.domain(data.map(function(d){return d.Application;}));
    yScale.domain([0, d3.max(data, function(d) { return d.Amount;})])

    var g = megChart.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(xScale));

    g.append("g")
        .call(d3.axisLeft(yScale).tickFormat(function(d){
            return d;
        }).ticks(10))
        .append("text")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");
})
