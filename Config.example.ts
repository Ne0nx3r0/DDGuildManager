const bots:Array<BotConfig> = [];

// DEFINE BOTS HERE 
//  V V V V V V V

// To get UIDs enable developer mode in Discord settings
// To get auth token log in as bot, 

bots.push({
    prefix:'cv',
    token:'put auth token here',
    ownerUIDs:[
        '185030740516405248',//SometimesiCode
        '241472237490798593',//AirKing
        '161366532427874304',//MistyGlowy
        '243182871018340353',//Guzma
    ],
    channelUIDs: [
        '277333052211068928',//chiller#general
        '288074331228078082',//chiller#bot-testing
    ],
});

//  ^ ^ ^ ^ ^ ^ ^
// DEFINE BOTS HERE 

export default {
    bots: bots
}

export interface BotConfig{
    prefix:string;
    token:string;
    ownerUIDs:Array<string>;
    channelUIDs:Array<string>;
}