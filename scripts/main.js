/**
 *	Author: Klim Huynh 101634015
 *	Target: index.html
 *	Purpose: This is the main file where the csv file is read and sorted. It sends the necessary data to other functions.
 *	Created: 22/04/2019
 *	Last updated: 03/06/2019
 *	Credits:
 */

"use strict";

//Given the dataset and year this will return a dictionary with the number of accidents that occur in each LGA
//It was used to extract data and put into a CSV file, which was later used by the choropleth 
function accidentByLGA(dataset, year) {
    var tempDict = {};
    var LGA;

    for (var i = 0; i < dataset[year].length; i++) {
        if (dataset[year][i]["LGA"] in tempDict) {
            LGA = dataset[year][i]["LGA"];
            tempDict[LGA]++;

        }
        else {
            LGA = dataset[year][i]["LGA"];
            tempDict[LGA] = 1;
        }

    }

    return tempDict;
}

//Creating array if it exists
function sortDictionary(dataset) {
    var tempDict = {};

    var array2014 = [];
    var array2015 = [];
    var array2016 = [];
    var array2017 = [];
    var array2018 = [];

    //Created for testing purposes
    var errorCount
    errorCount = 0;

    for (var i = 0; i < dataset.length; i++) {
        if (dataset[i].Year == "2014") {
            array2014.push(dataset[i]);
        }
        else if (dataset[i].Year == "2015") {
            array2015.push(dataset[i]);
        }
        else if (dataset[i].Year == "2016") {
            array2016.push(dataset[i]);
        }
        else if (dataset[i].Year == "2017") {
            array2017.push(dataset[i]);
        }
        else if (dataset[i].Year == "2018") {
            array2018.push(dataset[i]);
        }
        else {
            // For testing only
            errorCount++;
        }
    }

    tempDict["2014"] = array2014;
    tempDict["2015"] = array2015;
    tempDict["2016"] = array2016;
    tempDict["2017"] = array2017;
    tempDict["2018"] = array2018;

    return tempDict;
}

function init() {
    var yearSelectedBar = document.getElementById("yearSelectedBar").value;
    var regionSelectedBar = document.getElementById("regionSelectedBar").value;
    var yearSelectedHeatmap = document.getElementById("yearSelectedHeatmap").value;
    var injurySelectedHeatmap = document.getElementById("injurySelectedHeatmap").value;

    var rowConverter = function (d) {
        return {
            ID: parseInt(d.ID),
            Accident: d.ACCIDENT_TYPE.toString(),
            LGA: d.LGA_NAME.toString(),
            Region: d.REGION_NAME.toString(),
            Year: d.ACCIDENT_DATE.toString().slice(6, 10),
            AlcoholR: d.ALCOHOL_RELATED.toString(),
            AlcoholT: d.ALCOHOLTIME.toString(),
            DayOfWeek: d.DAY_OF_WEEK.toString(),
            AccidentHour: parseInt(d.ACCIDENT_HOUR),
            InjureOrFatal: parseInt(d.INJ_OR_FATAL),
            Fatality: parseInt(d.FATALITY),
            SeriousInjury: parseInt(d.SERIOUSINJURY),
            OtherInjury: parseInt(d.OTHERINJURY),
            NonInjured: parseInt(d.NONINJURED)
        };
    };

    //Load in dataset
    d3.csv("./data/Crashes_Last_Five_Years.csv", rowConverter).then(function (data) {
        var dataset = sortDictionary(data);
        var alcoholData = checkAlcohol(dataset);
        var accidentRegion = accidentByRegion(dataset, yearSelectedBar, regionSelectedBar);

        stackedBarChart(alcoholData, dataset);
        barChart(accidentRegion, yearSelectedBar, regionSelectedBar, dataset);
    });

    choropleth();
    heatmap(yearSelectedHeatmap, injurySelectedHeatmap);
}
window.onload = init;