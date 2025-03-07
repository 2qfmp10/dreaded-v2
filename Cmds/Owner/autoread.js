const { getSettings, updateSetting } = require('../../config');
const ownerMiddleware = require('../../Middleware/ownerMiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { m, args } = context;
        const value = args[0]?.toLowerCase();

        let settings = await getSettings();

        if (!settings) {
            await updateSetting('autoread', true); 
            settings = { autoread: true };
        }

        if (value === 'on') {
            await updateSetting('autoread', true);
            await m.reply('✅ Autoread has been turned ON. Bot will autoread messages!');
        } else if (value === 'off') {
            await updateSetting('autoread', false);
            await m.reply('❌ Autoread has been turned OFF.');
        } else {
            await m.reply(`📄 Current autoread setting: ${settings.autoread ? 'ON' : 'OFF'}\n\n Use "autoread on" or "autoread off".`);
        }
    });
};