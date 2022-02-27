const string = {
    en: {
        description_lang: 'Change the language of the bot',
        description_config: 'Configure the Raid Detection for your server',
        description_help: 'Need help with our bot ?',
        description_ping: 'Pong !',
        description_server: 'Stats for nerds like you 🤓',
        _config_raid_syntax: 'Invalid Syntax: %VAR% is not an integer',
        _config_raid_raidmode: '⚙️ Raidmode Configuration',
        _config_success: '✅ Operation Completed in %VAR% ms',
        _config_raid_no_configuration: '```No configuration detected for this server```',
        _config_raid_configuration: 'Current configuration:\n%VAR%\nSyntax: %VAR%%VAR% raidmode [ number ] => Number of joins in 10 seconds before triggering the Anti-Raid Mode',
        _config_nspam_config: '⚙️ Anti-Spam Configuration',


    }
}

function getLocale(language, string, ...vars) {
    let locale = strings[language][string];
 
    let count = 0;
    locale = locale.replace(/%VAR%/g, () => vars[count] !== null ? vars[count] : "%VAR%");
 
    return locale;
 }