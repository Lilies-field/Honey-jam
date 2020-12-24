const mariadb = require('mariadb')
const config = require('./config.js')

const pool = mariadb.createPool({ 
    host: config.host, 
    port: config.port, 
    user: config.user, 
    password: config.password, 
    database: config.database, 
    connectionLimit: 5 
})

async function getUser(userid){
    let conn, rows
    try{
        conn = await pool.getConnection()
        conn.query(`USE ${config.database}`)
        rows = await conn.query(`SELECT * FROM users WHERE userID=${userid}`)
    }
    catch(err){
        throw err
    }
    finally{
        if (conn) conn.end()
        return rows[0]
    }
}

async function register(userid){
    let conn
    try{
        conn = await pool.getConnection()
        conn.query(`INSERT INTO users (userID) VALUES("${userid}")`)
    }
    catch(err){
        throw err
    }
    finally{
        if (conn) conn.end()
    }
}

module.exports = {
    getUser: getUser,
    register:register
}