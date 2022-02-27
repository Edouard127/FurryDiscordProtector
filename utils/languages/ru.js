const languageData = {
    ru: { //Русский
        description_lang: 'Изменить язык бота',
        description_config: 'Настройте обнаружение рейдов для вашего сервера',
        description_help: 'Нужна помощь с нашим ботом?',
        description_ping: 'Понг!',
        description_server: 'Статистика для таких ботаников, как вы :nerd:',
        _config_syntax: (number) => `Неверный синтаксис: ${number} не является целым числом`,
        _config_raid_raidmode: ':gear: Конфигурация режима Raidmode',
        _config_success: (ms) => `✅ Операция завершена через ${ms} миллисекунд`,
        _config_no_configuration: '```Конфигурация для этого сервера не обнаружена```',
        _config_configuration: (configuration, prefix, exports) => `Текущая конфигурация:\n${configuration}\nСинтаксис: ${prefix}${exports} raidmode [ номер ] => Количество объединений за 10 секунд до срабатывания режима антирейда`,
        _config_nspam_config: ':gear: Настройка антиспама',
        _config_nspam_configuration: (configuration, prefix, exports) => `Текущая конфигурация:\n${configuration}\nСинтаксис: ${prefix}${exports} antispam [ номер ] => Количество сообщений за 5 секунд до срабатывания антиспама`,
        _help_help: ':question: Помощь',
        _lang_lang: ':gear: Конфигурация',
        _lang_lang_configuration: (prefix, exports, argsList) => `Конфигурация бота\n\nКоманда:  ${prefix}${exports}\n\n\nАргументы: ${argsList}`,
        _ping_answer: "У вас есть ответ",
        _ping_response: (ms_lt, ms_api) => `⌛ Задержка составляет ${ms_lt} мс\n⏲️ API Ping составляет ${ms_api} миллисекунд`,
        _stats_nerd: ':bar_chart: Статистика ботаники',
        _stats_nerd_stats: 'Сделано для ботаников вроде тебя :nerd:',
        _stats_nerd_infos: (model, threads, clock, total_ram, free_ram, used_ram) => `<:CPU:946565742055292949> Информация о процессоре:\nМодель: ${model}\nКоличество потоков: ${threads}\nчасы: ${clock} Ghz\n\n\n<:RAM:946581194793971712> RAM Информация:\n Всего RAM: ${total_ram}\nБесплатно RAM: ${free_ram}\nRAM Используется процессом: ${used_ram}`,
        
    }
}
const translate = (key, ...args) => {
    const translation = languageData[key]; 
    if(typeof translation === "function") return translation(args);
    else return translation;
};

modules.exports = translate;