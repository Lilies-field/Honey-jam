const func = require('../../../src/functions')

module.exports.run = async (client, message, args, db, logger, embed) => {
    const serverQueue = client.musicManager.queue.get(message.guild.id)
    const user = message.author
    const data = await db.getUser(message.author.id)
    if(data === undefined){
        let error = await embed.reg_plz(message)
        message.channel.send(error)
    }else{
        if (!message.member.voice.channel){
            message.channel.send("먼저 음성채널에 들어가 주세요")
        }else{
            let song
            song = await client.musicManager.getSongs(`ytsearch: 😪재생의 뇌파소리 | 2.0 Hz 델타파 - '회복 수면' | 2.0 Hz EEG`)
            client.musicManager.handleVideo(message, message.member.voice.channel, song[0])
        }
    }
}


module.exports.help = {
    name : "수면유도",
    aliases: ['수면']
}

