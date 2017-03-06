import { Message } from 'discord.js';
import DDGuildManagerBot from './Bot';

export default class BotCommand{
    name:string;
    description:string;
    usage:string;
    minParams:number;

    constructor(bag:CommandBag){
        this.name = bag.name;
        this.description = bag.description;
        this.usage = bag.usage;
        this.minParams = bag.minParams;
    }

    run(bag:CommandRunBag){
        throw this.name+' does not implement run()';
    }

    log(bag:CommandRunBag,msg:string){
        bag.log(bag.message.author.username+' ('+bag.message.author.username+') had me '+msg);
    }
}

export interface CommandBag{
    name:string;
    description:string;
    usage:string;
    minParams:number;
}

export interface LoggingFunction{
    (msg:string):void;
}

export interface CommandRunBag{
    message:Message;
    params:Array<string>;
    bot:DDGuildManagerBot;
    log:LoggingFunction;
}