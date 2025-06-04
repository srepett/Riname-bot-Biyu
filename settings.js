const fs = require('fs');
const chalk = require('chalk');
const { version } = require("./package.json")

// Settings Bot 
global.owner = '6283853787611'
global.versi = version
global.namaOwner = "Skyzaa - zxz"
global.packname = 'Bot WhatsApp By zxz'
global.botname = 'Alya - zxz'
global.botname2 = 'Alya - zxz'

global.tempatDB = 'database.json' // Jangan ubah
global.pairing_code = true // Jangan ubah

// Settings Link / Tautan
global.linkOwner = "https://wa.me/6283853787611"
global.linkGrup = "https://chat.whatsapp.com/Jv5SIEQV3jNGpIvWy2lmSC"

// Delay Jpm & Pushctc || 1000 = 1detik
global.delayJpm = 3000
global.delayPushkontak = 6000

// Settings Channel / Saluran
global.linkSaluran = "https://whatsapp.com/channel/0029VakakCcLI8YV5UInP61u"
global.idSaluran = "120363304085949644@newsletter"
global.namaSaluran = "Zymzz - zxz <[ Information ]>"

// Tutorial Ngocok Orkut :
// * Ke CS Orkut @orderkuota 
// Teks :Kak bisa tolong buatin akun H2H kak? 
// Ntar disuruh menuliskan nama dan nomer akun orkut lu
//* klau udh di ksih pencet link okeconnect.com
//* login okeconnect.com
//* klik pojok kanan atas (garis tiga) 
//* klik Payment H2H
//* klik integrasi API
//* jadi deh Api orkut mu
//* yang qris ke website : https://scanqr.org
//Kamu upload gambar qris orderkuota mu 
//Ntar ada semacam nomer/api
//Note :
//Qris orkut wajib kecetak
// Info : https://whatsapp.com/channel/0029VakRR89L7UVPwf53TB0v/2682
global.pinH2H = "-"
global.passwordH2H = "-"
global.merchantIdOrderKuota = "OK1916757"
global.apiOrderKuota = "508792517380208121916757OKCT388147E784BC65D0E9D0735EB0C39FB5"
global.qrisOrderKuota = "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214850085847188690303UMI51440014ID.CO.QRIS.WWW0215ID20243345542820303UMI5204541153033605802ID5920BIYU STORE OK19167576008MAGELANG61055611162070703A016304FB3C"

// Settings Api Digital Ocean
global.apiDigitalOcean = "-"

// Settings Api Digital Ocean
global.apiSimpelBot = "simplebotz85"


// Settings All Payment
global.shopepay = "Tidak Tersedia"
global.dana = "6283853787611"
global.ovo = "Tidak Tersedia"
global.gopay = "6283853787611"

// Settings Image Url
global.image = {
menu: "https://img102.pixhost.to/images/79/556578143_biyu.jpg", 
reply: "https://img102.pixhost.to/images/79/556578143_biyu.jpg", 
logo: "https://img102.pixhost.to/images/79/556578143_biyu.jpg", 
dana: "https://img102.pixhost.to/images/79/556578147_biyu.jpg", 
ovo: "https://img102.pixhost.to/images/79/556578147_biyu.jpg", 
gopay: "https://img102.pixhost.to/images/79/556578147_biyu.jpg", 
qris: "https://img102.pixhost.to/images/79/556578147_biyu.jpg"
}

//=============================================//
// Settings Api Panel Pterodactyl
global.egg = "15" // Egg ID
global.nestid = "5" // nest ID
global.loc = "1" // Location ID
global.domain = "https://-"
global.apikey = "-" //ptla
global.capikey = "-" //ptlc

// Settings Api Panel Pterodactyl Server 2
global.eggV2 = "15" 
global.nestidV2 = "5" 
global.locV2 = "1" 
global.domainV2 = "https://-"
global.apikeyV2 = "-" 
global.capikeyV2 = "-" 

// Settings Api Panel Pterodactyl Server 3
global.eggV3 = "15"
global.nestidV3 = "5"
global.locV3 = "1"
global.domainV3 = "https://-"
global.apikeyV3 = "-"
global.capikeyV3 = "-"

// Settings Api Panel Pterodactyl Server 4
global.eggV4 = "15"
global.nestidV4 = "5"
global.locV4 = "1"
global.domainV4 = "https://-"
global.apikeyV4 = "-"
global.capikeyV4 = "-"

// Settings Api Panel Pterodactyl Server 5
global.eggV5 = "15"
global.nestidV5 = "5"
global.locV5 = "1"
global.domainV5 = "https://-"
global.apikeyV5 = "-"
global.capikeyV5 = "-"
//=============================================//

// Settings Api Subdomain
global.subdomain = {
  "biyu.biz.id": {
    "zone": "c2fe010b63d4c0d309577fc9bd6f9c1f",
    "apitoken": "2SoTGasHWwiuKAnlDA_4a3_m2aGTmZkumFLPPXu4"
  },
  "server-digital.biz.id": {
    "zone": "79da13b237bec0ca68111fa5871505a6",
    "apitoken": "x4-qSH-FnheDbPBOQGiZlBmuSQ348nbPk3d2q1yB"
  },
  "biyu-host.biz.id": {
    "zone": "bcca74aeb73d43e00bea0f7c34bd11ca",
    "apitoken": "rbhyae0TwhRmJsDrda854UDCouqHo4mmcZvVjKgV"
  },
  "biyu-hosting.biz.id": {
    "zone": "7e50cad37406fdbb0594102971a6daa8",
    "apitoken": "Dwln5pzLoASEv5foNShL1kiqlfSlARtSN4UOlPz7"
  },
  "biyu-offc.biz.id": {
    "zone": "486604cbd7c410b1d883ce35da2d95f6",
    "apitoken": "dQ-ngEWnm19tYkh5AwZa2jCmCkE7cXyuCDSuEdMR"
  },
  "biyuoffc.biz.id": {
    "zone": "243d33aaea94556a964de645a4c75415",
    "apitoken": "7vDDeQxGdxnsn9zsHVYJ3sK-PJ1cHxIEinO587RK"
  },
  "biyu-store.biz.id": {
    "zone": "a2d8162a463dee07506405cdd2bba139",
    "apitoken": "_vNnPOG9i8zifZ1ievbB89I6PTzdjJcdEELN-MyY"
  },
  "biyu-host.my.id": {
    "zone": "8f67922b06ea272475ff74f9e4fba49f",
    "apitoken": "I71D6CTA1tWBqmFnGyzjP2qUBlf5xZAkVAxwzfbh"
  },
  "biyu-hosting.my.id": {
    "zone": "b36040767e858d1a547666bf4b011fc6",
    "apitoken": "mv56xh9psIdTkn7FIxKNlRDfTzzNFMWrtYaIjVCR"
  },
  "biyu-offc.my.id": {
    "zone": "89eb2222b8a39c687ea14031cc2047ed",
    "apitoken": "8foXQ-E74TXlBHQ0XfmFdXoCDCn9pU4INJ214Mj_"
  },
  "biyu-official.my.id": {
    "zone": "6895dd0c05b158b0cfe3f893ba8b57bd",
    "apitoken": "hov-6AxYkvVdML4VfCvLbcpu22-e29313erfg5-r"
  },
  "biyuu.my.id": {
    "zone": "f1d2643a8d019ce2e6cd7abd84dc9c61",
    "apitoken": "CGtNZFnGIarhnof_39I9aab-EUQnvTsuRLweJs_e"
  },
  "yubii.my.id": {
    "zone": "29c09bb207c7499ba8efffea9cf3ec82",
    "apitoken": "KT-MbrhLnYwFLX1ctEfl8z_N0QZvjS3Gm2chaShk"
  },
  "digital-server.my.id": {
    "zone": "f7f77299beb91ae1e013727d47826a7b",
    "apitoken": "4NpK6GwFea2uA8BSXMC99z7Tl1B_TcvHvyhzWcTG"
  }
};

// Message Command 
global.mess = {
	owner: "* *Akses Ditolak*\nFitur ini hanya untuk owner bot!",
	admin: "* *Akses Ditolak*\nFitur ini hanya untuk admin grup!",
	botAdmin: "* *Akses Ditolak*\nFitur ini hanya untuk ketika bot menjadi admin!",
	group: "* *Akses Ditolak*\nFitur ini hanya untuk dalam grup!",
	private: "* *Akses Ditolak*\nFitur ini hanya untuk dalam private chat!",
	prem: "* *Akses Ditolak*\nFitur ini hanya untuk user premium!",
	wait: 'Loading...',
	error: 'Error!',
	done: 'Done'
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})