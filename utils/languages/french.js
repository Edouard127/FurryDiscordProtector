const languageData = {
    en: { //English
        description_lang: 'Changer la langue de bot',
        description_config: 'Configurer la détection de raid',
        description_help: "Besoin d'aide avec notre bot ?",
        description_ping: 'Pong !',
        description_server: 'Stats pour des nerds comme toi 🤓',
        _config_syntax: (number) => `Syntaxe Invalide: ${number} n'est pas un integer`,
        _config_raid_raidmode: '⚙️ Configuration de Raid Mode',
        _config_success: (ms) => `✅ Opération complété en ${ms} ms`,
        _config_no_configuration: '```Aucune configuration détecté pour ce serveur```',
        _config_configuration: (configuration, prefix, exports) => `Current configuration:\n${configuration}\nSyntax: ${prefix}${exports} raidmode [ number ] => Number of joins in 10 seconds before triggering the Anti-Raid Mode`,
        _config_nspam_config: '⚙️ Anti-Spam Configuration',
        _config_nspam_configuration: (configuration, prefix, exports) => `Current configuration:\n${configuration}\nSyntax: ${prefix}${exports} antispam [ number ] => Number of messages in 5 seconds before triggering the Anti-Spam`,
        _help_help: '❓ Help',
        _lang_lang: '⚙️ Config',
        _lang_lang_configuration: (prefix, exports, argsList) => `Bot Configuration\nCommand: ${prefix}${exports}\n\nArguments: ${argsList}`,
        _ping_answer: "You've got an answer",
        _ping_response: (ms_lt, ms_api) => `⌛ Latency is ${ms_lt} ms\n⏲️ API Ping is ${ms_api} ms`,
        _stats_nerd: '📊 Nerd Stats',
        _stats_nerd_stats: 'Made for nerds like you 🤓',
        _stats_nerd_infos: (model, threads, clock, total_ram, free_ram, used_ram) => `<:CPU:946565742055292949> CPU Informations:\nModel: ${model}\nNumber of Threads: ${threads}\nClock: ${clock} Ghz\n\n<:RAM:946581194793971712> RAM Informations:\n Total RAM: ${total_ram}\nFree RAM: ${free_ram}\nRAM Used by process: ${used_ram}`,
        
    }
}
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

modules.exports = translate;