require('./settings');
const fs = require('fs');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const FileType = require('file-type');
const { exec } = require('child_process');
const whatsapp = require('whatsapp-web.js');
const client = new whatsapp.Client();
const { say } = require('cfonts')
const os = require('os');
const { Boom } = require('@hapi/boom');

const { default: makeWASocket, WAConnection, generateWAMessageFromContent, 
prepareWAMessageMedia, useMultiFileAuthState, Browsers, DisconnectReason, makeInMemoryStore, makeCacheableSignalKeyStore, fetchLatestWaWebVersion, proto, PHONENUMBER_MCC, getAggregateVotesInPollMessage } = require('@whiskeysockets/baileys');

const pairingCode = true // au
const { MessagesUpsert, Solving } = require('./source/message')
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, randomToken, randomToken2 } = require('./library/function');
const { welcomeBanner, promoteBanner } = require("./library/welcome.js")
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
const DataBase = require('./source/database');
const database = new DataBase();
(async () => {
  try {
    const loadData = await database.read();
    if (!loadData || Object.keys(loadData).length === 0) {
      global.db = {
        users: {},
        groups: {},
        database: {},
        settings: {}
      };
      await database.write(global.db);
    } else {
      global.db = loadData;
    }
    setInterval(async () => {
      try {
        if (global.db) await database.write(global.db);
      } catch (err) {
        console.error('Gagal menulis database secara berkala:', err);
      }
    }, 3500);
  } catch (err) {
    console.error('Terjadi error saat inisialisasi database:', err);
  }
})();

async function startingBot() {
  try {
    await randomToken()
  } catch (e) {}
  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const { version } = await axios
    .get('https://raw.githubusercontent.com/nstar-y/Bail/refs/heads/main/src/Defaults/baileys-version.json')
    .then((res) => res.data)
  const Biyu = makeWASocket({
    version,
    printQRInTerminal: !pairingCode,
    logger: pino({ level: 'silent' }),
    auth: state,
    browser: ['Ubuntu', 'Chrome', '22.04.2'],
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
      if (store) {
        const msg = await store.loadMessage(key.remoteJid, key.id, undefined)
        return msg?.message || undefined
      }
      return { conversation: 'Botz Biyu' }
    },
  })
  store.bind(Biyu.ev)
if (pairingCode && !Biyu.authState.creds.registered) {
  const correctAnswer = 'biyuoffc'
  let attempts = 0
  const maxAttempts = 3
  let verified = false
  while (attempts < maxAttempts && !verified) {
    const answer = await question(chalk.yellow.bold('Siapa pembuat script ini?\n'))
    if (answer.toLowerCase() === correctAnswer) {
      verified = true
      console.log(chalk.green.bold('Jawaban benar! Silahkan lanjutkan.'))
    } else {
      attempts++
      if (attempts < maxAttempts) {
        console.log(chalk.red.bold(`Jawaban salah! Kesempatan tersisa: ${maxAttempts - attempts}`))
      } else {
        console.log(chalk.red.bold('Jawaban salah! Kesempatan habis.'))
        process.exit()
      }
    }
  }
  let phoneNumber = await question(chalk.yellow.bold('Masukkan Nomor WhatsApp (format internasional tanpa +):\n'))
  phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
  const rawCode = await Biyu.requestPairingCode(phoneNumber, 'BIYUOFFC')
  const pairingFormatted = rawCode.match(/.{1,4}/g).join(' - ')
  console.log(`${chalk.blue.bold('Kode Pairing')} : ${chalk.white.bold(pairingFormatted)}`)
}
  Biyu.ev.on('creds.update', saveCreds)
  Biyu.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, receivedPendingNotifications, qr } = update
    if (connection === 'close') {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode
      if (
        reason === DisconnectReason.connectionLost ||
        reason === DisconnectReason.connectionClosed ||
        reason === DisconnectReason.restartRequired ||
        reason === DisconnectReason.timedOut
      ) {
        console.log(`Connection closed because ${reason}, reconnecting...`)
        startingBot()
      } else if (
        reason === DisconnectReason.badSession ||
        reason === DisconnectReason.loggedOut ||
        reason === DisconnectReason.Multidevicemismatch
      ) {
        console.log('Session invalid or logged out, deleting session and exiting...')
        exec('rm -rf ./session/*')
        process.exit(1)
      } else if (reason === DisconnectReason.connectionReplaced) {
        console.log('Connection replaced, restarting...')
        startingBot()
      } else {
        console.log(`Unknown disconnect reason: ${reason}, closing bot.`)
        Biyu.end(`Unknown disconnect reason: ${reason}`)
      }
    } else if (connection === 'open') {
      console.log(chalk.green.bold(`Bot connected as @${Biyu.user.id.split(':')[0]}`))
      Biyu.sendMessage(
        Biyu.user.id.split(':')[0] + '@s.whatsapp.net',
        {
          text: `*#- Botz Sudah Terhubung ...*

Jangan lupa follow channel developer -> ${global.linkSaluran} untuk mendapatkan update terbaru script ini :)`,
        }
      )
      const formatBytes = (bytes) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
      }
      const formatRuntime = (uptime) => {
        const hours = Math.floor(uptime / 3600)
        const minutes = Math.floor((uptime % 3600) / 60)
        const seconds = Math.floor(uptime % 60)
        return `${hours} jam ${minutes} menit ${seconds} detik`
      }
      console.log(
        chalk.red.bold(`
INFORMATION SERVER
Platform : ${os.type()}
Total Ram : ${formatBytes(os.totalmem())}
CPU Core : ${os.cpus().length}
Runtime Vps : ${formatRuntime(os.uptime())}
\n\n`)
      )
    } else if (receivedPendingNotifications === 'true') {
      console.log('Please wait About 1 Minute...')
    }
    if (qr && !pairingCode) {
      const qrcode = require('qrcode-terminal')
      qrcode.generate(qr, { small: true })
    }
  })
  Biyu.ev.on('messages.upsert', async (message) => {
    await MessagesUpsert(Biyu, message, store)
  })
  Biyu.ev.on('contacts.update', (update) => {
    for (let contact of update) {
      let id = Biyu.decodeJid(contact.id)
      if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
    }
  })

  Biyu.ev.on('group-participants.update', async (update) => {
    const { id, author, participants, action } = update
    try {
      if (!global.db.groups[id] || global.db.groups[id].welcome !== true) return
      const metadata = await Biyu.groupMetadata(id)
      for (let participant of participants) {
        let profile
        try {
          profile = await Biyu.profilePictureUrl(participant, 'image')
        } catch {
          profile = 'https://telegra.ph/file/95670d63378f7f4210f03.png'
        }
        let text = ''
        if (action === 'add') {
          text =
            author.length < 1
              ? `@${participant.split('@')[0]} join via *link group*`
              : author !== participant
              ? `@${author.split('@')[0]} telah *menambahkan* @${participant.split('@')[0]} kedalam grup`
              : ''
          let img = await welcomeBanner(profile, participant.split('@')[0], metadata.subject, 'welcome')
          await Biyu.sendMessage(id, {
            image: { url: img },
            caption: text,
            mentions: [participant, author],
          })
        } else if (action === 'remove') {
          text =
            author.length < 1
              ? `@${participant.split('@')[0]} leave group`
              : author !== participant
              ? `@${author.split('@')[0]} telah *mengeluarkan* @${participant.split('@')[0]} dari grup`
              : ''
          await Biyu.sendMessage(id, { text, mentions: [participant, author] })
        } else if (action === 'promote') {
          let img = await promoteBanner(profile, participant.split('@')[0], metadata.subject, 'promote')
          text = `@${author.split('@')[0]} telah mempromosikan @${participant.split('@')[0]} sebagai admin`
          await Biyu.sendMessage(id, {
            image: { url: img },
            caption: text,
            mentions: [author, participant],
          })
        } else if (action === 'demote') {
          text = `@${author.split('@')[0]} telah menurunkan jabatan @${participant.split('@')[0]}`
          await Biyu.sendMessage(id, { text, mentions: [author, participant] })
        }
      }
    } catch (e) {
      console.error(e)
    }
  })
  await Solving(Biyu, store)
}

startingBot()

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});