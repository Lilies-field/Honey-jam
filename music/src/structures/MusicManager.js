const { Collection } = require("discord.js");
const { Manager } = require("@lavacord/discord.js");
const { Rest } = require("lavacord");
const Queue = require("./Queue");
const embed = require('../../../src/embed/embed')

/**
 * @class MusicManager
 */
class MusicManager {
    /**
     * @param {import("./MusicClient")} client
     */
    constructor(client) {
        this.client = client;
        this.manager = new Manager(client, client.config.nodes,  {
            user: client.user.id,
            shards: client.shard ? client.shard.count : 1
        });
        this.manager.connect();
        
        this.queue = new Collection();
    }

    async handleVideo(message, voiceChannel, song) {
        const serverQueue = this.queue.get(message.guild.id);
        // console.log(message.author)
        // song.requestedBy = message.author
        if (!serverQueue) {
            const queue = new Queue(this.client, {
                textChannel: message.channel,
                voiceChannel
            });
            queue.songs.push(song)
            this.queue.set(message.guild.id, queue);

            try {
                const player = await this.manager.join({
                    channel: voiceChannel.id,
                    guild: message.guild.id,
                    node: "default"
                }, {
                    selfdeaf: true
                });
                queue.setPlayer(player);
                this.play(message.guild, song, message);
            } catch (error) {
                console.error(`I could not join the voice channel: ${error}`);
                this.queue.delete(message.guild.id);
                this.manager.leave(message.guild.id);
                
            }
        } else {
            serverQueue.songs.push(song);
        }
    }

    play(guild, song, message) {
        const serverQueue = this.queue.get(guild.id);
        if (!song) {

            this.manager.leave(guild.id);
            this.queue.delete(guild.id);
        } else {
            serverQueue.player.play(song.track);
            serverQueue.player
                .once("error", console.error)
                .once("end", data => {
                    if (data.reason === "REPLACED") return;
                    const shiffed = serverQueue.songs.shift();
                    if (serverQueue.loop === true) {
                        serverQueue.songs.push(shiffed);
                    }
                    this.play(guild, serverQueue.songs[0], message)
                });
            serverQueue.player.volume(serverQueue.volume)
        }
    }

    async getSongs(query) {
        const node = this.manager.nodes.get("default")
        const result = await Rest.load(node, query)
        return result.tracks;
    }
}

module.exports = MusicManager;