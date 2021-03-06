/// <reference path='../../node_modules/discord.js/typings/index.d.ts' />

import { Client, Message, TextChannel } from 'discord.js';
import { BotConfig } from "../../Config";
import BotCommand from './BotCommand';
import * as Commands from './ActiveCommands';
import {readFile as FSReadFile} from 'fs';
import { BotSave, GetSave, SetSave } from './Save';

const Winston = require('winston');

export default class DDGuildManagerBot{
    client:Client;
    ownerUIDs:Array<string>;
    logger:any;
    loggingChannel:TextChannel;
    commands:Map<string,BotCommand>;
    prefix:string;
    save:BotSave;

    constructor(bag:BotConfig){
        this.ownerUIDs = bag.ownerUIDs;
        this.prefix = bag.prefix;

        this.log = this.log.bind(this);

        this.logger = new (Winston.Logger)({
            transports: [
                new (Winston.transports.Console)()
            ]
        });

        this.commands = new Map();

        Object.keys(Commands).forEach((commandName)=>{
            const command:BotCommand = new Commands[commandName];

            this.commands.set(command.name.toUpperCase(),command);
        });

        this.client = new Client();

        this.setPlayingGame = this.setPlayingGame.bind(this);

        this.client.on('message',this.handleMessage.bind(this))

        this.client.on('ready',this.handleReady.bind(this));

        this.client.login(bag.token);
    }

    handleReady(){
        this.logger.configure({
            transports: [
                new (Winston.transports.Console)(),
                new (Winston.transports.File)({ filename: 'logs/'+this.client.user.id+'.txt' })
            ]
        });

        this.log(this.client.user.username+ ': now online');

        (async()=>{
            try{
                this.save = await GetSave(this.client.user.id);

                this.loggingChannel = this.client.channels.get(this.save.logChannel) as TextChannel; 

                this.setPlayingGame(this.save.playingGame);     
            }
            catch(ex){
                this.logger.error(ex);
            }
        })();
    }

    handleMessage(message:Message){
        //Not my prefix
        if(!message.content.startsWith(this.prefix)){
            return;
        }

        //My own message
        if(message.author.id == this.client.user.id){
            return;
        }

        //Not someone I listen to
        if(this.ownerUIDs.indexOf(message.author.id) == -1){
           // message.channel.sendMessage('I don\'t know you, '+message.author.username);

            return;
        }

        const messageStr = message.content.substr(this.prefix.length);
        const params = resolveArgs(messageStr);

        const commandName = params.shift().toUpperCase();
        const command = this.commands.get(commandName);

        if(!command){
            return;
        }

        if(command.minParams > params.length){
            message.channel.sendMessage('Usage: '+command.usage);

            return;
        }

        command.run({
            params: params,
            message: message,
            bot: this,
            log: this.log
        });
    }

    setPlayingGame(str:string){
        this.client.user.setGame(str);

        this.save.playingGame = str;
        
        SetSave(this.client.user.id,this.save);
    }

    log(msg:string){
        console.log('['+this.client.user.username+'] '+msg);

        if(this.loggingChannel){
            this.loggingChannel.sendMessage(msg);
        }

        this.logger.info(msg);
    }

    setLoggingChannel(channel:TextChannel){
        this.save.logChannel = channel.id;

        SetSave(this.client.user.id,this.save);

        this.loggingChannel = channel;
    }
}

function resolveArgs(msg:string){
    let regex = /("([^"]+)")|('([^']+)')|\S+/g,
        matches = [],
        match;

    while((match = regex.exec(msg)) !== null) matches.push(match[4] || match[2] || match[0]);

    return matches;
}