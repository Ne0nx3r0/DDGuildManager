/// <reference path='../../node_modules/discord.js/typings/index.d.ts' />

import { Client, Message, TextChannel } from 'discord.js';
import { BotConfig } from "../../Config";
import BotCommand from './BotCommand';
import * as Commands from './ActiveCommands';

export default class DDGuildManagerBot{
    client:Client;
    ownerUIDs:Array<string>;
    loggingChannel:TextChannel;
    loggingChannelUID:string;
    commands:Map<string,BotCommand>;
    prefix:string;

    constructor(bag:BotConfig){
        this.ownerUIDs = bag.ownerUIDs;
        this.prefix = bag.prefix;
        this.loggingChannelUID = bag.loggingChannelUID;

        this.log = this.log.bind(this);

        this.commands = new Map();

        Object.keys(Commands).forEach((commandName)=>{
            const command:BotCommand = new Commands[commandName];

            this.commands.set(command.name.toUpperCase(),command);

/*          command.aliases.forEach((aliasStr)=>{
                this.commands.set(aliasStr.toUpperCase(),command);
            });
*/
        });

        this.client = new Client();

        this.setPlayingGame = this.setPlayingGame.bind(this);

        this.client.on('message',this.handleMessage.bind(this))

        this.client.on('ready',this.handleReady.bind(this));

        this.client.login(bag.token);
    }

    handleReady(){
        this.log(this.client.user.username+ ': now online');

        this.loggingChannel = this.client.channels.get(this.loggingChannelUID) as TextChannel;
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
            message.channel.sendMessage('I don\'t know you, '+message.author.username);

            return;
        }

        const messageStr = message.content.substr(this.prefix.length);
        const params = messageStr.split(' ');
        
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

    setPlayingGame(){

    }

    log(msg:string){
        console.log('['+this.client.user.username+'] '+msg);

        this.loggingChannel.sendMessage(msg);
    }
}