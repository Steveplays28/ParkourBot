const { truncate } = require("fs");

module.exports = {
    bot_color: "#3498DB",
    managing_color: "#0FCFDF",
    err_color: "#EE1111",
    prefix: "!",
    mute: {
        required_permission: "MANAGE_MESSAGES",
        mute_role_name: "muted",
        muted_color: "#D61D00",
        permissions_bool: {
            'SEND_MESSAGES' : false,
            'ADD_REACTIONS' : false,
            'CREATE_INSTANT_INVITE' : false,
            'READ_MESSAGE_HISTORY' : true,
            'VIEW_CHANNEL' : true
        },
        permissions: [
            'VIEW_CHANNEL'
        ],
        mod_category_channel_name: 'mod channels'
    },
    message_deletiong_timeout: 4000
}