// tbot_handler.js (በ Node.js የሚሰራ)

const { Telegraf, Markup } = require('telegraf');

// =========================================================================
// === አስፈላጊ መረጃዎን እዚህ ያስገቡ ===
// =========================================================================
// ⚠️ ቦት ቶከንዎን እዚህ ገብቷል
const BOT_TOKEN = "YOUR_BOT_TOKEN"; // <--- እዚህ ትክክለኛ ቶከንዎን ያስገቡ
// ⚠️ የእርስዎ Web App የሚገኝበትን ሙሉ URL እዚህ ገብቷል
const WEB_APP_URL = "https://newsmartgame.netlify.app"; // <--- የዌብ አፕ ዩአርኤልዎን ያረጋግጡ
// =========================================================================


// ቦት ይፍጠሩ
const bot = new Telegraf(BOT_TOKEN);

// /start ትዕዛዝን ማስተናገድ
bot.start(async (ctx) => {
    // የተጠቃሚውን ስም ያግኙ
    const userName = ctx.from.first_name || "ውድ ተጠቃሚ";
    
    // የእንኳን ደህና መጡ መልዕክት
    const welcomeText = (
        // የተጠቃሚውን ስም እየጠቀሰ እንኳን ደህና መጡ ይላል
        `👋 እንኳን ደህና መጡ ${userName}!\n\n`
        + "ይህ የእለታዊ ስራዎችን እና ጨዋታዎችን መተግበሪያ ነው። "
        + "ነጥቦችን በመሰብሰብ እና በመወዳደር ሽልማቶችን ያግኙ።\n\n"
        + "ለመጀመር ከታች ያለውን 'ጀምር' የሚለውን ቁልፍ ይጫኑ።"
    );

    // የ Web App ቁልፍ ይፍጠሩ
    const keyboard = Markup.inlineKeyboard([
        [
            // የ Telegram Web App (Mini App)ን የሚከፍት Inline Button
            Markup.button.webApp("🚀 ጀምር (Web App)", WEB_APP_URL)
        ]
    ]);
    
    // መልዕክቱን ከቁልፉ ጋር ይላኩ
    await ctx.reply(welcomeText, keyboard);
    
    console.log(`Start command received from user ${ctx.from.id}. Web App button sent.`);
});

// ቦቱን ያስጀምሩ
bot.launch()
    .then(() => {
        console.log('Bot started and listening for commands (Node.js/Telegraf)...');
    })
    .catch((err) => {
        console.error(`Bot failed to start due to error: ${err}`);
        console.error("Please check if your BOT_TOKEN is correct and if the 'telegraf' package is installed.");
    });

// ከማቆም ጋር የተያያዙ ነገሮችን ያቀናብሩ (ለምሳሌ Ctrl+C)
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
