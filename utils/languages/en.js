const languageData = {
        description_lang: 'Change the language of the bot',
        description_config: 'Configure the Raid Detection for your server',
        description_help: 'Need help with our bot ?',
        description_ping: 'Pong !',
        description_server: 'Stats for nerds like you 🤓',
        _config_bad_syntax: (number) => `Invalid Syntax: ${number} is not an integer`,
        _config_raid_raidmode: '⚙️ Raidmode Configuration',
        _config_success: (ms) => `✅ Operation Completed in ${ms} ms`,
        _config_no_configuration: '```No configuration detected for this server```',
        _config_raid_configuration: (configuration, prefix, exports) => `Current configuration:\n${configuration}\nSyntax: ${prefix}${exports} raidmode [ number ] => Number of joins in 10 seconds before triggering the Anti-Raid Mode`,
        _config_nspam_config: '⚙️ Anti-Spam Configuration',
        _config_nspam_configuration: (configuration, prefix, exports) => `Current configuration:\n${configuration}\nSyntax: ${prefix}${exports} antispam [ number ] => Number of messages in 3 seconds before triggering the Anti-Spam`,
        _config_default: `⚙️ Config`,
        _config_default_syntax: (exports, argsList) => `Bot Configuration\nCommand: ${exports}\n\nArguments: ${argsList} `,
        _help_help: '❓ Help',
        _lang_lang: '⚙️ Languages Setup',
        _lang_choices: (langs) => `Please chose one of the following languages:\n${langs}`,
        _lang_invalid: '⚙️ Invalid language',
        _lang_lang_configuration: (prefix, exports, argsList) => `Bot Configuration\nCommand: ${prefix}${exports}\n\nArguments: ${argsList}`,
        _lang_validation: 'Successfully updated bot language to English',
        _ping_answer: "You've got an answer",
        _ping_response: (ms_lt, ms_api) => `⌛ Latency is ${ms_lt} ms\n⏲️ API Ping is ${ms_api} ms`,
        _stats_nerd: '📊 Nerd Stats',
        _stats_nerd_stats: 'Made for nerds like you 🤓',
        _stats_nerd_infos: (model, threads, clock, total_ram, free_ram, used_ram) => `Made for nerds like you 🤓\n<:CPU:946565742055292949> CPU Informations:\nModel: ${model}\nNumber of Threads: ${threads}\nClock: ${clock} Ghz\n\n<:RAM:946581194793971712> RAM Informations:\n Total RAM: ${total_ram}\nFree RAM: ${free_ram}\nRAM Used by process: ${used_ram}`,
        _raidmode_raidmode: '🛡️ Raidmode',
        _raidmode_success: (mode, ms) => `Successfully ${mode} raidmode in ${ms} ms`,
        _logs_logs: `⚙️ Logs Configuration`,
        _logs_success: (log, ms) => `Successfully updared the log channel for **${log}** in ${ms} ms`,
        _logs_bad_syntax: (log) => `❌ "${log}" is not a valid channel`,
        _raid_: `⚠️Raid⚠️`,
        _raid_message: `Warning\nA raid has been detected`,
        _profanity_message: `🛡️ Profanity Checker`,
        _profanity_success: (mode, ms) => `Successfully ${mode} profanity checker in ${ms} ms`,
        _profanity: `⚠️Profanity⚠️`,
        _profanity_: (message) => `${message} has been flagged as profanity in any kind`,
        _spam_message: `🛡️ Anti-Spam`,
        _spam_success: (mode, ms) => `Successfully ${mode} anti-spam in ${ms} ms`,
        _spam: `⚠️Spam⚠️`,
        _spam_: (message) => `${message} has been muted for spamming`,
        _nsfw_config: `🔞 NSFW Content Filtering`,
        _nsfw_success: (mode, ms) => `Successfully ${mode} nsfw content filtering in ${ms} ms`,
        _nsfw_message: (argsList) => `This function allows you and your server to keep an environment safe and proper to your community\nThis is based on a Trained Deep Learning Model with nsfw images recognition\nAccuracy of over 93%\n\nArguments: ${argsList}`,
        _nsfw_config_NaN: (arg) => `${arg} is not a number`

        
}
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(...args);
    else return translation;
};

module.exports = translate;