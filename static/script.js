var latitude;
var longitude;

const weathermap = new Map();
const weatherimages = new Map();
var googlemapskey = "";
var ipinfokey = "";

function processweatherinfo()
{
    $.ajax({
        type: 'GET',
        url: '/getgooglemapskey',
        success: function(response){
            googlemapskey = response;
        },
        error: function(xhr){
            onFail();
        }
    });
    $.ajax({
        type: 'GET',
        url: '/getipinfokey',
        success: function(response){
            ipinfokey = response;
        },
        error: function(xhr){
            onFail();
        }
    });
    weathermap.set(1000, 'Clear');
    weathermap.set(1100, 'Mostly Clear');
    weathermap.set(1101, 'Partly Cloudy');
    weathermap.set(1102, 'Mostly Cloudy');
    weathermap.set(1001, 'Cloudy');
    weathermap.set(2000, 'Fog');
    weathermap.set(2100, 'Light Fog');
    weathermap.set(8000, 'Thunderstorm');
    weathermap.set(5001, 'Flurries');
    weathermap.set(5100, 'Light Snow');
    weathermap.set(5000, 'Snow');
    weathermap.set(5101, 'Heavy Snow');
    weathermap.set(7102, 'Light Ice Pellets');
    weathermap.set(7000, 'Ice Pellets');
    weathermap.set(7101, 'Heavy Ice Pellets');
    weathermap.set(4000, 'Drizzle');
    weathermap.set(6000, 'Freezing Drizzle');
    weathermap.set(6200, 'Light Freezing Rain');
    weathermap.set(6001, 'Freezing Rain');
    weathermap.set(6201, 'Heavy Freezing Rain');
    weathermap.set(4200, 'Light Rain');
    weathermap.set(4001, 'Rain');
    weathermap.set(4201, 'Heavy Rain');
    weathermap.set(3000, 'Light Wind');
    weathermap.set(3001, 'Wind');
    weathermap.set(3002, 'Strong Wind');

    weatherimages.set(1000, ['../static/images/clear_day.svg', '../static/images/clear_night.svg']);
    weatherimages.set(1100, ['../static/images/mostly_clear_day.svg','../static/images/mostly_clear_night.svg']);
    weatherimages.set(1101, ['../static/images/partly_cloudy_day.svg','../static/images/partly_cloudy_night.svg']);
    weatherimages.set(1102, ['../static/images/mostly_cloudy.svg']);
    weatherimages.set(1001, ['../static/images/cloudy.svg']); 
    weatherimages.set(2000, ['../static/images/fog.svg']);
    weatherimages.set(2100, ['../static/images/fog_light.svg']);
    weatherimages.set(8000, ['../static/images/tstorm.svg']);
    weatherimages.set(5001, ['../static/images/flurries.svg']);
    weatherimages.set(5100, ['../static/images/snow_light.svg']);
    weatherimages.set(5000, ['../static/images/snow.svg']);
    weatherimages.set(5101, ['../static/images/snow_heavy.svg']);
    weatherimages.set(7102, ['../static/images/ice_pellets_light.svg']);
    weatherimages.set(7000, ['../static/images/ice_pellets.svg']);
    weatherimages.set(7101, ['../static/images/ice_pellets_heavy.svg']);
    weatherimages.set(4000, ['../static/images/drizzle.svg']);
    weatherimages.set(6000, ['../static/images/freezing_drizzle.svg']);
    weatherimages.set(6200, ['../static/images/freezing_rain_light.svg']);
    weatherimages.set(6001, ['../static/images/freezing_rain.svg']);
    weatherimages.set(6201, ['../static/images/freezing_rain_heavy.svg']);
    weatherimages.set(4200, ['../static/images/rain_light.svg']);
    weatherimages.set(4001, ['../static/images/rain.svg']);
    weatherimages.set(4201, ['../static/images/rain_heavy.svg']);
    weatherimages.set(3000, ['../static/images/light_wind.svg']);
    weatherimages.set(3001, ['../static/images/wind.svg']);
    weatherimages.set(3002, ['../static/images/strong_wind.svg']);
}

function showMainCard()
{
    $('#maincard').css('display','block');
}
function hideMainCard()
{
    $('#maincard').css('display','none');
}
function showDaysCard()
{
    $('#dayscard').css('display','block');
}
function hideDaysCard()
{
    $('#dayscard').css('display','none');
}

function showDailyWeatherDetailsCards()
{
    $('#dailydetailsheaderdiv').css('display','block');
    $('#dailydetailsdiv').css('display','block');
    $('#weatherchartsheaderdiv').css('display','block');
    $('#weatherchartsdiv').css('display','block');
    $('#uparrow').css('display','none');
    $('#downarrow').css('display','block');
    $('#arrowdiv').css('display','block');
    
}


function hideDailyWeatherDetailsCards()
{
    $('#dailydetailsheaderdiv').css('display','none');
    $('#dailydetailsdiv').css('display','none');
    $('#weatherchartsheaderdiv').css('display','none');
    $('#weatherchartsdiv').css('display','none');
    $('#downarrow').css('display','none');
    $('#uparrow').css('display','none');
    $('#arrowdiv').css('display','none');
}

function showChartCards()
{
    $('#temperaturerangechartdiv').css('display','block');
    $('#hourlyweatherchartdiv').css('display','block');
}

function hideChartCards()
{
    $('#temperaturerangechartdiv').css('display','none');
    $('#hourlyweatherchartdiv').css('display','none');
}


function goToChartCards()
{
    showChartCards();
    document.getElementById("arrowdiv").scrollIntoView();
    $("#downarrow").css('display', 'none');
    $("#uparrow").css('display', 'block');
}

function collapseChartCards()
{
    hideChartCards();
    $("#uparrow").css('display', 'none');
    $("#downarrow").css('display', 'block');
}

function clearsearchinputs()
{
    document.getElementById("street").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("autodetectlocation").checked = false;

    document.getElementById("street").required = true;
    document.getElementById("city").required = true;
    document.getElementById("state").required = true;

    document.getElementById("street").disabled = false;
    document.getElementById("city").disabled = false;
    document.getElementById("state").disabled = false;

    //TODO:
    // make all of the cards except the input card display : none
    hideMainCard();
    hideDaysCard();
    hideChartCards();
    hideDailyWeatherDetailsCards();
    hideChartCards();
    $("#errordiv").css('display', 'none');
}

function autodetectselected()
{
    //we want to remove the required attributes from inputs and clear them
    var street = document.getElementById("street");
    var city = document.getElementById("city");
    var state = document.getElementById("state");

    //if it is checked, clear
    var checkbox = document.getElementById("autodetectlocation");
    if(checkbox.checked == true)
    {
        street.required = false;
        city.required = false;
        state.required = false;

        street.disabled = true;
        city.disabled = true;
        state.disabled = true;

        street.value = "";
        city.value = "";
        state.value="";
    }
    //if unchecked, make fields required, no need to clear
    else
    {
        street.required = true;
        city.required = true;
        state.required = true;

        street.disabled = false;
        city.disabled = false;
        state.disabled = false;
    }
}

function onSuccess(response, address)
{
    $('#errordiv').css('display','none');

    //____________do main card for current conditions____________
    var starttime = response['data']['timelines'][0]['intervals'][0]['startTime'];
    var currentinfo = response['data']['timelines'][0]['intervals'][0]['values'];
    //location text
    $('#maincard-location').html(address);
    //weather icon and text
    var weathercode = currentinfo['weatherCode'];
    var weathericon = weatherimages.get(weathercode)[0];
    //check if it is one of the night icon cases
    if(weathercode == 1000 || weathercode == 1100 || weathercode == 1101)
    {
        //if the current time is after sunset or before sunrise, it is night
        if(starttime >= currentinfo['sunsetTime'] || starttime < currentinfo['sunriseTime'])
        {
            weathericon = weatherimages.get(weathercode)[1];
        }
    }
    $('#maincard-weatherimg').attr('src', weathericon);
    var weathertext = weathermap.get(weathercode);
    $('#maincard-weather').html(weathertext);
    var temperature = Math.round(currentinfo['temperature'] * 10) / 10 + "°";
    $('#maincard-temperature').html(temperature);
    var humidity = currentinfo['humidity'] + "%";
    $('#maincard-humidity').html(humidity);
    var pressure = currentinfo['pressureSeaLevel'] + "inHg";
    $('#maincard-pressure').html(pressure);
    var windspeed = currentinfo['windSpeed'] + "mph";
    $('#maincard-windspeed').html(windspeed);
    var visibility = currentinfo['visibility'] + "mi";
    $('#maincard-visibility').html(visibility);
    var cloudcover = currentinfo['cloudCover'] + "%";
    $('#maincard-cloudcover').html(cloudcover);
    var uvlevel = currentinfo['uvIndex'];
    $('#maincard-uvlevel').html(uvlevel);

    showMainCard();

    //____________do days card for table view of next few days____________
    //initiate so we clear everything before, including header
    var tableheaderrow = "<tr id='daystableheadrow'><th>Date</th><th>Status</th><th>Temp High</th><th>Temp Low</th><th>Wind Speed</th></tr>";
    $('#daystable').html(tableheaderrow);

    var daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var abbrmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    //populate table rows
    var dayinfo = response['data']['timelines'][1]['intervals'];
    for(var i = 0; i<dayinfo.length; i++)
    {
        var datestring = dayinfo[i]['startTime'];
        var date = convertDate(datestring);

        var currentdayinfo = dayinfo[i]['values'];
        var dayweathercode = currentdayinfo['weatherCode'];
        var statusimg = weatherimages.get(dayweathercode)[0];

        var status = weathermap.get(dayweathercode);
        var temphigh = currentdayinfo['temperatureMax'];
        var templow = currentdayinfo['temperatureMin'];
        var daywindspeed = currentdayinfo['windSpeed'];

        var daysunrise = convertTime(currentdayinfo['sunriseTime']);
        var daysunset = convertTime(currentdayinfo['sunsetTime']);

        //input for the selected day row card on click 
        //******NOTE******: no need to call api.tomorrow.io again, we have the json already
        var dwcinputs = "\"" + datestring+"\","+dayweathercode+","+temphigh+","+templow+","+currentdayinfo['precipitationType']+","+currentdayinfo['precipitationProbability']+","+daywindspeed+","+currentdayinfo['humidity']+","+currentdayinfo['visibility']+",\""+daysunrise+"\",\""+daysunset+"\"";

        var tablerow = "<tr class='daystablerow' onclick='populateDailyWeatherCard("+dwcinputs+");'>";
        tablerow += "<td>" + date + "</td>";
        tablerow += "<td><img class='daysweathericon' src='" + statusimg + "'><p class='daysweather'>" + status + "</p></td>";
        tablerow += "<td>" + temphigh + "</td>";
        tablerow += "<td>" + templow + "</td>";
        tablerow += "<td>" + daywindspeed + "</td>";

        $('#daystable').append(tablerow);
    }
    showDaysCard();

    //we can populate the charts here as they are the same regardless of the click
    populateCharts(response);
    hideDailyWeatherDetailsCards();
    hideChartCards();
}

function onFail()
{
    hideMainCard();
    hideDaysCard();
    hideChartCards();
    hideDailyWeatherDetailsCards();
    hideChartCards();
    $('#maincard').css('display','none');
    $('#dayscard').css('display','none');
    $('#dailydetailsheaderdiv').css('display','none');
    $('#dailydetailsdiv').css('display','none');
    $('#weatherchartsheaderdiv').css('display','none');
    $('#weatherchartsdiv').css('display','none');
    $('#downarrow').css('display','none');
    $('#uparrow').css('display','none');
    $('#arrowdiv').css('display','none');
    $('#temperaturerangechartdiv').css('display','none');
    $('#hourlyweatherchartdiv').css('display','none');
    $('#errordiv').css('display','block');
}

function populateDailyWeatherCard(datestring_dwc, statuscode_dwc, high_dwc, low_dwc, precipitation_dwc, precipitationChance_dwc, windSpeed_dwc, humidity_dwc, visibility_dwc, sunrise_dwc, sunset_dwc)
{
    $('#uparrow').css('display','none');
    hideMainCard();
    hideDaysCard();
    var date_dwc = convertDate(datestring_dwc);
    var status_dwc = weathermap.get(statuscode_dwc);
    var statusimage_dwc = weatherimages.get(statuscode_dwc)[0];
    
    $("#dailydetailsdiv-date").html(date_dwc);
    $("#dailydetailsdiv-status").html(weathermap.get(statuscode_dwc));
    $("#dailydetailsdiv-highlow").html(high_dwc + "°F/" + low_dwc + "°F");
    $("#dailydetailsdiv-image").attr('src', statusimage_dwc);
    
    var precipitationtypes = ["N/A", "Rain", "Snow", "Freezing Rain", "Ice Pellets"];
    $("#dailydetailsdiv-precipitation").html(precipitationtypes[parseInt(precipitation_dwc)]);
    $("#dailydetailsdiv-chanceofrain").html(precipitationChance_dwc + "%");
    $("#dailydetailsdiv-windspeed").html(windSpeed_dwc + " mph");
    $("#dailydetailsdiv-humidity").html(humidity_dwc + "%");
    $("#dailydetailsdiv-visibility").html(visibility_dwc + " mi");
    $("#dailydetailsdiv-sunrisesunset").html(sunrise_dwc + "/" + sunset_dwc);
    
    showDailyWeatherDetailsCards();
    document.getElementById("dailydetailsheaderdiv").scrollIntoView();
}


function populateCharts(jsonobj)
{
    populateTempRangeChart(jsonobj);
    populateHourlyWeatherChart(jsonobj);
}

function populateTempRangeChart(jsonobj)
{
    var jsontext_chartdata = "[\n";
    var dayinfo_chartdata = jsonobj['data']['timelines'][1]['intervals'];
    var abbrmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    for(var i = 0; i<dayinfo_chartdata.length; i++)
    {
        var currentdayinfo_chartdata = dayinfo_chartdata[i]['values'];

        var datestring_chartdata = new Date(dayinfo_chartdata[i]['startTime']);
        var date_milliseconds = datestring_chartdata.getTime();
        var daylow_chartdata = currentdayinfo_chartdata['temperatureMin'];
        var dayhigh_chartdata = currentdayinfo_chartdata['temperatureMax'];

        var entry_chartdata = "\t[" + date_milliseconds + ", " + daylow_chartdata + ", " + dayhigh_chartdata + "]";
        if(i != dayinfo_chartdata.length - 1)
        {
            entry_chartdata += ",";
        }
        entry_chartdata += "\n";
        jsontext_chartdata += entry_chartdata;
    }
    jsontext_chartdata += "]";
    var chart_json = JSON.parse(jsontext_chartdata);

    const options_temp_range_chart = {
        chart: 
        {
            type: 'arearange',
            zoomType: 'x',
            scrollablePlotArea: {
              minWidth: 600,
              scrollPositionX: 1
            }
        },
        title: {
            text: 'Temperature Ranges (Min, Max)'
        },
        xAxis: 
        {
            type: 'datetime',
            tickInterval: 1000*3600*24, 
            dateTimeLabelFormats: 
            {
              day: "%e %b",
              month: "%b %y"
            },
        },
        yAxis: {
            title: {
              text: null
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: '°F',
            xDateFormat: '%A, %b %e'
        },
        plotOptions: {
            series: {
              fillColor: {
                linearGradient: [0, 0, 0, 300],
                stops: [
                  [0, 'rgba(255,205,70,1)'],
                  [0.3, 'rgba(245,177,64,0.7)'],
                  [1, 'rgba(64,182,245,0.1)']
                ]
              },
              lineColor: "#ffcd46"
            },
        },
        series: [{
            name: 'Temperatures',
            data: chart_json,
        }]
    };

    const temp_range_chart = Highcharts.chart('temperaturerangechartdiv', options_temp_range_chart);
}

function populateHourlyWeatherChart(jsonobj)
{
    var datamap = new Map();
                
    var date_arr = [];
    var temperature_arr = [];
    var humidity_arr = [];
    var air_pressure_arr = [];
    var wind_speed_arr = [];
    var wind_direction_arr = [];

    var hourinfo_chartdata = jsonobj['data']['timelines'][0]['intervals'];
    //120 hour entries = 5 days * 24 hrs
    for(var i = 0; i<Math.min(120, hourinfo_chartdata.length); i++)
    {
        var datetemp = new Date(hourinfo_chartdata[i]["startTime"]);
        date_arr.push(datetemp.getTime());
        temperature_arr.push(Math.round(hourinfo_chartdata[i]["values"]["temperatureMax"]));
        humidity_arr.push(Math.round(hourinfo_chartdata[i]["values"]["humidity"]));
        air_pressure_arr.push(Math.round(hourinfo_chartdata[i]["values"]["pressureSeaLevel"]));
        wind_speed_arr.push(hourinfo_chartdata[i]["values"]["windSpeed"]);
        wind_direction_arr.push(hourinfo_chartdata[i]["values"]["windDirection"]);
    }

    datamap.set("date", date_arr);
    datamap.set("temperature", temperature_arr);
    datamap.set("humidity", humidity_arr);
    datamap.set("airpressure", air_pressure_arr);
    datamap.set("windspeed", wind_speed_arr);
    datamap.set("winddirection", wind_direction_arr);

    const meteorgram = new Meteogram(datamap, 'hourlyweatherchartdiv');
}

function convertDate(timestring_cd)
{
    var daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var abbrmonths = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    var dateojb_cd = new Date(timestring_cd);
    var date_cd = daysofweek[dateojb_cd.getDay()] + ", " + dateojb_cd.getDate() + " " + abbrmonths[dateojb_cd.getMonth()] + " " + dateojb_cd.getFullYear();
    return date_cd;
}

function convertTime(timestring_ct)
{
    var dateobj_ct = new Date(timestring_ct);
    var hour_ct = dateobj_ct.getHours();
    var ans_ct = "";
    var ampm = "AM";
    if(hour_ct >= 12)
    {
        ampm = "PM"
    }
    if(hour_ct == 0 || hour_ct == 12) // special case 12 AM
    {
        ans_ct = 12;
    }
    else    //otherwise mod, ex: it's 1 for both 1 and 13 
    {
        ans_ct = hour_ct % 12;
    }
    return ans_ct + ampm;
}

function formsubmit()
{
    //get lat and long from checkbox
    if(document.getElementById("autodetectlocation").checked)
    {
        var address = "";
        $.get('https://ipinfo.io/json?token='+ipinfokey, function(data)
        {
            var loc = data['loc'].split(',');
            latitude = loc[0];
            longitude = loc[1];
            address = data['city'] + ", " + data['region'];
        }).done(function(){
            $.ajax({
                type: 'GET',
                url: '/getweather',
                data: {
                    lat: latitude,
                    long: longitude
                },
                success: function(response){
                    onSuccess(response, address);
                },
                error: function(xhr){
                    onFail();
                }
            });
        });
    }

    //get lat and long from maps
    else
    {
        var googlemapsurl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        var streetarr = document.getElementById("street").value.trim().split(' ');
        var street = streetarr[0];
        for(var i = 1; i<streetarr.length; i++) { street += "+" + streetarr[i].trim(); }

        var cityarr = document.getElementById("city").value.trim().split(' ');
        var city = ",+" + cityarr[0];
        for(var i = 1; i<cityarr.length; i++) { city += "+" + cityarr[i].trim(); }

        var statearr = document.getElementById("state").value.trim().split(' ');
        var state = ",+" + statearr[0];
        for(var i = 1; i<statearr.length; i++) { state += "+" + statearr[i].trim(); }

        var donotcontinue = false;
        googlemapsurl += street + city + state + "&key=" + googlemapskey;
        var address = "";
        $.get(googlemapsurl, function(data)
        {
            //can't find location case
            if(data['results'].length == 0)
            {
                onFail();
                donotcontinue = true;
            }
            
            else
            {
                latitude = data['results'][0]['geometry']['location']['lat'];
                longitude = data['results'][0]['geometry']['location']['lng'];
                address = data['results'][0]['formatted_address'];
            }
        }).done(function(){
            if(!donotcontinue)
            {
                $.ajax({
                    type: 'GET',
                    url: '/getweather',
                    data: {
                        lat: latitude,
                        long: longitude
                    },
                    success: function(response){
                        onSuccess(response, address);
                    },
                    error: function(xhr){
                        onFail();
                    }
                });
            }
        });
    }
    return false;
}

function Meteogram(dataset, container) {
    // Parallel arrays for the chart data, these are populated as the XML/JSON file
    // is loaded
    this.humidities = [];
    this.winds = [];
    this.temperatures = [];
    this.pressures = [];

    // Initialize
    this.dataset = dataset;
    this.container = container;

    // Run
    this.parseData();
}

/**
 * Function to smooth the temperature line. The original data provides only whole degrees,
 * which makes the line graph look jagged. So we apply a running mean on it, but preserve
 * the unaltered value in the tooltip.
 */
Meteogram.prototype.smoothLine = function (data) {
    var i = data.length,
        sum,
        value;

    while (i--) {
        data[i].value = value = data[i].y; // preserve value for tooltip

        // Set the smoothed value to the average of the closest points, but don't allow
        // it to differ more than 0.5 degrees from the given value
        sum = (data[i - 1] || data[i]).y + value + (data[i + 1] || data[i]).y;
        data[i].y = Math.max(value - 0.5, Math.min(sum / 3, value + 0.5));
    }
};


/**
 * Draw blocks around wind arrows, below the plot area
 */
Meteogram.prototype.drawBlocksForWindArrows = function (chart) {
    var xAxis = chart.xAxis[0],
        x,
        pos,
        max,
        isLong,
        isLast,
        i;

    for (pos = xAxis.min, max = xAxis.max, i = 0; pos <= max + 36e5; pos += 36e5, i += 1) {

        // Get the X position
        isLast = pos === max + 36e5;
        x = Math.round(xAxis.toPixels(pos)) + (isLast ? 0.5 : -0.5);

        // Draw the vertical dividers and ticks
        if (this.resolution > 36e5) {
            isLong = pos % this.resolution === 0;
        } else {
            isLong = i % 2 === 0;
        }
        chart.renderer.path(['M', x, chart.plotTop + chart.plotHeight + (isLong ? 0 : 28),
            'L', x, chart.plotTop + chart.plotHeight + 32, 'Z'])
            .attr({
                stroke: chart.options.chart.plotBorderColor,
                'stroke-width': 1
            })
            .add();
    }

    // Center items in block
    chart.get('windbarbs').markerGroup.attr({
        translateX: chart.get('windbarbs').markerGroup.translateX + 8
    });

};

/**
 * Get the title based on the XML data
 */
Meteogram.prototype.getTitle = function () {
    return "Hourly Weather (For Next 5 Days)";
};

/**
 * Build and return the Highcharts options structure
 */

Meteogram.prototype.getChartOptions = function () {
    var meteogram = this;
    return {
        chart: {
            renderTo: this.container,
            marginBottom: 70,
            marginRight: 40,
            marginTop: 50,
            plotBorderWidth: 1,
            height: 310,
            alignTicks: false,
            scrollablePlotArea: {
                minWidth: 720
            }
        },

        title: {
            text: this.getTitle(),
            align: 'center',
            style: {
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }
        },

        tooltip: {
            shared: true,
            useHTML: true,
            headerFormat:
                '<small>{point.x:%A, %b %e, %H:%M}</small><br>' +
                '<b>{point.point.symbolName}</b><br>'

        },

        xAxis: [{ // Bottom X axis
            type: 'datetime',
            tickInterval: 4 * 36e5, // four hours
            minorTickInterval: 36e5, // one hour
            tickLength: 0,
            gridLineWidth: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)',
            startOnTick: false,
            endOnTick: false,
            minPadding: 0,
            maxPadding: 0,
            offset: 30,
            showLastLabel: true,
            labels: {
                format: '{value:%H}'
            },
            crosshair: true
        }, { // Top X axis
            linkedTo: 0,
            type: 'datetime',
            tickInterval: 24 * 3600 * 1000,
            labels: {
                format: '{value:<span style="font-size: 12px; font-weight: bold">%a</span> %b %e}',
                align: 'left',
                x: 3,
                y: -5
            },
            opposite: true,
            tickLength: 20,
            gridLineWidth: 1
        }],

        yAxis: [{ // temperature axis
            title: {
                text: null
            },
            labels: {
                format: '{value}°',
                style: {
                    fontSize: '10px'
                },
                x: -3
            },
            plotLines: [{ // zero plane
                value: 0,
                color: '#BBBBBB',
                width: 1,
                zIndex: 2
            }],
            maxPadding: 0.3,
            minRange: 8,
            tickInterval: 1,
            gridLineColor: 'rgba(128, 128, 128, 0.1)'

        }, { // humidity axis
            title: {
                text: null
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0,
            tickLength: 0,
            minRange: 10,
            min: 0

        }, { // Air pressure
            allowDecimals: false,
            title: { // Title on top of axis
                text: 'inHg',
                offset: 0,
                align: 'high',
                rotation: 0,
                style: {
                    fontSize: '10px',
                    color: 'rgba(255,205,70)'
                },
                textAlign: 'left',
                x: 3
            },
            labels: {
                style: {
                    fontSize: '8px',
                    color: 'rgba(255,205,70)'
                },
                y: 2,
                x: 3
            },
            gridLineWidth: 0,
            opposite: true,
            showLastLabel: false
        }],

        legend: {
            enabled: false
        },

        plotOptions: {
            series: {
                pointPlacement: 'between'
            }
        },


        series: [{
            name: 'Temperature',
            data: this.temperatures,
            type: 'spline',
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '{series.name}: <b>{point.value}°F</b><br/>'
            },
            zIndex: 1,
            color: '#FF3333',
            negativeColor: '#48AFE8'
        }, {
            name: 'Humidity',
            data: this.humidities,
            type: 'column',
            color: '#86bdf9',
            yAxis: 0,
            groupPadding: 0,
            pointPadding: 0,
            grouping: false,
            dataLabels: {
                enabled: true,
                align: 'center',
                inside: false,
                formatter: function () {
                    if (this.y > 0) {
                        return this.y;
                    }
                },
                style: {
                    fontSize: '8px',
                    color: 'gray'
                }
            },
            tooltip: {
                valueSuffix: '%'
            }
        }, {
            name: 'Air pressure',
            color: "#ffcd46",
            data: this.pressures,
            marker: {
                enabled: false
            },
            shadow: false,
            tooltip: {
                valueSuffix: ' inHg'
            },
            dashStyle: 'shortdot',
            yAxis: 2
        }, {
            name: 'Wind',
            type: 'windbarb',
            id: 'windbarbs',
            color: 'gray',
            lineWidth: 1.5,
            data: this.winds,
            vectorLength: 8,
            yOffset: -15,
            xOffset: -5,
            tooltip: {
                valueSuffix: ' m/s'
            }
        }]
    };
};

/**
 * Post-process the chart from the callback function, the second argument to Highcharts.Chart.
 */
Meteogram.prototype.onChartLoad = function (chart) {

    this.drawBlocksForWindArrows(chart);

};

/**
 * Create the chart. This function is called async when the data file is loaded and parsed.
 */
Meteogram.prototype.createChart = function () {
    var meteogram = this;
    this.chart = new Highcharts.Chart(this.getChartOptions(), function (chart) {
        meteogram.onChartLoad(chart);
    });
};

/**
 * Handle the data. This part of the code is not Highcharts specific, but deals with yr.no's
 * specific data format
 */
Meteogram.prototype.parseData = function () {

    var meteogram = this,
        dataset = this.dataset;

  	for(var i = 0; i < dataset.get("date").length; i++)
    {
    	var from = dataset.get("date")[i];
      var to = dataset.get("date")[i] + 3600;
    	meteogram.temperatures.push({
      	x:from,
        y: Math.round(dataset.get("temperature")[i]),
        to: to
      })
      meteogram.humidities.push({
        x: from,
        y: dataset.get("humidity")[i]
      });
      if (i % 2 === 0) {
        meteogram.winds.push({
          x: from,
          value: dataset.get("windspeed")[i],
          direction: dataset.get("winddirection")[i]
        });
      }
      meteogram.pressures.push({
        x: from,
        y: dataset.get("airpressure")[i]
      });
    }
    

    // Smooth the line
    this.smoothLine(this.temperatures);

    // Create the chart when the data is loaded
    this.createChart();
};
// End of the Meteogram protype
