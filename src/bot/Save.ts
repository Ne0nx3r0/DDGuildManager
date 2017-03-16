import { readFile as FSReadFile } from 'fs';
const fs = require('fs');

export function GetSave(uid:string):Promise<BotSave>{    
    return (async()=>{
        const saveData = await ReadFile(`./save/${uid}.json`);

        const save:BotSave = JSON.parse(saveData) as BotSave;

        return save;
    })();
}

export function SetSave(uid:string,save:BotSave):Promise<void>{
    return (async ()=>{
        await WriteFile(`./save/${uid}.json`, save);
    })();
}

function ReadFile(filename:string): Promise<string>{
    return new Promise<string>((resolve, reject) =>{
        fs.readFile(filename, 'utf8', function (error, result) {
            if (error){
                reject(error);    
            }
            else{
                resolve(result);
            }
        });
    });   
}

function WriteFile(fileName:string, save:BotSave): Promise<void>{
    return new Promise<void>((resolve, reject) =>{
        fs.writeFile(fileName, save, (err) => {
            if (err){
                reject(err);    
            }
            else{
                resolve();
            }
        });
    });        
}

export interface BotSave{
    title:string;
    logChannel:string;
    playingGame:string;
}