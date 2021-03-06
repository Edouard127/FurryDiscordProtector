const languageData = {
        description_lang: 'Change the language of the bot',
        description_config: 'Configure the Raid Detection for your server',
        description_help: 'Need help with our bot ?',
        description_ping: 'Pong !',
        description_server: 'Stats for nerds like you š¤',
        _config_bad_syntax: (number) => `Invalid Syntax: ${number} is not an integer`,
        _config_raid_raidmode: 'āļø Raidmode Configuration',
        _config_success: (ms) => `ā Operation Completed in ${ms} ms`,
        _config_no_configuration: '```No configuration detected for this server```',
        _config_raid_configuration: (configuration) => `Current configuration:\n${configuration}`,
        _config_nspam_config: 'āļø Anti-Spam Configuration',
        _config_nspam_configuration: (configuration, prefix, exports) => `Current configuration:\n\`\`\`${configuration}\`\`\`\nSyntax: ${prefix}${exports} antispam [ number ] => Number of messages in 3 seconds before triggering the Anti-Spam`,
        _config_default: `āļø Config`,
        _config_default_syntax: (exports, argsList) => `Bot Configuration\nCommand: ${exports}\n\nArguments: ${argsList} `,
        _help_help: 'ā Help',
        _lang_lang: 'āļø Languages Setup',
        _lang_choices: (langs) => `Please chose one of the following languages:\n${langs}`,
        _lang_invalid: 'āļø Invalid language',
        _lang_lang_configuration: (prefix, exports, argsList) => `Bot Configuration\nCommand: ${prefix}${exports}\n\nArguments: ${argsList}`,
        _lang_validation: 'Successfully updated bot language to English',
        _ping_answer: "You've got an answer",
        _ping_response: (ms_lt, ms_api, k8s) => `ā Latency is ${ms_lt} ms\nā²ļø API Ping is ${ms_api} ms\n<:shards:953319913039200296> Redis Healthz: \`${k8s}\` ms`,
        _stats_nerd: 'š Nerd Stats',
        _stats_nerd_stats: 'Made for nerds like you š¤',
        _stats_nerd_infos: (model, threads, clock, total_ram, free_ram, used_ram) => `Made for nerds like you š¤\n<:CPU:946565742055292949> CPU Informations:\nModel: ${model}\nNumber of Threads: ${threads}\nClock: ${clock} Ghz\n\n<:RAM:946581194793971712> RAM Informations:\n Total RAM: ${total_ram}\nFree RAM: ${free_ram}\nRAM Used by process: ${used_ram}`,
        _raidmode_raidmode: 'š”ļø Raidmode',
        _raidmode_success: (mode, ms) => `Successfully ${mode} raidmode in ${ms} ms`,
        _logs_logs: `āļø Logs Configuration`,
        _logs_success: (log, ms) => `Successfully updated the log channel for **${log}** in ${ms} ms`,
        _logs_bad_syntax: (log) => `ā "${log}" is not a valid channel`,
        _raid_: `ā ļøRaidā ļø`,
        _raid_message: `Warning\nA raid has been detected\nMake sure to disable the raidmode with &raidmode`,
        _profanity_message: `š”ļø Profanity Checker`,
        _profanity_success: (mode, ms) => `Successfully ${mode} profanity checker in ${ms} ms`,
        _profanity: `ā ļøProfanityā ļø`,
        _profanity_: (message) => `${message} has been flagged as profanity in any kind`,
        _spam_message: `š”ļø Anti-Spam`,
        _spam_success: (mode, ms) => `Successfully ${mode} anti-spam in ${ms} ms`,
        _spam: `ā ļøSpamā ļø`,
        _spam_: (message) => `${message} has been muted for spamming`,
        _nsfw_config: `š NSFW Content Filtering`,
        _nsfw_success: (mode, ms) => `Successfully ${mode} nsfw content filtering in ${ms} ms`,
        _nsfw_message: (argsList) => `This function allows you and your server to keep an environment safe and proper to your community\nThis is based on a Trained Deep Learning Model with nsfw images recognition\nAccuracy of over 93%\n\nArguments: ${argsList}`,
        _nsfw_config_NaN: (arg) => `${arg} is not a number or is beyond the range allowed`,
        _nsfw_success_threshold: (threshold, ms) => `Successfully updated NSFW threshold to ${threshold} in ${ms} ms`,
        _nsfw_threshold_: "Informations:\nThe threshold argument on this command is required to make sure that there is no false positive or at least limiting the risk of false positives\nThe range argument on this command is from 1 to 100, being the percentage of the probability of the image being nsfw\nExample of AI response on a NSFW Image:```{ className: 'Hen***', probability: 0.5407443642616272 }\n{ className: 'Po**', probability: 0.5407443642616272 }```\nThe Probability being the percentage of the probability of the image being nsfw\nIf you are not good at maths, this is simple, probability = number between 0 and 100 divided by 100, 10% => 0.10\nWe recommend a value from 60% to 80% to avoid false positives or false negatives",
        _nsfw_invalid_chan: (arg) => `ā "${arg}" is not a valid channel`,
        _gore_warning: `Your image has been flagged as gore, please refrain from posting this kind of stuff to avoid your account getting banned from Discord`,
        _nsfw_warning: `Your image has been flagged as NSFW, please refrain from posting this kind of stuff`,

        
}
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(...args);
    else return translation;
};

module.exports = translate;