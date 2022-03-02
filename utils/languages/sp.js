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
        _mensaje_spam: `🛡️ Antispam`,
        _spam_success: (mode, ms) => `Con éxito ${mode} anti-spam en ${ms} ms`,
        _spam: `⚠️Spam⚠️`,
        _spam_: (mensaje) => `${mensaje} ha sido silenciado por spam`,
        _nsfw_config: `🔞 Filtrado de contenido NSFW`,
        _nsfw_success: (mode, ms) => `Filtrado de contenido con éxito ${mode} en ${ms} ms`,
        _nsfw_message: (argsList) => `Esta función le permite a usted y a su servidor mantener un entorno seguro y adecuado para su comunidad\nEsto se basa en un modelo de aprendizaje profundo entrenado con reconocimiento de imágenes nsfw\nPrecisión de más del 93 %\n\nArgumentos: ${argsList}`,
        _nsfw_config_NaN: (arg) => `${arg} no es un número o está fuera del rango permitido`,
        _nsfw_success_threshold: (threshold, ms) => `El umbral NSFW se actualizó con éxito a ${threshold} en ${ms} ms`,
        _nsfw_threshold_: (arg) => `Argumento: ${arg}\nInformaciones:\nEl argumento de umbral en este comando es necesario para asegurarse de que no haya falsos positivos o al menos para limitar el riesgo de falsos positivos\n
        El argumento de rango en este comando es de 1 a 100, siendo el porcentaje de la probabilidad de que la imagen sea nsfw\n
        Ejemplo de respuesta de IA en una imagen NSFW:````{ className: 'Hen***', probability: 0.5407443642616272 }\n{ className: 'Po**', probability: 0.5407443642616272 }````\n
        La probability es el porcentaje de la probabilidad de que la imagen sea nsfw\nSi no eres bueno en matemáticas, esto es simple, probabilidad = número entre 0 y 100 dividido por 100, 10 % => 0,10\n
        Recomendamos un valor del 40% al 60% para evitar falsos positivos o falsos negativos`
        
}
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(...args);
    else return translation;
};

module.exports = translate;
