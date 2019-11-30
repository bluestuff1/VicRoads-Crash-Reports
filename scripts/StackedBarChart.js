/**
 *	Author: Klim Huynh 101634015
 *	Target: index.html
 *	Purpose: This contains functions required to draw the stacked bar chart
 *	Created: 21/05/2019
 *	Last updated: 03/06/2019
 *	Credits:
 */

"use strict";

//The stacked bar chart is used for alcohol-related accidents
//This function is used twice; accidents overall and during AlcoholTime 
//Minimal difference, so there won't be a need use this for the Bar Chart
function stackedBarChart(dataset, originalDataset) {
    var margin = { top: 100, right: 10, bottom: 90, left: 100 };

    var w = 960 - margin.left - margin.right;

    var h = 510 - margin.top - margin.bottom;

    var keys = ["Yes", "No"];

    var status = "Overall";

    // Set up stack method
    var stack = d3.stack()
        .keys(keys)
        .order(d3.stackOrderDescending); //Flip stacking order

    // Stacking dataset
    var series = stack(dataset);

    //Scales
    var xScale = d3
        .scaleBand()
        .domain(d3.range(dataset.length))
        .rangeRound([0, w])
        .paddingInner(0.05);

    var yScale = d3
        .scaleLinear()
        .domain([0,
            d3.max(dataset, function (d) {
                return d.Yes + d.No;
            })
        ])
        .range([h, 0]);

    var xAxis = d3.axisBottom()
        .scale(xScale)

    var yAxis = d3.axisLeft()
        .scale(yScale);

    //Colors 10 step ordinal scale
    // var colors = d3.scaleOrdinal(d3.schemeCategory10);
    var colors = d3.scaleQuantize()
        .range(["rgb(253,174,97)", "rgb(44,123,182)"]);

    var svg = d3.select("#stackedBarChart")
        .append("svg")
        .attr("width", w + margin.left + margin.right)
        .attr("height", h + margin.top + margin.bottom)
        .append("g").attr("class", "container")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var groups = svg.selectAll("g")
        .data(series)
        .enter()
        .append("g")
        .style("fill", function (d, i) {
            return colors(i);
        });

    //Add rectangle for each data value
    var rects = groups.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("y", function (d, i) {
            return yScale(d[1]);
        })
        .attr("height", function (d) {
            return yScale(d[0]) - yScale(d[1]);
        })
        .attr("width", xScale.bandwidth())
        .on("mouseover", function (d) {
            //Get this bar's x/y value, then augment for the tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

            //Create the tooltip label
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text(d);
        })
        .on("mouseover", function (d) {
            //Get this bar's x/y value, then augment for the tooltip
            var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
            var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

            //Create the tooltip label
            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", xPosition)
                .attr("y", yPosition)
                .attr("text-anchor", "middle")
                .attr("font-family", "sans-serif")
                .attr("font-size", "15px")
                .attr("font-weight", "bold")
                .attr("fill", "black")
                .text(d[1]);
        })
        .on("mouseout", function () {
            //Remove the tooltip
            d3.select("#tooltip").remove();
        });

    svg.append("text")
        .attr("x", (w / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .text("Alcohol-Related Accident by Year: " + status);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (h) + ")")
        .call(xAxis)
        .selectAll("text")
        .call(wrap, xScale.bandwidth());

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - 60)
        .attr("dy", ".71em")
        .attr("x", -80)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "middle")
        .text("Number of accidents");

    d3.select("#overall")
        .on("click", function () {
            dataset = checkAlcohol(originalDataset);

            svg.selectAll("*").remove();

            var keys = ["Yes", "No"];

            var status = "Overall";

            // Set up stack method
            var stack = d3.stack()
                .keys(keys)
                .order(d3.stackOrderDescending); //Flip stacking order

            // Stacking dataset
            series = stack(dataset);

            //Scales
            xScale.domain(d3.range(dataset.length))

            yScale.domain([0,
                d3.max(dataset, function (d) {
                    return d.Yes + d.No;
                })
            ])

            xAxis = d3.axisBottom()
                .scale(xScale)

            yAxis = d3.axisLeft()
                .scale(yScale);

            groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .style("fill", function (d, i) {
                    return colors(i);
                });

            //Add rectangle for each data value
            rects = groups.selectAll("rect")
                .data(function (d) {
                    return d;
                })
                .enter()
                .append("rect")
                .attr("x", function (d, i) {
                    return xScale(i);
                })
                .attr("y", function (d, i) {
                    return yScale(d[1]);
                })
                .attr("height", function (d) {
                    return yScale(d[0]) - yScale(d[1]);
                })
                .attr("width", xScale.bandwidth())
                .on("mouseover", function (d) {
                    //Get this bar's x/y value, then augment for the tooltip
                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

                    //Create the tooltip label
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d);
                })
                .on("mouseover", function (d) {
                    //Get this bar's x/y value, then augment for the tooltip
                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

                    //Create the tooltip label
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d[1]);
                })
                .on("mouseout", function () {
                    //Remove the tooltip
                    d3.select("#tooltip").remove();
                });

            svg.append("text")
                .attr("x", (w / 2))
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("font-weight", "bold")
                .style("text-decoration", "underline")
                .text("Alcohol-Related Accident by Year: " + status);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (h) + ")")
                .call(xAxis)
                .selectAll("text")
                .call(wrap, xScale.bandwidth());

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", - 60)
                .attr("dy", ".71em")
                .attr("x", -80)
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "middle")
                .text("Number of accidents");
        });


    d3.select("#duringAlcoholTime")
        .on("click", function () {
            dataset = checkAlcoholDuring(originalDataset);

            svg.selectAll("*").remove();

            var keys = ["Yes", "No"];

            var status = "During Alcohol Time";

            // Set up stack method
            var stack = d3.stack()
                .keys(keys)
                .order(d3.stackOrderDescending); //Flip stacking order

            // Stacking dataset
            series = stack(dataset);

            //Scales
            xScale.domain(d3.range(dataset.length))


            yScale.domain([0,
                d3.max(dataset, function (d) {
                    return d.Yes + d.No;
                })
            ])

            xAxis = d3.axisBottom()
                .scale(xScale)

            yAxis = d3.axisLeft()
                .scale(yScale);

            groups = svg.selectAll("g")
                .data(series)
                .enter()
                .append("g")
                .style("fill", function (d, i) {
                    return colors(i);
                });

            //Add rectangle for each data value
            rects = groups.selectAll("rect")
                .data(function (d) {
                    return d;
                })
                .enter()
                .append("rect")
                .attr("x", function (d, i) {
                    return xScale(i);
                })
                .attr("y", function (d, i) {
                    return yScale(d[1]);
                })
                .attr("height", function (d) {
                    return yScale(d[0]) - yScale(d[1]);
                })
                .attr("width", xScale.bandwidth())
                .on("mouseover", function (d) {
                    //Get this bar's x/y value, then augment for the tooltip
                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

                    //Create the tooltip label
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d);
                })
                .on("mouseover", function (d) {
                    //Get this bar's x/y value, then augment for the tooltip
                    var xPosition = parseFloat(d3.select(this).attr("x")) + xScale.bandwidth() / 2;
                    var yPosition = parseFloat(d3.select(this).attr("y")) + 14;

                    //Create the tooltip label
                    svg.append("text")
                        .attr("id", "tooltip")
                        .attr("x", xPosition)
                        .attr("y", yPosition)
                        .attr("text-anchor", "middle")
                        .attr("font-family", "sans-serif")
                        .attr("font-size", "11px")
                        .attr("font-weight", "bold")
                        .attr("fill", "black")
                        .text(d[1]);
                })
                .on("mouseout", function () {
                    //Remove the tooltip
                    d3.select("#tooltip").remove();
                });


            svg.append("text")
                .attr("x", (w / 2))
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("font-weight", "bold")
                .style("text-decoration", "underline")
                .text("Alcohol-Related Accident by Year: " + status);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (h) + ")")
                .call(xAxis)
                .selectAll("text")
                .call(wrap, xScale.bandwidth());

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", - 60)
                .attr("dy", ".71em")
                .attr("x", -80)
                .attr("fill", "#000")
                .attr("font-weight", "bold")
                .attr("text-anchor", "middle")
                .text("Number of accidents");
        });
}



function checkAlcohol(dataset) {
    var tempArray = [];
    var countYes, countNo;
    var errorCount = 0;
    var years = ["2014", "2015", "2016", "2017", "2018"];

    for (var i = 0; i < years.length; i++) {

        countYes = countNo = 0;

        for (var j = 0; j < dataset[years[i]].length; j++) {

            if (dataset[years[i]][j]["AlcoholR"] == "Yes") {
                countYes++;
            }
            else if (dataset[years[i]][j]["AlcoholR"] == "No") {
                countNo++;
            } else {
                errorCount++;
            }
        }

        tempArray.push({
            Year: years[i],
            Yes: countYes,
            No: countNo
        })
    }

    return tempArray;
}

function checkAlcoholDuring(dataset) {
    var tempArray = [];
    var countYes, countNo;
    var errorCount = 0;
    var years = ["2014", "2015", "2016", "2017", "2018"];

    for (var i = 0; i < years.length; i++) {

        countYes = countNo = 0;

        for (var j = 0; j < dataset[years[i]].length; j++) {

            if (dataset[years[i]][j]["AlcoholT"] == "Yes") {

                if (dataset[years[i]][j]["AlcoholR"] == "Yes") {
                    countYes++;
                }
                else if (dataset[years[i]][j]["AlcoholR"] == "No") {
                    countNo++;
                } else {
                    errorCount++;
                }

            }
        }

        tempArray.push({
            Years: years[i],
            Yes: countYes,
            No: countNo
        })
    }

    return tempArray;
}