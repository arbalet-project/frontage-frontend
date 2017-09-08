# Programming API
Current rules from [the snap f-app](https://github.com/arbalet-project/frontage/blob/master/arbalet/frontage/snap/snap.py)
To be improved, JSONified and tokenified maybe.

## API

`/set_rgb_matrix` Sets new colors to all 76 pixels.
Intended to be called at high rate 10-20 Hz
Currently always returns HTTP 200

`/set_pixel_rgb`
Set a specific pixel coordinates at a specific colors
Not so much used in practice, most user programs are more efficient when sending the full matrix
Currently always returns HTTP 200

`/is_authorized/<nickname>`
Check if the client nickame is currently running live (authorized to publish to /set_rgb_matrix).
If false, it means that the client is programming its own simulation, and it should not publish on /set_rgb_matrix.

Currently returns the text "true" or "false"

`/get_nickname`
Attributes a new nickname to a client

Currently returns only a single string with the nickname

## Admin (password-protected, for the workshop leaders)

`/admin` Returns a basic HTML page with the list of connected nicknames and checkboxes to select one.

`/authorize/<nickname>` Authorizes the specified nickname to publish and gives him control of the facade without limitation of time except end of the programming f-app.
Currently always returns HTTP 200
