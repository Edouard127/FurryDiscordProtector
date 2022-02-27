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
        _config_configuration: (configuration, prefix, exports) => `Configuration présente:\n${configuration}\nSyntaxe: ${prefix}${exports} raidmode [ nombre ] => Nombre de join en 10 secondes avant de trigger l'Anti-Raid mode`,
        _config_nspam_config: '⚙️ Anti-Spam Configuration',
        _config_nspam_configuration: (configuration, prefix, exports) => `Configuration présente:\n${configuration}\nSyntaxe: ${prefix}${exports} antispam [ number ] => Nombre de messages en 5 secondes avant de trigger l'Anti-Spam`,
        _help_help: '❓ Aide',
        _lang_lang: '⚙️ Configuration',
        _lang_lang_configuration: (prefix, exports, argsList) => `Configuration du bot\nCommande: ${prefix}${exports}\n\nArguments: ${argsList}`,
        _ping_answer: "You've got an answer",
        _ping_response: (ms_lt, ms_api) => `⌛ La latence est de ${ms_lt} ms\n⏲️ Le ping de l'API est de ${ms_api} ms`,
        _stats_nerd: '📊 Stats de nerds ',
        _stats_nerd_stats: 'Fait pour des nerds comme toi 🤓',
        _stats_nerd_infos: (model, threads, clock, total_ram, free_ram, used_ram) => `<:CPU:946565742055292949> Informations du CPU:\nModel: ${model}\nNombre de threads: ${threads}\nL'horloge: ${clock} Ghz\n\n<:RAM:946581194793971712> Informations de la RAM:\n RAM Totale: ${total_ram}\nRAM Libre: ${free_ram}\nRAM utilisé par le programme: ${used_ram}`,
        
    }
}
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

modules.exports = translate;