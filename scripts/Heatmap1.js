/**
 *	Author: Klim Huynh 101634015
 *	Target: index.html
 *	Purpose: This contains functions required to draw the heatmap chart
 *	Created: 21/05/2019
 *	Last updated: 03/06/2019
 *	Credits:
 */

"use strict";

function heatmap(yearSelectedHeatmap, injurySelectedHeatMap) {
    var file;
    if (yearSelectedHeatmap == "2014") {
        if (injurySelectedHeatMap == "InjureOrFatal") {
            file = "./data/InjureOrFatal2014.json";
        }
        if (injurySelectedHeatMap == "Fatality") {
            file = "./data/Fatality2014.json";
        }
        if (injurySelectedHeatMap == "SeriousInjury") {
            file = "./data/SeriousInjury2014.json";
        }
        if (injurySelectedHeatMap == "OtherInjury") {
            file = "./data/OtherInjury2014.json";
        }
        if (injurySelectedHeatMap == "NonInjured") {
            file = "./data/NonInjured2014.json";
        }
    }
    else if (yearSelectedHeatmap == "2015") {
        if (injurySelectedHeatMap == "InjureOrFatal") {
            file = "./data/InjureOrFatal2015.json";
        }
        if (injurySelectedHeatMap == "Fatality") {
            file = "./data/Fatality2015.json";
        }
        if (injurySelectedHeatMap == "SeriousInjury") {
            file = "./data/SeriousInjury2015.json";
        }
        if (injurySelectedHeatMap == "OtherInjury") {
            file = "./data/OtherInjury2015.json";
        }
        if (injurySelectedHeatMap == "NonInjured") {
            file = "./data/NonInjured2015.json";
        }
    }
    else if (yearSelectedHeatmap == "2016") {
        if (injurySelectedHeatMap == "InjureOrFatal") {
            file = "./data/InjureOrFatal2016.json";
        }
        if (injurySelectedHeatMap == "Fatality") {
            file = "./data/Fatality2016.json";
        }
        if (injurySelectedHeatMap == "SeriousInjury") {
            file = "./data/SeriousInjury2016.json";
        }
        if (injurySelectedHeatMap == "OtherInjury") {
            file = "./data/OtherInjury2016.json";
        }
        if (injurySelectedHeatMap == "NonInjured") {
            file = "./data/NonInjured2016.json";
        }
    }
    else if (yearSelectedHeatmap == "2017") {
        if (injurySelectedHeatMap == "InjureOrFatal") {
            file = "./data/InjureOrFatal2017.json";
        }
        if (injurySelectedHeatMap == "Fatality") {
            file = "./data/Fatality2017.json";
        }
        if (injurySelectedHeatMap == "SeriousInjury") {
            file = "./data/SeriousInjury2017.json";
        }
        if (injurySelectedHeatMap == "OtherInjury") {
            file = "./data/OtherInjury2017.json";
        }
        if (injurySelectedHeatMap == "NonInjured") {
            file = "./data/NonInjured2017.json";
        }
    }
    else if (yearSelectedHeatmap == "2018") {
        if (injurySelectedHeatMap == "InjureOrFatal") {
            file = "./data/InjureOrFatal2018.json";
        }
        if (injurySelectedHeatMap == "Fatality") {
            file = "./data/Fatality2018.json";
        }
        if (injurySelectedHeatMap == "SeriousInjury") {
            file = "./data/SeriousInjury2018.json";
        }
        if (injurySelectedHeatMap == "OtherInjury") {
            file = "./data/OtherInjury2018.json";
        }
        if (injurySelectedHeatMap == "NonInjured") {
            file = "./data/NonInjured2018.json";
        }
    }
    else {

    }

    var dataset;
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        times = d3.range(24);

    var margin = { top: 40, right: 50, bottom: 70, left: 50 };

    // calculate width and height based on window size
    var w = Math.max(Math.min(window.innerWidth, 1000), 500) - margin.left - margin.right - 20;
    var gridSize = Math.floor(w / times.length);
    var h = gridSize * (days.length + 2);

    //reset the overall font size
    var newFontSize = w * 62.5 / 900;
    d3.select("html").style("font-size", newFontSize + "%");

    // svg container
    var svg = d3.select("#heatmap1")
        .append("svg")
        .attr("width", w + margin.top + margin.bottom)
        .attr("height", h + margin.left + margin.right)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // linear colour scale
    var colours = d3.scaleLinear()
        .domain(d3.range(1, 30, 1))
        .range(["rgb(246,239,247)", "rgb(189,201,225)", "rgb(103,169,207)", "rgb(28,144,153)", "rgb(1,108,89)"]);

    var dayLabels = svg.selectAll(".dayLabel")
        .data(days)
        .enter()
        .append("text")
        .text(function (d) { return d; })
        .attr("x", 0)
        .attr("y", function (d, i) { return i * gridSize; })
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + gridSize / 1.5 + ")");

    var timeLabels = svg.selectAll(".timeLabel")
        .data(times)
        .enter()
        .append("text")
        .text(function (d) { return d; })
        .attr("x", function (d, i) { return i * gridSize; })
        .attr("y", 0)
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + gridSize / 2 + ", -6)");

    // load data
    d3.json(file).then(function (data) {
        data.forEach(function (d) {
            d.day = +d.day;
            d.hour = +d.hour;
            d.value = +d.value;
        });
        dataset = data;

        // group data by region
        var nest = d3.nest()
            .key(function (d) { return d.region; })
            .entries(dataset);

        // array of regions in the data
        var regions = nest.map(function (d) { return d.key; });
        var currentregionIndex = 0;

        // create region dropdown menu
        var regionMenu = d3.select("#regionDropdown");
        regionMenu
            .append("select")
            .attr("id", "regionMenu")
            .selectAll("option")
            .data(regions)
            .enter()
            .append("option")
            .attr("value", function (d, i) { return i; })
            .text(function (d) { return d; });

        // function to create the initial heatmap
        var drawHeatmap = function (region) {

            // filter the data to return object of region of interest
            var selectregion = nest.find(function (d) {
                return d.key == region;
            });

            var heatmap = svg.selectAll(".hour")
                .data(selectregion.values)
                .enter()
                .append("rect")
                .attr("x", function (d) { return (d.hour) * gridSize; })
                .attr("y", function (d) { return (d.day - 1) * gridSize; })
                .attr("class", "hour bordered")
                .attr("width", gridSize)
                .attr("height", gridSize)
                .style("stroke", "white")
                .style("stroke-opacity", 0.6)
                .style("fill", function (d) { return colours(d.value); });
        }
        drawHeatmap(regions[currentregionIndex]);

        d3.select("#submitHeatmap")

        var updateHeatmap = function (region) {
            console.log("currentregionIndex: " + currentregionIndex)
            // filter data to return object of region of interest
            var selectregion = nest.find(function (d) {
                return d.key == region;
            });

            // update the data and redraw heatmap
            var heatmap = svg.selectAll(".hour")
                .data(selectregion.values)
                .transition()
                .duration(500)
                .style("fill", function (d) { return colours(d.value); });
        }

        // run update function when dropdown selection changes
        regionMenu.on("change", function () {
            // find which region was selected from the dropdown
            var selectedregion = d3.select(this)
                .select("select")
                .property("value");
            currentregionIndex = +selectedregion;
            // run update function with selected region
            updateHeatmap(regions[currentregionIndex]);
        });


    });
}

// The function below was used to produce JSON individual files in order to produce the heatmap
function casualtiesByRegion(dataset, yearSelected, regionSelected, injurySelected) {
    var tempArray = [];
    var errorCount1 = 0; // This is for testing
    var errorCount2 = 0; // This is for testing
    var dotw;
    var temp;

    for (var i = 0; i < dataset[yearSelected].length; i++) {
        dotw = dataset[yearSelected][i]["DayOfWeek"];
        switch (dotw) {
            case "Monday":
                temp = 1;
                break;
            case "Tuesday":
                temp = 2;
                break;
            case "Wednesday":
                temp = 3;
                break;
            case "Thursday":
                temp = 4;
                break;
            case "Friday":
                temp = 5;
                break;
            case "Saturday":
                temp = 6;
                break;
            case "Sunday":
                temp = 7;
                break;
            default:
                errorCount1++;
        }

        switch (regionSelected) {
            case "EASTERN_REGION":
                if (dataset[yearSelected][i]["Region"] == "EASTERN REGION") {
                    tempArray.push({
                        "region": "Eastern",
                        "day": temp,
                        "hour": dataset[yearSelected][i]["AccidentHour"],
                        "value": dataset[yearSelected][i][injurySelected]
                    });
                }
                break;
            case "METROPOLITAN_NORTH_WEST_REGION":
                if (dataset[yearSelected][i]["Region"] == "METROPOLITAN NORTH WEST REGION") {
                    tempArray.push({
                        "region": "Metropolitan North West",
                        "day": temp,
                        "hour": dataset[yearSelected][i]["AccidentHour"],
                        "value": dataset[yearSelected][i][injurySelected]
                    });
                }
                break;
            case "METROPOLITAN_SOUTH_EAST_REGION":
                if (dataset[yearSelected][i]["Region"] == "METROPOLITAN SOUTH EAST REGION") {
                    tempArray.push({
                        "region": "Metropolitan South East",
                        "day": temp,
                        "hour": dataset[yearSelected][i]["AccidentHour"],
                        "value": dataset[yearSelected][i][injurySelected]
                    });
                }
                break;
            case "NORTH_EASTERN_REGION":
                if (dataset[yearSelected][i]["Region"] == "NORTH EASTERN REGION") {
                    tempArray.push({
                        "region": "North Eastern",
                        "day": temp,
                        "hour": dataset[yearSelected][i]["AccidentHour"],
                        "value": dataset[yearSelected][i][injurySelected]
                    });
                }
                break;
            case "NORTHERN_REGION":
                if (dataset[yearSelected][i]["Region"] == "NORTHERN REGION") {
                    tempArray.push({
                        "region": "Northern",
                        "day": temp,
                        "hour": dataset[yearSelected][i]["AccidentHour"],
                        "value": dataset[yearSelected][i][injurySelected]
                    });
                }
                break;
            case "SOUTH_WESTERN_REGION":
                if (dataset[yearSelected][i]["Region"] == "SOUTH WESTERN REGION") {
                    tempArray.push({
                        "region": "South Western",
                        "day": temp,
                        "hour": dataset[yearSelected][i]["AccidentHour"],
                        "value": dataset[yearSelected][i][injurySelected]
                    });
                }
                break;
            case "WESTERN_REGION":
                if (dataset[yearSelected][i]["Region"] == "WESTERN REGION") {
                    tempArray.push({
                        "region": "Western",
                        "day": temp,
                        "hour": dataset[yearSelected][i]["AccidentHour"],
                        "value": dataset[yearSelected][i][injurySelected]
                    });
                }
                break;
            default:
                errorCount2++;
        }
    }
    return tempArray;
}