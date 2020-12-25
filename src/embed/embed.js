const Discord = require('discord.js')
const color = require('./color')

function reg_plz(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.sucess)
    .setTitle('이용자 가입이 필요해요')
    .setDescription(`\`&가입\` 으로 가입을 해주세요`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

function reg_already(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.error)
    .setTitle('가입 불가!')
    .setDescription(`이미 가입하셨네요!`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

function reg_info(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.sucess)
    .setTitle('가입되셨습니다!')
    .setDescription(`축하드려요(?)`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

function sleep_cycle(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.sucess)
    .setTitle('수면 사이클에 관하여')
    .setDescription(`사람이 수면할때는 약 90분을 기준으로 램수면과 논램수면을 반복합니다\n램수면때 기상하게되면 비교적 덜 피곤하지만?(오히려 개운하죠)\n논램수면때 수면을 방해받아 기상하게 될경우 피곤함을 많이 느낍니다\n수면시간은 90분 단위로 나누어 떨어지는 시간이 가장 좋습니다`)
    .setImage("https://lh3.googleusercontent.com/proxy/AgIXw8GO0RbCQHlMmXPtYWIxIqNT4QxIY5pOynXUiwNqzLLx37Twm88vR2uM74j3SwsxDgoI9CHp94lO5uvnkoCzgOU00gRHfN8WM2C7N08kSXI2UjIKh91FGpPHw2cL-5Roiii5Or8fwQcPZSr91g")
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

function sleep_guide(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.sucess)
    .setTitle('숙면가이드 by 브레이너 제이')
    .setDescription(`1️⃣ 3시간\n2️⃣ 4시간30분\n3️⃣ 6시간(ver.1)\n4️⃣ 6시간(ver.2)\n5️⃣ 7시간30분(ver.1)\n6️⃣ 7시간30분(ver.2)\n7️⃣ 9시간\n\n번호를 입력해 선택하세요`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

function nap_guide(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.sucess)
    .setTitle('낮잠가이드 by 브레이너 제이')
    .setDescription(`1️⃣ 15분\n2️⃣ 30분\n3️⃣ 1시간(낮잠으로 권장하진 않습니다)\n\n번호를 입력해 선택하세요\n긴 낮잠은 피하시는게 불면증에도 좋답니다`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}

function custom_first(user){
    const embed = new Discord.MessageEmbed()
    .setColor(color.sucess)
    .setTitle('커스텀 숙면가이드 생성기 (유도부분)')
    .setDescription(`1️⃣ 겨울 눈길산책 여행 (3시간) \n2️⃣ 사자자리/처녀자리/천칭자리 별자리여행 (3시간)\n3️⃣ 물병자리/물고기자리/양자리 별자리 여행 (3시간)\n4️⃣ 바닷가 산책 여행 (3시간)\n5️⃣ 잠재의식 수면유도 (1시간 30분)\n6️⃣ 잔여긴장 해소 수면유도 (1시간 30분)\n7️⃣ 바닷속 여행 (3시간)\n8️⃣ 상처,염증 자연치유 수면유도 (3시간)\n9️⃣ 체온유도 수면유도 (3시간)\n🔟 우울증 무기력증 자연치유 수면유도 (3시간) \n\n번호를 입력해 선택하세요`)
    .setTimestamp()
    .setFooter(`${user.username}#${user.discriminator}`, user.displayAvatarURL())
    return embed
}


module.exports = {
    reg_plz:reg_plz,
    reg_already:reg_already,
    reg_info:reg_info,
    sleep_cycle:sleep_cycle,
    sleep_guide:sleep_guide,
    nap_guide:nap_guide,
    custom_first:custom_first
}