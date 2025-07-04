const DefaultSettings = 
{
	"DEBUG": false,
    "WINDWALK_KEY": "f11",
    "WINDWALK_KEY_DESCRIPTION": "Botao para usar a skill Wind Walk.",
    "SEQ_FIRE_KEY": "f12",
    "SEQ_FIRE_KEY_DESCRIPTION": "Botao para usar a skill Sequential Fire.",
    "WINDWALK_FIRST": true,
    "WINDWALK_FIRST_DESCRIPTION": "Priorizar o uso do Wind Walk, se nao tiver RE suficiente usara o Sequential Fire.",
    "PENETRATING_CANCEL": false,
    "PENETRATING_CANCEL_DESCRIPTION": "Cancelar a animacao da Penetrating.",
    "RADIANT_CANCEL": false,
    "RADIANT_CANCEL_DESCRIPTION": "Cancelar a animacao da Radiant.",
    "THUNDERBOLT_CANCEL": false,
    "THUNDERBOLT_CANCEL_DESCRIPTION": "Cancelar a animacao da Thunderbolt.",
    "RAPIDFIRE_CANCEL": false,
    "RAPIDFIRE_CANCEL_DESCRIPTION": "Cancelar a animacao da Rapid Fire utilizando o Wind Walk.",
    "WINDSONG_KEYS": false,
    "WINDSONG_KEYS_DESCRIPTION": "Precionar os botoes KEY_A, KEY_B e KEY_C assim que a habilidade Windsong for ativada.",
    "KEY_A": "f1",
    "KEY_B": "f2",
    "KEY_C": "f3"
}

module.exports = function MigrateSettings(from_ver, to_ver, settings)
{
    if (from_ver === undefined)
        {
        // Migrate legacy config file
        return Object.assign(Object.assign({}, DefaultSettings), settings);
    }
    else if (from_ver === null) {
        // No config file exists, use default settings
        return DefaultSettings;
    }
}