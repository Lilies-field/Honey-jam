const { Client } = require('discord.js')
const Discord = require('discord.js')
const client = new Discord.Client()
const MusicManager = require("./MusicManager")
const embed = require('../../../src/embed/embed')
const logger = require('../../../src/logger/log')
const fs = require('fs')
const db = require('../../../src/db/db_connection')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

/**
 * @class MusicClient
 * @extends client 
 */
class MusicClient extends Client {
    /**
     * @param {import("discord.js").ClientOptions} [opt]
     */
    constructor(opt) {
        super(opt)
        client.config = require("../config.json")
        client.musicManager = null;

        client.login(client.config.token)

        fs.readdir(`./music/src/commands`, (err,files) => {
            if (err) {
                console.log(err)
            }
        
            let cmdFiles = files.filter(f => f.split(".").pop() === "js")
            console.log(`=============음악=============`)
            console.log(cmdFiles)
            if (cmdFiles.length === 0){
                console.log("불러올 파일이 없습니다")
                return
            }
        
            cmdFiles.forEach((f,i) => {
                let props = require(`../commands/${f}`)
                console.log(`${i+1}: ${f} 로드됨`)
                client.commands.set(props.help.name, props)
                props.help.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name)
                                
                    })
            })
        })
        client.on("ready", () => {
            client.musicManager = new MusicManager(client)
            console.log("Bot is online!")
        })
        client.on('message',msg => {
            if (msg.channel.type === "dm") return
            if (msg.author.bot) return
                let prefix = "&"
                let messageArray = msg.content.split(" ")
                let cmd = messageArray[0].toLowerCase()
                let args = messageArray.slice(1)
                if(!msg.content.startsWith(prefix)) return
                let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
                if(commandfile) commandfile.run(client, msg, args, db, logger, embed)
        })
    }
}

module.exports = MusicClient