const func = require('../../../src/functions')
const num = /^\d+$/
const filter = m => num.test(m)

module.exports.run = async (client, message, args, db, logger, embed) => {
    let time 
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
            message.channel.send(embed.custom_first(user)).then(() => {
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        if(1 <= collected.first().content && collected.first().content <= 10){
                            (async () => {
                                let dataa = collected.first().content
                                if(dataa == 1) song = await client.musicManager.getSongs(`ytsearch: ☃️🚶‍♀️ 눈길을 걷다가 고요한 잠을 청하는 겨울 감성 수면 스토리 명상, 마음의 위안을 주는 겨울 동화 이야기 [BSM Level 1 - 몸과 마음의 안정]`)
                                if(dataa == 2) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 별자리 사자`)    
                                if(dataa == 3) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 별자리 물병`)    
                                if(dataa == 4) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 바닷가 산책`) 
                                if(dataa == 5) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 잠재의식 수면유도`)    
                                if(dataa == 6) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 잔여긴장 해소`) 
                                if(dataa == 7) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 바닷속 여행`) 
                                if(dataa == 8) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 상처 염증 자연치유`)    
                                if(dataa == 9) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 체온유지`) 
                                if(dataa == 10) song = await client.musicManager.getSongs(`ytsearch: 브레이너제이 우울증`)   
                                client.musicManager.handleVideo(message, message.member.voice.channel, song[0])  
                                if(dataa == 5 || dataa == 6){
                                    time = 90
                                }else{
                                    time = 180
                                }
                            message.channel.send(`앞으로 몇분 더 주무실건가요? 현재 수면시간 : ${time}분\n30으로 나누어 떨어지는 숫자가 좋아요! 아니면 반올림됩니다`).then(() => {
                                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                                    .then(msg => {
                                        (async () => {
                                        let loop = Math.round(msg.first().content / 30)
                                        console.log(loop)
                                        let i
                                        for(i=0;i<loop;i++){
                                            song = await client.musicManager.getSongs(`브레이너제이 30분 수면블록`)  
                                            client.musicManager.handleVideo(message, message.member.voice.channel, song[0])
                                        }
                                        song = await client.musicManager.getSongs(`브레이너제이 기상패턴 N타입`)  
                                        client.musicManager.handleVideo(message, message.member.voice.channel, song[0])
                                        message.channel.send(`커스텀 수면가이드가 제작되었습니다\n총 수면시간${time + Math.round(msg.first().content / 30) * 30}분`)
                                        })()
                                    })
                                })
                            })()
                        }

                    })
                    .catch(collected => {
                        message.channel.send("시간이 초과되었습니다 숫자를 입력해주세요")
                    })
                })
                
        }
    }
}


module.exports.help = {
    name : "커스텀",
    aliases: ['맞춤','맞춤숙면','맞춤숙면가이드']
}

