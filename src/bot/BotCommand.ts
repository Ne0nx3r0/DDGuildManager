import { Message } from 'discord.js';

export default class BotCommand{
    name:string;
    description:string;
    usage:string;

    constructor(bag:CommandBag){
        this.name = bag.name;
        this.description = bag.description;
        this.usage = bag.usage;
    }

    run(bag:CommandRunBag){
        throw this.name+' does not implement run()';
    }
}

export interface CommandBag{
    name:string;
    description:string;
    usage:string;
}

export interface CommandRespondFunc{
    (msg:string):void;
}

export interface CommandRunBag{
    message:Message;
    params:Array<string>;
}