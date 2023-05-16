# Steam App Ownership

Generate CSV file with number of Steam apps owned according to date.\
CSV file can then be used to generate a chart using Excel or something else.\
For example: https://steamcommunity.com/sharedfiles/filedetails/?id=2976479222

<img src="https://i.imgur.com/lImhAse.png" />
<br>
<br>


## Steps
1. Install dependencies: `npm run install`
1. Get refresh token by running `node get_refresh_token.js`
    - Log in with Steam username and password
    - Authenticate with Steam Guard, if needed
    - Copy refresh token
2. Place refresh token at [line 17 of `get_csv.js`](get_csv.js#17)
3. Run `node get_csv.js`
    - This generates a file called `ownership_history.csv`
    - That CSV file can be used to generate a chart to your liking

I have provided some [examples](examples). Feel free to look at my Excel file for my chart template.


## Credits
- [DoctorMcKay](https://github.com/DoctorMcKay)
    - https://github.com/DoctorMcKay/node-steam-user
    - https://github.com/DoctorMcKay/node-steamcommunity
    - https://github.com/DoctorMcKay/node-steam-session
- Inspiration and starting code by [Revadike](https://github.com/revadike)\
https://steamcommunity.com/sharedfiles/filedetails/?id=2501283182
