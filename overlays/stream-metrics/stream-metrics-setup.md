# Twitch stream stats overlay

This overlay displays Twitch subscriber, follower and viewer counts.

## Authorise subscriber count

1. Sign in to Twitch as the broadcaster whose subscriber count you want to display.
2. Open the [DecAPI Twitch authorisation link](https://decapi.me/auth/twitch?redirect=subcount&scopes=channel:read:subscriptions+user:read:email+moderator:read:followers+user:read:email).
3. Review Twitch's permission screen and approve it only if you are comfortable with the permissions requested.

## Add the overlay to OBS

Simply add a new browser source in OBS Studio.
Paste in the URL:
https://onlybeards.vip/overlays/stream-stats.html?username=ausr_krip

(Replace “ausr_krip” with your Twitch username.)

Viewer count may be zero or unavailable when the stream is offline.