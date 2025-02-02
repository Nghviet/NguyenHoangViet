<br />
<div align="center">
  <h3 align="center">Problem 6 : Architecture</h3>

  <p align="center">
    My take on 99 Tech Coding Challenges - Problem 6 : Architecture
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#overview">Overview</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#processing-flow">Processing Flow</a></li>
    <li><a href="#available-resources">Available Resources</a></li>
    <li><a href="#planning">Planning</a></li>
    <li><a href="#metrics">Metrics</a></li>
  </ol>
</details>

<!-- OVERVIEW -->
## Overview

As the Lunar New Year draw closed and the celebration of the company 2 years, the company's game distribution platform `GamerKingdom` have received funding and developers' timeframes for creating a new events for advertisement purposes, focusing on drawing newer user and recalling old inactive user to the platform for the largest sales of the year. The event is by ranking user score and times participated in a web-based game in a global and regional scoreboard and the top 10 in each regional and the global scoreboard will received a specific codes for discounts and aquiring limited items and games DLC. The event is projected to increase the number of regular user by 25% and the revenue and game sales by at least 70% with the number of user participated in the event hovering around 25 millions.

## Requirements

- 50 to 75ms for all API processing
- Approximating 150.000 users and 650.000 requests hourly ( based on past events and extrapolating data )
- All users are required to login and all requests have to be verified
- Security measures for unauthorized or invalid actions by end-users
- The scoreboard updates at regular interval or when requested by end user
- All requests use parameterized url.
- All responses use 200 code and application/json. The error code and status string are stored in two variable "error_code", "status_code" in the response body following the company standard error table.

## Processing Flow

### Login and verify user
The login gateway and token verification is handled by our `PortalWatcher` team so all requests will have the OAuth header enabled, storing the decrypted and verified identity of the users who send the requests. Our `ChurchWriter` team only focus on the verifing the action of the users and update the scoreboard accordingly.

### Start of the action
To limited the possibility that someone cheated the system using the response sendout by the server, during the start request of user, generating a random 8-digit number, combining with the timestamp when receiving the requests from user, the user session token and id. The combined string need to be stored in the database for future re-verification and sending the hash value of the combined string to identify the action of the user.

<img src="img/Start action.png">
<br></br>
<br></br>

### End of the action
For every end action requests, we need to compare the client hashed value with the stored value. If we do not have any stored value or mismatch value, it is considered a invalid or cheated request and get rejected accordingly. This is included but not limited to reporting error to client-side, timeout connection or banning through `CastleAlarm` system. After that, the client-side reports of scoring and action list are required for verification for truthfulness to a given extend. If all the verification steps are passed, the score of the user in the database and scordboard is updated, and if it resulted in changing in top-10, a notification will be delivered thorugh the `PigeonDelivery`.

<img src="img/End action.png">
<br></br>
<br></br>

## Available Resources
- According to past events, we are allowed to use `CastleAlarm` upto Level 3, 24-hour banning and trade banning, for minor offenders and Level 5, removal and deletion of account due to violation of EULA, for serious or repeated offenders.
- We have secured permission for using Redis-based `KitchenFridge` for storing security key for action request. Scordboard and user data are required to stored at `DungeonReservedWarehouse` instead of `WineCellar` due to the degradation of the service.
- `PigeonDelivery` is cleared for using Notification Priority 4 config to limit the throughput in the system.
- All function are mandated to be parameterized through the using of the shared `ChurchBible` configuration system for real-time update.

## Planning
- Internal QC round is scheduled to take place at 8 Feb with all the required configuration for other services confirmed and running.
- API document are required to send to `WetNurseDivision` by the end of the 6 Feb and the service is ready for inter-team testing by 9 Feb.
- `Inquisitors` are scheduled to start testing and verification from 11 Feb and expected to released by 15 Feb.

## Metrics
The following metrics are required:
- Number of user login, user join the URL, user participated in the events and the distribution of scores for each actions and users during the events.
- Number of sales according to the points user accquired
- Number of user returning after 1 week, 1 month
- Distribution of user class participated in event and the revenue
- Number of user cheating and list for our monthly `JusticeCourt`