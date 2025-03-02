let pajak = 0.02
let handler = async (m, { conn, text, usedPrefix, command }) => {
    let fail = `this command to give limit to other users\n\nexample:\n${usedPrefix + command} @918113921898 10\nor reply to doi's message with the command: ${usedPrefix + command} 10`
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender
    else who = m.chat
    if (!who) {
        conn.reply(m.chat, fail, m, { contextInfo: { mentionedJid: ['918113921898@s.whatsapp.net'] } })
        throw false
    }
    if (typeof global.db.data.users[who] == "undefined") {
        global.db.data.users[who] = {
            النقاط: 0,
            الحدود: 10,
            آخر جائزة: 0,
            التسجيل: false,
            الاسم: conn.getName(m.sender),
            العمر: -1,
            تايم: -1,
            فهم: -1,
            سبب: '',
            ممنوع: false,
            لفل: 0,
            الاتصال: 0,
            الدور: 'Warrior V',
            لفل تلقائي: false,
            حاسوب: 0,
        }
    }
    let txt = text.replace('@' + who.split`@`[0], '').trim()
    if (!txt) {
        conn.reply(m.chat, fail, m, { contextInfo: { mentionedJid: ['918113921898@s.whatsapp.net'] } })
        throw false
    }
    if (isNaN(txt)) throw 'only numbers'
    let poin = parseInt(txt)
    let limit = poin
    let pjk = Math.ceil(poin * pajak)
    limit += pjk
    if (limit < 1) throw 'Minimum 1'
    let users = global.db.data.users
    if (limit > users[m.sender].limit) throw 'The limit is not enough to transfer, there is a tax too'
    users[m.sender].limit -= limit
    users[who].limit += poin

    m.reply(`(${-poin} Limit) + (${-pjk} Limit (Tax 2%)) = ( ${-limit} Limit)`)
    conn.fakeReply(m.chat, `+${poin} Limit`, who, m.text)
}
handler.help = ['paylimit @user <amount>']
handler.tags = ['xp']
handler.command = /^payl(imit)?$/

module.exports = handler
