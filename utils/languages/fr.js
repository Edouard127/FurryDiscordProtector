const languageData = {
        description_lang: 'Changer la langue de bot',
        description_config: 'Configurer la détection de raid',
        description_help: "Besoin d'aide avec notre bot ?",
        description_ping: 'Pong !',
        description_server: 'Stats pour des nerds comme toi 🤓',
        _config_bad_syntax: (number) => `Syntaxe Invalide: ${number} n'est pas un integer`,
        _config_raid_raidmode: '⚙️ Configuration de Raid Mode',
        _config_success: (ms) => `✅ Opération complété en ${ms} ms`,
        _config_no_configuration: '```Aucune configuration détecté pour ce serveur```',
        _config_raid_configuration: (configuration, prefix, exports) => `Configuration présente:\n${configuration}\nSyntaxe: ${prefix}${exports} raidmode [ nombre ] => Nombre de join en 10 secondes avant de trigger l'Anti-Raid mode`,
        _config_nspam_config: '⚙️ Anti-Spam Configuration',
        _config_nspam_configuration: (configuration, prefix, exports) => `Configuration présente:\n${configuration}\nSyntaxe: ${prefix}${exports} antispam [ number ] => Nombre de messages en 3 secondes avant de trigger l'Anti-Spam`,
        _config_default: `⚙️ Configuration`,
        _config_default_syntax: (exports, argsList) => `Configuration du bot\nCommande: ${exports}\n\nArguments: ${argsList} `,
        _help_help: '❓ Aide',
        _lang_lang: '⚙️ Configuration',
        _lang_choices: (langs) => `Veuillez choisir l'une des langues suiventes:\n${langs}`,
        _lang_invalid: '⚙️ Langue invalide',
        _lang_lang_configuration: (prefix, exports, argsList) => `Configuration du bot\nCommande: ${prefix}${exports}\n\nArguments: ${argsList}`,
        _lang_validation: 'Modifié la langue du bot en Français avec succès',
        _ping_answer: "You've got an answer",
        _ping_response: (ms_lt, ms_api) => `⌛ La latence est de ${ms_lt} ms\n⏲️ Le ping de l'API est de ${ms_api} ms`,
        _stats_nerd: '📊 Stats de nerds ',
        _stats_nerd_stats: 'Fait pour des nerds comme toi 🤓',
        _stats_nerd_infos: (model, threads, clock, total_ram, free_ram, used_ram) => `<:CPU:946565742055292949> Informations du CPU:\nModel: ${model}\nNombre de threads: ${threads}\nL'horloge: ${clock} Ghz\n\n<:RAM:946581194793971712> Informations de la RAM:\n RAM Totale: ${total_ram}\nRAM Libre: ${free_ram}\nRAM utilisé par le programme: ${used_ram}`,
        _raidmode_raidmode: '🛡️ Raidmode',
        _raidmode_success: (mode, ms) => `Le raidmode a été ${mode} en ${ms} ms`,
        _logs_logs: `⚙️ Configuration des logs`,
        _logs_success: (log, ms) => `Mise à jour réussie du salon de logs pour **${log}** en ${ms} ms`,
        _logs_bad_syntax: (log) => `❌ "${log}" n'est pas un salon valide`,
        _raid_: `⚠️Raid⚠️`,
        _raid_message: `Attention\nUn raid a été détecté`,
        _profanity_message : `🛡️ Vérificateur de blasphèmes`,
        _profanity_success : (mode, ms) => `Le vérificateur de blasphèmes a été ${mode} en ${ms} ms`,
        _profanity: `⚠️Blasphème⚠️`,
        _profanity_: (message) => `${message} a été qualifié de blasphème sous quelque forme que ce soit`,
        _spam_message : `🛡️ Anti-Spam`,
        _spam_success : (mode, ms) => `Succès de la modification de l'anti-spam en ${mode} en ${ms} ms`,
        _spam : `⚠️Spam⚠️`,
        _spam_ : (message) => `${message} a été mis en sourdine pour spamming`,
        _nsfw_config : `🔞 Filtrage de contenu NSFW`,
        _nsfw_success : (mode, ms) => `Succès de la modification du détecteur de contenu NSFW en ${mode} en ${ms} ms`,
        _nsfw_message : (argsList) => `Cette fonction vous permet, à vous et à votre serveur, de maintenir un environnement sûr et propre à votre communauté\nCette fonction est basée sur un modèle d'apprentissage profond entraîné avec une reconnaissance des images nsfw\nPrécision de plus de 93%\n\nArguments : ${argsList}`,
        _nsfw_config_NaN : (arg) => `${arg} n'est pas un nombre ou est au-delà de l'intervalle autorisé`,
        _nsfw_success_threshold : (threshold, ms) => `Le seuil NSFW a été mis à jour avec succès à ${threshold} en ${ms} ms`,

        
}
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(...args);
    else return translation;
};

module.exports = translate;