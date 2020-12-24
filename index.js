// 모듈 
const config = require('./src/config')
const funcs = require('./src/functions')
const embed = require('./src/embed/embed')
const logger = require('./src/logger/log')
const db = require('./src/db/db_connection')
const fs = require('fs')

// 봇 설정
const Discord = require('discord.js')
const myIntents = new Discord.Intents(['GUILDS','GUILD_MESSAGES'])
const client = new Discord.Client({ws:{intents:myIntents}})
const command_option = ['developer','wip']
client.commands = new Discord.Collection()
client.aliases =  new Discord.Collection()

// 명령어파일 불러오기
command_option.forEach(element => 
    fs.readdir(`./commands/${element}`, (err,files) => {
        if (err) {
            console.log(err)
        }
    
        let cmdFiles = files.filter(f => f.split(".").pop() === "js")
        console.log(`========commands about ${element}========`)
    
        if (cmdFiles.length === 0){
            console.log("불러올 파일이 없습니다")
            return
        }
    
        cmdFiles.forEach((f,i) => {
            let props = require(`./commands/${element}/${f}`)
            console.log(`${i+1}: ${f} 로드됨`)
            client.commands.set(props.help.name, props)
            props.help.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name)
                            
                })
        })
    })
)

// 봇 켜질시
client.on('ready', async () => {
    logger.info(`봇 준비 완료 | ${client.user.tag} 로 로그인됨`);
    client.user.setActivity(`무의식의 꿈나라`, { type: 'WATCHING' })
})

// 길드 초대시
client.on("guildCreate", guild => {
    logger.info(`새로운 서버에 초대받음: ${guild.name} (id: ${guild.id}). 인원수 ${guild.memberCount}명`)
    client.user.setActivity(`무의식의 꿈나라`, { type: 'WATCHING' })
})

// 길드 추방시
client.on("guildDelete", guild => {
    logger.info(`서버에서 추방당함: ${guild.name} (id: ${guild.id})`)
    client.user.setActivity(`무의식의 꿈나라`, { type: 'WATCHING' })
})

// 메세지 명령어 처리
client.on('message',msg => {
	if (msg.channel.type === "dm") return
    if (msg.author.bot) return
        let prefix = config.prefix
        let messageArray = msg.content.split(" ")
        let cmd = messageArray[0].toLowerCase()
        let args = messageArray.slice(1)
        if(!msg.content.startsWith(prefix)) return
        let commandfile = client.commands.get(cmd.slice(prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(prefix.length)))
        if(commandfile) commandfile.run(client,msg,args,logger,db,embed)
})

// client login
client.login(config.token)
