/**
 *	Author: Klim Huynh 101634015
 *	Target: index.html
 *	Purpose: This contains functions required to draw the bar chart
 *	Created: 21/05/2019
 *	Last updated: 03/06/2019
 *	Credits:
 */

"use strict";

//regionP is used to differentiate between the region parameter and region variable 
function barChart(dataset, year, regionP, originalDataset) {
    var region;

    switch (regionP) {
        case "EASTERN_REGION":
            region = "Eastern";
            break;
        case "METROPOLITAN_NORTH_WEST_REGION":
            region = "Metropolitan North West";
            break;
        case "METROPOLITAN_SOUTH_EAST_REGION":
            region = "Metropolitan South East";
            break;
        case "NORTH_EASTERN_REGION":
            region = "North Eastern";
            break;
        case "NORTHERN_REGION":
            region = "Northern";
            break;
        case "SOUTH_WESTERN_REGION":
            region = "South Western";
            break;
        case "WESTERN_REGION":
            region = "Western";
            break;
        default:
            console.log("barChart function - region not detected");
    }

    var margin = { top: 100, right: 10, bottom: 90, left: 100 };

    var width = 960 - margin.left - margin.right;

    var height = 510 - margin.top - margin.bottom;

    var xScale = d3.scaleBand()
        .domain(dataset.map(function (d) { return d.accident_type; }))
        .rangeRound([0, width])
        .padding(0.05);

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, function (d) { return d.count; })])
        .range([height, 0]);

    var xAxis = d3.axisBottom()
        .scale(xScale);

    var yAxis = d3.axisLeft()
        .scale(yScale);

    var svg = d3.select("#barchart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g").attr("class", "container")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //Chart title
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("text-decoration", "underline")
        .text("Accidents Recorded by Year: " + year + " and Region: " + region);

    //X-axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height) + ")")
        .call(xAxis)
        .selectAll("text")
        .call(wrap, xScale.bandwidth());

    //Y-axis
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

    //Bars
    svg.selectAll(".rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return xScale(d.accident_type); })
        .attr("width", xScale.bandwidth())
        .attr("y", function (d) { return yScale(d.count); })
        .attr("height", function (d) {
            return height - yScale(d.count)
        });

    // Controls the text labels at the top of each bar.
    svg.selectAll(".text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (function (d) { return xScale(d.accident_type) + xScale.bandwidth() / 2; }))
        .attr("y", function (d) { return yScale(d.count) - 7; })
        .attr("dy", ".75em")
        .text(function (d) { return d.count; });

    d3.select("#submitBar")
        .on("click", function () {
            var yearSelected = document.getElementById("yearSelectedBar").value;
            var regionSelected = document.getElementById("regionSelectedBar").value;

            switch (regionSelected) {
                case "EASTERN_REGION":
                    region = "Eastern";
                    break;
                case "METROPOLITAN_NORTH_WEST_REGION":
                    region = "Metropolitan North West";
                    break;
                case "METROPOLITAN_SOUTH_EAST_REGION":
                    region = "Metropolitan South East";
                    break;
                case "NORTH_EASTERN_REGION":
                    region = "North Eastern";
                    break;
                case "NORTHERN_REGION":
                    region = "Northern";
                    break;
                case "SOUTH_WESTERN_REGION":
                    region = "South Western";
                    break;
                case "WESTERN_REGION":
                    region = "Western";
                    break;
                default:
                    console.log("barChart function - region not detected");
            }

            dataset = accidentByRegion(originalDataset, yearSelected, regionSelected);

            svg.selectAll("*").remove();

            xScale.domain(dataset.map(function (d) { return d.accident_type; }))
            yScale.domain([0, d3.max(dataset, function (d) { return d.count; })])

            xAxis = d3.axisBottom()
                .scale(xScale);

            yAxis = d3.axisLeft()
                .scale(yScale);

            //Chart title
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - (margin.top / 2))
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style("font-weight", "bold")
                .style("text-decoration", "underline")
                .text("Accidents Recorded by Year: " + year + " and Region: " + region);

            //X-axis
            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (height) + ")")
                .call(xAxis)
                .selectAll("text")
                .call(wrap, xScale.bandwidth());

            //Y-axis
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

            //Bars
            svg.selectAll(".rect")
                .data(dataset)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return xScale(d.accident_type); })
                .attr("width", xScale.bandwidth())
                .attr("y", function (d) { return yScale(d.count); })
                .attr("height", function (d) {
                    return height - yScale(d.count)
                });

            // Controls the text labels at the top of each bar.
            svg.selectAll(".text")
                .data(dataset)
                .enter()
                .append("text")
                .attr("class", "label")
                .attr("x", (function (d) { return xScale(d.accident_type) + xScale.bandwidth() / 2; }))
                .attr("y", function (d) { return yScale(d.count) - 7; })
                .attr("dy", ".75em")
                .text(function (d) { return d.count; });
        });



}

function accidentByRegion(dataset, year, regionSelected) {
    var accidentCounters = [];
    var errorCount = 0; //Testing purpose
    var count1, count2, count3, count4, count5, count6, count7, count8, count9;
    count1 = count2 = count3 = count4 = count5 = count6 = count7 = count8 = count9 = 0;

    errorCount = 0;

    for (var j = 0; j < dataset[year].length; j++) {
        switch (regionSelected) {
            case "EASTERN_REGION":
                if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "Collision with a fixed object")) {
                    count1++;
                }
                else if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "collision with some other object")) {
                    count2++;
                }
                else if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "Collision with vehicle")) {
                    count3++;
                }
                else if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "Fall from or in moving vehicle")) {
                    count4++;
                }
                else if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "No collision and no object struck")) {
                    count5++;
                }
                else if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "Other accident")) {
                    count6++;
                }
                else if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "Struck animal")) {
                    count7++;
                }
                else if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "Struck Pedestrian")) {
                    count8++;
                }
                else if ((dataset[year][j]["Region"] == "EASTERN REGION") && (dataset[year][j]["Accident"] == "Vehicle overturned (no collision)")) {
                    count9++;
                }
                break;
            case "METROPOLITAN_NORTH_WEST_REGION":
                if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "Collision with a fixed object")) {
                    count1++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "collision with some other object")) {
                    count2++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "Collision with vehicle")) {
                    count3++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "Fall from or in moving vehicle")) {
                    count4++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "No collision and no object struck")) {
                    count5++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "Other accident")) {
                    count6++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "Struck animal")) {
                    count7++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "Struck Pedestrian")) {
                    count8++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN NORTH WEST REGION") && (dataset[year][j]["Accident"] == "Vehicle overturned (no collision)")) {
                    count9++;
                }
                break;
            case "METROPOLITAN_SOUTH_EAST_REGION":
                if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "Collision with a fixed object")) {
                    count1++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "collision with some other object")) {
                    count2++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "Collision with vehicle")) {
                    count3++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "Fall from or in moving vehicle")) {
                    count4++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "No collision and no object struck")) {
                    count5++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "Other accident")) {
                    count6++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "Struck animal")) {
                    count7++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "Struck Pedestrian")) {
                    count8++;
                }
                else if ((dataset[year][j]["Region"] == "METROPOLITAN SOUTH EAST REGION") && (dataset[year][j]["Accident"] == "Vehicle overturned (no collision)")) {
                    count9++;
                }
                break;
            case "NORTH_EASTERN_REGION":
                if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "Collision with a fixed object")) {
                    count1++;
                }
                else if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "collision with some other object")) {
                    count2++;
                }
                else if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "Collision with vehicle")) {
                    count3++;
                }
                else if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "Fall from or in moving vehicle")) {
                    count4++;
                }
                else if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "No collision and no object struck")) {
                    count5++;
                }
                else if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "Other accident")) {
                    count6++;
                }
                else if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "Struck animal")) {
                    count7++;
                }
                else if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "Struck Pedestrian")) {
                    count8++;
                }
                else if ((dataset[year][j]["Region"] == "NORTH EASTERN REGION") && (dataset[year][j]["Accident"] == "Vehicle overturned (no collision)")) {
                    count9++;
                }
                break;
            case "NORTHERN_REGION":
                if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "Collision with a fixed object")) {
                    count1++;
                }
                else if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "collision with some other object")) {
                    count2++;
                }
                else if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "Collision with vehicle")) {
                    count3++;
                }
                else if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "Fall from or in moving vehicle")) {
                    count4++;
                }
                else if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "No collision and no object struck")) {
                    count5++;
                }
                else if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "Other accident")) {
                    count6++;
                }
                else if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "Struck animal")) {
                    count7++;
                }
                else if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "Struck Pedestrian")) {
                    count8++;
                }
                else if ((dataset[year][j]["Region"] == "NORTHERN REGION") && (dataset[year][j]["Accident"] == "Vehicle overturned (no collision)")) {
                    count9++;
                }
                break;
            case "SOUTH_WESTERN_REGION":
                if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "Collision with a fixed object")) {
                    count1++;
                }
                else if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "collision with some other object")) {
                    count2++;
                }
                else if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "Collision with vehicle")) {
                    count3++;
                }
                else if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "Fall from or in moving vehicle")) {
                    count4++;
                }
                else if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "No collision and no object struck")) {
                    count5++;
                }
                else if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "Other accident")) {
                    count6++;
                }
                else if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "Struck animal")) {
                    count7++;
                }
                else if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "Struck Pedestrian")) {
                    count8++;
                }
                else if ((dataset[year][j]["Region"] == "SOUTH WESTERN REGION") && (dataset[year][j]["Accident"] == "Vehicle overturned (no collision)")) {
                    count9++;
                }
                break;
            case "WESTERN_REGION":
                if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "Collision with a fixed object")) {
                    count1++;
                }
                else if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "collision with some other object")) {
                    count2++;
                }
                else if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "Collision with vehicle")) {
                    count3++;
                }
                else if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "Fall from or in moving vehicle")) {
                    count4++;
                }
                else if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "No collision and no object struck")) {
                    count5++;
                }
                else if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "Other accident")) {
                    count6++;
                }
                else if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "Struck animal")) {
                    count7++;
                }
                else if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "Struck Pedestrian")) {
                    count8++;
                }
                else if ((dataset[year][j]["Region"] == "WESTERN REGION") && (dataset[year][j]["Accident"] == "Vehicle overturned (no collision)")) {
                    count9++;
                }
                break;
            default:
                errorCount++;
        }
    }

    accidentCounters.push({ "accident_type": "Collision With A Fixed Object", "count": count1 });
    accidentCounters.push({ "accident_type": "Collision With Some Other Object", "count": count2 });
    accidentCounters.push({ "accident_type": "Collision With Vehicle", "count": count3 });
    accidentCounters.push({ "accident_type": "Fall From Or In Moving Vehicle", "count": count4 });
    accidentCounters.push({ "accident_type": "No Collision And No Object Struck", "count": count5 });
    accidentCounters.push({ "accident_type": "Other Accident", "count": count6 });
    accidentCounters.push({ "accident_type": "Struck Animal", "count": count7 });
    accidentCounters.push({ "accident_type": "Struck Pedestrian", "count": count8 });
    accidentCounters.push({ "accident_type": "Vehicle Overturned", "count": count9 });

    return accidentCounters;
}

//Text wrapping for cateogory names
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1, // ems
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
}