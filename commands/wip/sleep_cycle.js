module.exports.run = async (client,message,args,logger,db,embed) => {
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        message.channel.send(embed.reg_plz(user))
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 사이클 | 미가입`)
    }else{
        message.channel.send(embed.sleep_cycle(user))
        logger.info(`[${user.username}#${user.discriminator} (${user.id})] 사이클 | 성공`)
    }
}


module.exports.help = {
    name : "수면사이클",
    aliases: ['사이클']
}