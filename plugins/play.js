const { servers, yta, ytv } = require('../lib/y2mate')
let yts = require('yt-search')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `uhm.. what are you looking for?\n\nexample:\n${usedPrefix + command} Heatwaves`
  let chat = global.db.data.chats[m.chat]
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Content Not found'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\ntry again...'}`)
    }
  } 
  let { dl_link, thumb, title, filesize, filesizeF } = yt
  await conn.send2ButtonImg(m.chat, await (await fetch(thumb)).buffer(), `
*العنوان:* ${title}
*حجم الصوت:* ${filesizeF}
*حجم الفيديو:* ${yt2.filesizeF}
*Play Doesnt Work ,In Disappearing mode*
`.trim(), watermark, '🔊 اوديو', `.yta ${vid.url}`, '🎥 فيديو', `.ytv ${vid.url}`)
}
handler.help = ['song','play','?'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play|song)$/i

handler.exp = 0

module.exports = handler
