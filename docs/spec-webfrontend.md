# Specification of views in the web-frontend

`/home`
* shows the current status of the frontage (on/off/next time)
* shows a download link to the app for controlling the frontage
* shows a link for accessing the admin interface -> `/admin`

`/admin`
* this will only be shown if the user is logged in. If not the page is instead changed to -> `/login`
* if the frontage is running shows when the frontage will turn off
* if the frontage is not running shows when the frontage will turn on
* has a switch for manually turning the frontage on or off
* has a link to the calendar for changing the on/off times and default applications -> `/admin/cal`

`/login`
* shows a username & password form for accessing the admin interface

`/admin/cal`
* shows a list of the current and next 30 days calendar
* each day has the following informations that can be edited when users clicks on the day:
  * start time
  * end time (can be after midnight - becomes next day)
  * default app (with optional parameters)

`/admin/apps`
* shows the list of installed apps (later we can add an upload feature here to upload new python files or JSON animations)
* shows the currently running app (if any), since when it's running and who started it
* allows to start an app
* allows to stop the running app

`/admin/queue`
* shows the list of users currently connected via app
* for each user it shows how long they are waiting, when their turn will come, and what they are currently running on the frontage or what they want to run (f-app name and parameters)
* can click on users to kick them
