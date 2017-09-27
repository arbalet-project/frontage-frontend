# API - Admin section

##### Everything here is JSON. There is no non-JSON message exchange, except for the socket
---
`POST /b/login` - lets the user send auth information, returns token or error code

**input:**

    {
      "user": "USERNAME",
      "pass": "PASS"
    }

with

* USERNAME - username in clear text
* PASS - password in clear text

example:

    {
      "user": "fgolemo",
      "pass": "test123"
    }

**output:**

    {
      "error": CODE,
      "token": "TOKENSTRING"
    }

with

* CODE - the error code
  * 0 - no error
  * 100 - username doesn't exist
  * 200 - password is incorrect
* TOKENSTRING - the token for using the API. The token is either an empty string (in case of error) or a string of 64 random characters. It is sent with every other API command, either as GET or POST parameter. Each token is valid for 60 min. The client is aware of this timer and will automatically log the user out after 59 min and request re-login.

example 1:

    {
      "error": 100,
      "token": ""
    }

example 2:

    {
      "error": 0,
      "token": "zzhq4epPtUdZQxTvEDKHvHXKabsqWYX7k3buyxrPsycFwekx4Q3sJpwdesSXYSHN"
    }


---

### Hereinafter every API endpoint requires the token parameter.
If the endpoint is a `GET`, then the token is attached with `?token=TOKENSTRING`. So for example the endpoint

    GET /b/admin/is_on

is actually called like this

    GET /b/admin/is_on?token=zzhq4epPtUdZQxT...

If the endpoint is a `POST`, then in addition to the parameters listed below and additional token parameter always has to be sent like so

    {
      ...other parameters... ,
      token: "TOKENSTRING"
    }

The sever always first checks the token for validity. If a given token is not valid, the server immediately replies with

    {
      "error": 300
    }

For any given API call the client checks for this error. If the client should receive this error code instead of the expected output, the client will be logged out and brought back to the login screen.

---

`GET /b/admin/is_on` - returns `{"on":True}` if the facade is currently on, otherwise `{"on":False}`

//TODO: add POST /b/admin/is_on

---
//TODO add POST for this too

`GET /b/admin/cal/20170821` - returns

    {
      "error": ERRORCODE,
      "on": "YY:MM",
      "off": "DD:HH",
      "default": "APPNAME",
      "params": {PARAMS}
    }

with

* Y - year of date, 4 digits
* M - month of date, 2 digits
* D - day of date, 2 digits
* H - hour of when frontage turns on, 2 digits
* I - minute of when frontage turn on, 2 digits
* J - hour of when frontage turns off, 2 digits
* K - minute of when frontage turns off, 2 digits
* APPNAME - string of the app to be run by default during that day
* PARAMS - nested JSON object with optional parameters for the given app. Each app must be able to run without this, resolving to default parameters

example:

    {
      "error": 0,
      "on": "20:00",
      "off": "23:30",
      "default": "flag",
      "params": {"country": "FR", "brightness": 50}
    }

---

`GET /b/admin/apps` - returns list of available apps:

    {
      "error": ERRORCODE,
      "apps": [
        {
          "name": "APPNAME1",
          "params": [
            {
              "name": "PARAM1a",
              "desc": "DESCR1a"
            },{
              "name": "PARAM1b",
              "desc": "DESCR1b"
            }
          ]
        },
        {
          "name": "APPNAME2",
          "params": [
            {
              "name": "PARAM2a",
              "desc": "DESCR2a"
            }
          ]
        }
      ]
    }

with

* APPNAME1 - name of the first app, and if the app accepts parameters:
  * PARAM1a - name of the first parameter for the first app
  * DESCR1a - description text for the first parameter of the first app
  * PARAM1b - name of second parameter of first app
  * ...
* APPNAME2 - name of the next app, and so on

example:

{
    "error": 0,
    "data": [
        {
            "name": "flag",
            "params": [
                {
                  "name": "country",
                  "desc":"ISO 3166-1 country code, 2 letters"
                },{
                  "name": "brightness",
                  "desc": "Brightness level of the flag, range 0-100"
                }
            ]
        },
        {
            "name": "emoji",
            "params": [
                {
                  "name": "emoji",
                  "desc": "Typed emoji, like :) or :'("
                }
            ]
        }
    ]
}

---

`GET /b/admin/apps/running` - returns the currently running app like this

    {
      "error": ERRORCODE,
      "name": APPNAME,
      "params": {PARAMS},
      "start": "START",
      "user": "USER"
    }

with

* APPNAME - string of the app to be run by default during that day. If no app is running the string is empty.
* PARAMS - nested JSON object with provided parameters for the given app (if any).
* START - When was the app started, date and time, as string in ISO 8601 format. If no app is running this is an empty string.
* USER - username of person who ran the app, can be a known user or " visitor-XX", where XX is a 2 digit number randomly assigned to a visitor's device upon first login. If no app is running this is an empty string. If the app was run by the calendar, then the username is "cal".

example 1 (flag app is running, started manually by an admin):


    {
      "error": ERRORCODE,
      "name": "flag",
      "params": {"country": "FR", "brightness": 50},
      "start": "2017-08-22T22:32:20+01:00",
      "user": "fgolemo"
    }

example 2 (flag app was started automatically by calendar at 20:00):

    {
      "error": ERRORCODE,
      "name": "flag",
      "params": {"country": "FR", "brightness": 50},
      "start": "2017-08-22T20:00:00+01:00",
      "user": "cal"
    }

example 3 (no app running):

    {
      "error": ERRORCODE,
      "name": "",
      "params": {},
      "start": "",
      "user": ""
    }


---

`PUT /b/admin/apps/running` - starts a given app

#### TODO

---

`DELETE /b/admin/apps/running` - stops a given app

#### TODO
