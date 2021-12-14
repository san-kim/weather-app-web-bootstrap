# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, request, jsonify
from urllib.request import urlopen
import json
import ssl
# extra key: LY3PVz8RNKhG6OYZPA1egLojE5cCyu1f
tomorrow_api_key = 'MQUe5ZB9nVi80IBzkHdFGj8wXkXxhwZr';
ipinfo_api_key = '783eff35ae9e6e';
google_maps_api_key = 'AIzaSyAx1HYH0ghk-Ni90dclEO9cyDxUOA17P1w';

app = Flask(__name__)


@app.route('/')
def root():
    return app.send_static_file('weather.html')

# NOTE : https://api.tomorrow.io/v4/timelines is only being called once as the result is cached and used again in
#        the javascript side. It is only called on the submit button and the JSON is re-used. 
@app.route('/getweather', methods=['GET'])
def getweather():
    ssl._create_default_https_context = ssl._create_unverified_context
    lat = request.args.get('lat')
    long = request.args.get('long')
    location = 'location=' + lat + ',' + long;
    fields = '&fields=' + 'temperature,temperatureApparent,temperatureMin,temperatureMax,windSpeed,windDirection,humidity,pressureSeaLevel,uvIndex,weatherCode,precipitationProbability,precipitationType,sunriseTime,sunsetTime,visibility,moonPhase,cloudCover';
    timesteps = '&timesteps=' + '1h,1d';
    units = '&units=' + 'imperial';
    timezone = '&timezone=' + 'America/Los_Angeles';
    apikey = '&apikey=' + tomorrow_api_key;
    
    url = 'https://api.tomorrow.io/v4/timelines?' + location + fields + timesteps + units + timezone + apikey;
    response = urlopen(url);
    data_json = json.loads(response.read());
    return jsonify(data_json);

@app.route('/getipinfokey', methods=['GET'])
def getipinfokey():
    ssl._create_default_https_context = ssl._create_unverified_context
    return jsonify(ipinfo_api_key);

@app.route('/getgooglemapskey', methods=['GET'])
def getgooglemapskey():
    ssl._create_default_https_context = ssl._create_unverified_context
    return jsonify(google_maps_api_key);

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)

