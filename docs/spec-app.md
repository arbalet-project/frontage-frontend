# Specification of views in the mobile app

**App Skeleton**

- Logo
- Splash screen
- (Google play store listing? because offering the app purely as APK makes it a lot harder to install)
- Main app is locked in portrait mode
- Draw mode and app mode launch in landscape mode but visually instruct the user to flip the phone sideways

**First Launch**
- User is asked for username (doesn't have to be unique, purely cosmetical).
- username is stored in the app and can only be changed by reinstalling the app (to cut down a little bit on users putting in stupid nicknames)

**Home Screen**

- Current frontage status
 - is frontage active? if yes, until when, if no, when does it turn on + day/night hero graphic
 - is currently somebody using the frontage? if yes, show a timer and queue - if no just show an inviting message
 - short textbox with instruction to push button to connect to Frontage
 - button with popup to launch either game/app or draw mode
 - if there is currently a multiplayer app running with open slots, a "join" button appears up top, together with the name of the game and a list of connected players

**Navigation**

- Home - home screen
- Apps - list of available apps on the frontage
- My Art - list of user's drawings
- About - credits, acknowledgement, contact
- Terms & Conditions - ...

**Tutorial Overlay**

- overlay that shows up on the first start, explains basic idea
- overlay that shows up when loading draw mode for first time
- overlay that shows up when loading app list for first time

**About**

- thanks for using this app
- thanks to university
- list of developers
- contact info (email link)
- share this app with a friend button
- language selection

**Terms & Conditions**

- static page, first a set of do's and dont's, then general disclaimers
- dos & don'ts
 - do play
 - do make your own art
 - do be respectful of passersby and viewers
 - don't be a dick
- disclaimer section with "we aren't responsible for any damage, bla, bla, we can't guarantee that the app or the frontage will keep working,...", etc.

**Apps List**

- list of installed apps (apps that the mobile app was compiled with, that are loaded onto the frontage), one per line
- each app with a little preview graphic, title, maybe author
- when clicking on the app, app is submitted to queue, user is moved to queue screen (later on we can do queue submission in the background and give the user a notification when the app is ready to launch, but for now the user has to keep the queue open)

**Queue Screen**

- queue screen blocks rest of the app (no more menu),
- back button shows a warning "if you press back again, you will be removed from the queue and go back to the main menu", second press removes the app from the queue and let's the user use the app normally again
- the user can see the current queue
- each item is the username of a person, the f-app that they are running, and their remaining time on the f-app
- when the queue is empty and your app is the next in line, this moves on to the app screen
- if a queue item (either your own or others') is multiplayer, instead of starting directly it waits for the minimum number of players before starting. The waiting period for others to join is on a separate additional timer.
- multiplayer apps can also be joined from here (have a "join" button in the queue and will NOT interfere with other elements in the queue)

**App Screen**

- this is entirely dependent on the app that's currently loaded (this could be a controller, some auxiliary display, or a keyboard).
- as soon as this launches, the mobile app establishes a socket-connection with the frontage and will send all game/app interactions over that socket connection
- back button shows a message, back button twice closes the app

**Draw Mode**
- on launch asks you if you want to launch on the facade or offline
- if launched on the facade, just starts like a normal app with the queue screen, and then on ready it launches the actual app
- actual app and offline mode have the following interface
- main screen shows the facade as grid pattern, with the width of the facade filling the width of the width of the phone, toolbar at the bottom
- the toolbar contains
 - a paint tool (painting individual pixels),
 - an eraser (removing individual pixels),
 - a fill tool (which fills a closed area),
 - a clear tool (that empties the screen),
 - a color selector that opens a popup with the 16(ish) available colors, and
 - a right-left frame selector for making animations (right/left arrows go to the next/previous frame to create an animated GIF of up to 5 frames. )
- frames are created on the fly - as soon as you paint anything into a new frame, it becomes part of the animation and loops with .5ms delay
- the whole app behaves like a pixelart drawing app, letting you fill in individual pixels by clicking on them with a color and the pixel draw tool selected
- this could also easily become a optional multiplayer app where upon launch you have a checkbox "make multiplayer"... which allows up to 3 other people to join you (but don't have to) and then they also see the same interface and interact in the same way, just concurrently
- every 30 seconds and when leaving the app, the current art is saved in the user's "my art" gallery

**My Art**
- list and preview of self-made artwork (one per line)
- upon clicking on an item, it open in full-screen mode in landscape view
- on each item there is a context menu that opens additional options
 - show & edit on frontage (opens the art in draw mode on the app)
 - edit offline
 - duplicate
 - remove
 - (share) - sends the code for the art via mail or something allowing for other users to open it in the app (we need to add file support to this app, so that this app launches "frontage-art-XXXXX.json" files)
