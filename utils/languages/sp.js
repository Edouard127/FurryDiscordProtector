const languageData = {
        description_lang: 'Cambiar el idioma del bot',
        description_config: 'Configure la Detección de Incursiones para su servidor',
        description_help: '¿Necesitas ayuda con nuestro bot?',
        description_ping: '¡Pong!',
        description_server: 'Estadísticas para nerds como tú 🤓',
        _config_bad_syntax: (number) => `Sintaxis no válida: ${number} no es un número entero`,
        _config_raid_raidmode: '⚙️ Configuración del modo Raid',
        _config_success: (ms) => `✅ Operación completada en ${ms} ms`,
        _config_no_configuration: '```No se detectó ninguna configuración para este servidor```',
        _config_raid_configuration: (configuration, prefix, exports) => `Configuración actual:\n${configuration}\nSintaxis: ${prefix}${exports} raidmode [ número ] => Número de uniones en 10 segundos antes de activar el modo Anti-Raid`,
        _config_nspam_config: '⚙️ Configuración antispam',
        _config_nspam_configuration: (configuration, prefix, exports) => `Configuración actual:\n${configuration}\nSintaxis: ${prefix}${exports} antispam [ número ] => Número de mensajes en 3 segundos antes de activar el Anti-Spam`,
        _config_default: `⚙️ Config`,
        _config_default_syntax: (exports, argsList) => `Configuración del bot\nComando: ${exports}\n\nArgumentos: ${argsList}`,
        _help_help: '❓ Ayuda',
        _lang_lang: '⚙️ Configuración',
        _lang_choices: (langs) => `Elija uno de los siguientes idiomas:\n${langs}`,
        _lang_invalid: '⚙️ Idioma inválido',
        _lang_lang_configuration: (prefix, exports, argsList) => `Configuración del bot\nComando: ${prefix}${exports}\n\nArgumentos: ${argsList}`,
        _lang_validation: 'Idioma del bot actualizado con éxito al español',
        _ping_answer: "tienes una respuesta",
        _ping_response: (ms_lt, ms_api) => `⌛ La latencia es de ${ms_lt} ms\n⏲️ El ping de la API es de ${ms_api} ms`,
        _stats_nerd: '📊 Estadísticas de empollón',
        _stats_nerd_stats: 'Hecho para nerds como tú 🤓',
        _stats_nerd_infos: (model, threads, clock, total_ram, free_ram, used_ram) => `<:CPU:946565742055292949> Información de CPU:\nModelo: ${model}\nNúmero de subprocesos: ${threads}\nReloj: ${clock} Ghz\n\n<:RAM:946581194793971712> Información de RAM:\n RAM total: ${total_ram}\n RAM libre: ${free_ram}\nRAM utilizada por el proceso: ${used_ram}`,
        _raidmode_raidmode: '🛡️ Modo Incursión',
        _raidmode_success: (mode, ms) => `Con éxito ${mode} raidmode en ${ms} ms`,
        _logs_logs: `⚙️ Configuración de registros`,
        _logs_success: (log, ms) => `Se actualizó con éxito el canal de registro para **${log}** en ${ms} ms`,
        _logs_bad_syntax: (log) => `❌ "${log}" no es un canal válido`,
        _raid_: `⚠️Incursión⚠️`,
        _raid_message: `Advertencia\nSe ha detectado una redada`,
        _profanity_message: `🛡️ Comprobación de blasfemias`,
        _profanity_success: (mode, ms) => `Exitosamente ${mode} comprobación de blasfemias para ${ms} ms`,
        _profanity: `⚠️Blasfemias⚠️`,
        _profanity_: (message) => `${message} ha sido marcado como blasfemia de cualquier tipo`,
        
}
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(...args);
    else return translation;
};

module.exports = translate;