const languageData = {
    description_lang: 'Изменить язык бота',
    description_config: 'Настройте обнаружение рейдов для вашего сервера',
    description_help: 'Нужна помощь с нашим ботом?',
    description_ping: 'Понг!',
    description_server: 'Статистика для таких ботаников, как вы :nerd:',
    _config_bad_syntax: (number) => `Неверный синтаксис: ${number} не является целым числом`,
    _config_raid_raidmode: ':gear: Конфигурация режима Raidmode',
    _config_success: (ms) => `✅ Операция завершена через ${ms} миллисекунд`,
    _config_no_configuration: 'Конфигурация для этого сервера не обнаружена',
    _config_raid_configuration: (configuration, prefix, exports) => `Текущая конфигурация:\n${configuration}\nСинтаксис: ${prefix}${exports} raidmode [ номер ] => Количество объединений за 10 секунд до срабатывания режима антирейда`,
    _config_nspam_config: ':gear: Настройка антиспама',
    _config_nspam_configuration: (configuration, prefix, exports) => `Текущая конфигурация:\n${configuration}\nСинтаксис: ${prefix}${exports} antispam [ номер ] => Количество сообщений за 3 секунд до срабатывания антиспама`,
    _config_default: `⚙️ Конфигурация`,
    _config_default_syntax: (exports, argsList) => `Конфигурация бота\nКоманда: ${exports}\n\nАргументы: ${argsList}`,
    _help_help: ':question: Помощь',
    _lang_lang: ':gear: Конфигурация',
    _lang_choices: (langs) => `Пожалуйста, выберите один из следующих языков:\n${langs}`,
    _lang_invalid: ':gear: Неверный язык',
    _lang_lang_configuration: (prefix, exports, argsList) => `Конфигурация бота\n\nКоманда:  ${prefix}${exports}\n\n\nАргументы: ${argsList}`,
    _lang_validation: 'Успешно обновлен язык бота на русский',
    _ping_answer: "У вас есть ответ",
    _ping_response: (ms_lt, ms_api) => `⌛ Задержка составляет ${ms_lt} миллисекунд\n⏲️ API Ping составляет ${ms_api} миллисекунд`,
    _stats_nerd: ':bar_chart: Статистика ботаники',
    _stats_nerd_stats: 'Сделано для ботаников вроде тебя :nerd:',
    _stats_nerd_infos: (model, threads, clock, total_ram, free_ram, used_ram) => `Сделано для ботаников вроде тебя 🤓<:CPU:946565742055292949> Информация о процессоре:\nМодель: ${model}\nКоличество потоков: ${threads}\nчасы: ${clock} Ghz\n\n\n<:RAM:946581194793971712> RAM Информация:\n Общий RAM: ${total_ram}\nДоступный RAM: ${free_ram}\nRAM Используемая процессором: ${used_ram}`,
    _raidmode_raidmode: '🛡️ Raidmode',
    _raidmode_success: (mode, ms) => `Успешно ${mode} raidmode за ${ms} миллисекунд`,
    _logs_logs: `⚙️ Конфигурация журналов`,
    _logs_success: (log, ms) => `Успешно обновлен канал журнала для **${log}** за ${ms} миллисекунд`,
    _logs_bad_syntax: (log) => `❌ "${log}" не является допустимым каналом`,
    _raid_: `⚠️Рейд⚠️`,
    _raid_message: `Предупреждение\nОбнаружен налет`,
    _profanity_message: `🛡️ Проверка лексики ненормативной `,
    _profanity_success: (mode, ms) => `Успешно ${mode} проверка на профанство за ${ms} миллисекунд`,
    _profanity: `⚠️Сквернословие⚠️`,
    _profanity_: (message) => `${message} было помечено как ненормативная лексика в любом виде`,
    _spam_message: `🛡️ Антиспам`,
    _spam_success: (mode, ms) => `Успешно ${mode} антиспам за ${ms} миллисекунд`,
    _spam: `⚠️спам⚠️`,
    _spam_: (member) => `${member} было отключено за рассылку спама`,
    _nsfw_config: `🔞 Фильтрация содержимого NSFW`,
    _nsfw_success: (mode, ms) => `Успешно ${mode} фильтрация содержимого nsfw за ${ms} мс`,
    _nsfw_message: (argsList) => `Эта функция позволяет вам и вашему серверу сохранять среду безопасной и подходящей для вашего сообщества\nОна основана на обученной модели глубокого обучения с распознаванием изображений nsfw\nТочность более 93%\n\nАргументы: ${argsList}`,
    _nsfw_config_NaN: (arg) => `${arg} не является числом или находится за пределами допустимого диапазона`,
    _nsfw_success_threshold: (threshold, ms) => `Успешно обновлен порог NSFW до ${threshold} за ${ms} миллисекунд`,
    _nsfw_threshold_: (arg) => `Аргумент: ${arg}\nИнформация:\nПороговый аргумент в этой команде необходим для того, чтобы убедиться в отсутствии ложных срабатываний или, по крайней мере, ограничить риск ложных срабатываний\n
    Аргумент range в этой команде имеет значение от 1 до 100, являясь процентом вероятности того, что изображение является nsfw\n
    Пример реакции ИИ на NSFW изображение:````{ className: 'Hen***', probability: 0.5407443642616272 }\n{ className: 'Po**', probability: 0.5407443642616272 }````\n
    Probability - это процент вероятности того, что изображение будет nsfw\nЕсли вы не сильны в математике, это просто, вероятность = число от 0 до 100 деленное на 100, 10% => 0.10\n
    Мы рекомендуем значение от 40% до 60%, чтобы избежать ложных срабатываний или ложных отрицаний`,
    
}
const translate = (key, ...args) => {
const translation = languageData[key]; 
if(typeof translation === "function") return translation(...args);
else return translation;
};

module.exports = translate;