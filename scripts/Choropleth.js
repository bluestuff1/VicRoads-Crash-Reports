/**
 *	Author: Klim Huynh 101634015
 *	Target: index.html
 *	Purpose: This contains functions required to draw the choropleth map
 *	Created: 23/05/2019
 *	Last updated: 03/06/2019
 *	Credits:
 */

"use strict";

function choropleth() {
    var w = 500;
    var h = 300;
    var data;
    var json;

    //Define map projection
    var projection = d3.geoMercator()
        .center([145, -36.5])
        .translate([w / 2, h / 2])
        .scale(2450);

    //Define path generator
    var path = d3.geoPath()
        .projection(projection);

    //Define quantize scale to sort data values into colour scheme
    var color = d3.scaleQuantize()
        .range(["rgb(255,255,178)", "rgb(254,217,118)", "rgb(254,178,76)", "rgb(253,141,60)", "rgb(252,78,42)", "rgb(227,26,28)", "rgb(177,0,38)"]);

    var svg = d3.select("#choropleth")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "grey");

    d3.csv("./data/VIC_LGA_accidents.csv").then(function (dataset) {
        data = dataset;

        color.domain([
            d3.min(data, function (d) {
                return d.accidents_2014;
            }),
            d3.max(data, function (d) {
                return d.accidents_2014;
            })
        ]);
    });

    //Loads in GeoJSON data
    d3.json("./data/LGA_VIC.json").then(function (datajson) {
        json = datajson;
        //Merge the accidents data and GeoJSON
        //Loop through once for each accidents data value
        for (var i = 0; i < data.length; i++) {

            //Grab LGA name
            var dataLGA = data[i].LGA_2014;

            //Grab accidents value, and convert from string to float
            var dataAccidents = parseInt(data[i].accidents_2014);

            //Find the corresponding LGA name inside the GeoJSON
            for (var j = 0; j < json.features.length; j++) {
                var jsonLGA = json.features[j].properties.LGA_name;

                if (dataLGA == jsonLGA) {

                    //Copy the data value into the JSON
                    //Creating a new value column in JSON data
                    json.features[j].properties.accidents = dataAccidents;

                    //Stop looking through the JSON
                    break;
                }
            }
        }

        //Bind data and create one path per GeoJSON feature
        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                //Get data value
                var accidents = d.properties.accidents;

                //If value exists
                if (accidents) {
                    return color(accidents);
                } else {
                    return "#ccc";
                }
            });
    });
}