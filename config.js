const { truncate } = require("fs");

module.exports = {
    bot_color: "#3498DB",
    managing_color: "#0FCFDF",
    err_color: "#EE1111",
    prefix: "?",
    mute: {
        required_permission: "MANAGE_MESSAGES",
        mute_role_name: "Stalker",
        muted_color: "#D61D00",
        mod_category_channel_name: 'mod channels'
    },
}