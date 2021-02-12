module.exports = {
    bot_color:      "#3498DB",
    managing_color: "#0FCFDF",
    err_color:      "#EE1111",
    prefix:         "?",
    permissions: {
        "help"          : "SEND_MESSAGES",
        "kick"          : "KICK_MEMBERS",
        "lfg"           : "SEND_MESSAGES",
        "none-command"  : "SEND_MESSAGES",
        "pins"          : "SEND_MESSAGES",
        "rules"         : "SEND_MESSAGES",
        "shutdown"      : "MANAGE_SERVER",
        "stoplfg"       : "SEND_MESSAGES",
        "tempmute"      : "MANAGE_MESSAGES"
    },
    mute: {
        required_permission:        "MANAGE_MESSAGES",
        mute_role_name:             "Stalker",
        muted_color:                "#D61D00",
    },
    logging_channel:                'mod log',
    message_deletiong_timeout:      4000
}