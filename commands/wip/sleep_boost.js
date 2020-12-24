module.exports.run = async (client,message,args,logger,db,embed) => {
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        message.channel.send(embed.reg_plz(user))
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 수면유도 명령어 | 미등록 회원`)
    }else{
        async function play(voiceChannel) {
            const connection = await voiceChannel.join()
            connection.play('audio.mp3')
        }
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 수면유도 | 성공`)
    }
}


module.exports.help = {
    name : "수면유도",
    aliases: ['수면유도음악']
}