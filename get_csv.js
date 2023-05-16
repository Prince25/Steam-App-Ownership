// https://github.com/DoctorMcKay/node-steam-user
// https://github.com/DoctorMcKay/node-steamcommunity

import fs from 'fs';
import steam_user from 'steam-user';
import SteamCommunity from './node-steamcommunity/index.js';


const stream = fs.createWriteStream(`ownership_history.csv`, { "flags": `w` });
var community = new SteamCommunity();
var steamUser = new steam_user({
    "enablePicsCache": true,
});


steamUser.logOn({
    refreshToken: "PLACE_REFRESH_TOKEN_HERE",
})


let date, allLicenses;
steamUser.on(`loggedOn`, () => {
    console.log(`Logged on`);
    community.getSteamUser(steamUser.steamID, (error, me) => {
        if (error) {
            console.error(error);
            return;
        }

        // stream.write(`"Date","Games","DLC","All"\n`);
        stream.write(`"Date","Games"\n`);

        date = me.memberSince;
        date.setHours(23);
        date.setMinutes(59);
        date.setSeconds(59);
        date.setMilliseconds(999);

        allLicenses = steamUser.licenses;
    });
});


steamUser.on('ownershipCached', () => {
    console.log(`Ownership cached. Writing...`);
    if (!allLicenses) {
        console.error(`Failed to get licenses`);
        return;
    }
    
    while (date.valueOf() <= Date.now()) {
        const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        steamUser.licenses = steamUser.licenses.filter((license) => license.time_created < date.valueOf() / 1000);
        const ownedApps = steamUser.getOwnedApps(true);
        steamUser.licenses = allLicenses;
        // const ownedGames = ownedApps.filter((appid) => steam.apptypes[appid] === `game`);
        // const ownedDLC = ownedApps.filter((appid) => steam.apptypes[appid] === `dlc`);
        stream.write(`"${dateStr}","${ownedApps.length}"\n`);
        date.setDate(date.getDate() + 1);
    }
    
    stream.end();
    console.log('Ownership history written to ownership_history.csv')
    steamUser.logOff();
})
