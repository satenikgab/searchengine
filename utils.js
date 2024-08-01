function mySplit(str) {
    if (typeof str != "string") {
        return  [];
    }
    return str.split(" ");
}



module.exports = {mySplit};