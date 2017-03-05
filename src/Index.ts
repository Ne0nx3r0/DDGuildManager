import DiscordDungeonsGuildManagerBot from './bot/Bot';
import DDGuildManagerBot from './bot/Bot';
import Config from '../Config';

class DDGuildManager {

    public static main(): number {
        const bots:Array<DDGuildManagerBot> = Config.bots.map(
            function(botConfig){
                return new DDGuildManagerBot(botConfig);
            }
        );

        return 0;
    }
}

DDGuildManager.main();

process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});