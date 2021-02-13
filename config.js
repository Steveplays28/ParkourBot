module.exports = {
    bot_color:      "#3498DB",
    managing_color: "#0FCFDF",
    err_color:      "#EE1111",
    prefix:         "?",
    permissions: {
        "shutdown"      : "MANAGE_SERVER",
        "none-command"  : "SEND_MESSAGES",
        "help"          : "SEND_MESSAGES",
        "lfg"           : "SEND_MESSAGES",
        "pins"          : "SEND_MESSAGES",
        "rules"         : "SEND_MESSAGES",
        "stoplfg"       : "SEND_MESSAGES",
        "tempmute"      : "MANAGE_MESSAGES",
        "kick"          : "KICK_MEMBERS",
        "ban"           : "BAN_MEMBERS"
    },
    mute: {
        mute_role_name:             "Stalker",
        muted_color:                "#D61D00",
        mute_default_timeout:       "60s"
    },
    logging_channel:                'mod log',
    message_deletion_timeout:      4000
}