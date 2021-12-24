



function getCurrentTimeInfo(){
    const hours = new Date().getHours()
    const minutes = new Date().getMinutes()
    return {
        hours,
        minutes
    }
}


module.exports = {
    getCurrentTimeInfo
}