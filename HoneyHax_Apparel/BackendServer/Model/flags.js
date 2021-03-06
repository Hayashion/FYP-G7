// HoneyHAX
// DISM/FT/3A/02
// FYP HoneyHAX Apparel
// flags.js

const mysql = require('mysql');
const db = require('./databaseConfig');
const util = require('util');
const { exception } = require('console');

function makeDb(db) { //sql promise wrapper
    const connection = db.getConnection()
    return {
        query(sql, args) {
            return util.promisify(connection.query)
                .call(connection, sql, args);
                
        },
        close() {
            return util.promisify(connection.end).call(connection);
        }
    };
}



var flagsDB = {

    //POST 
    checkFlag: async function (adminID, flagValue, callback) {

        var adminID = adminID;
        var vulnID = "";
        var vulnString = "";
        var pointValue = 0;
        var points = 0;
        
        var dbConn = makeDb(db)

        // Check if Flag is valid in DB
        console.log(adminID,flagValue)

        try{
            flagValue = flagValue.match(/{.*}/)[0].slice(1,-1)
            if (flagValue.length < 1) {
                throw exception(null)
            }
        }
        catch (err) {
            return callback (null,null)
        }


        try {
            var sql = "SELECT * FROM login.vulntable WHERE flagValue=?";
            flagInfo = await dbConn.query(sql, [flagValue]); //pointValue + vulnID
            console.log(flagInfo)
            if (flagInfo.length == 0){ return callback (null,null) }

            var sql = "SELECT vulnStr,points FROM login.students WHERE adminNo=?";
            studentInfo = await dbConn.query(sql, [adminID]); //vulnStr + points
            console.log(studentInfo)

            pointValue = flagInfo[0].pointValue;
            vulnID = flagInfo[0].vulnId;
            vulnString = studentInfo[0].vulnStr;
            points = studentInfo[0].points;
            
            // Check for completion, returns true if completed, false if points added 
            vulnStrSplit = vulnString.split(',');
            if (vulnStrSplit.includes(vulnID)) {
                return callback(null,JSON.stringify({'message':'Already Completed'}));
            }
            vulnString += "," + vulnID;
            points = points + pointValue;

            var sql = "update login.students set vulnStr=?, points=? where adminNo=?"
            await dbConn.query(sql, [vulnString, points, adminID])
            return callback(null,JSON.stringify({'message':'Well done! Points scored: '+pointValue,points:points}));


        }

        catch (err) {
            return callback(err)
        }

        finally {
            await dbConn.close()
        }



        



    },



}

module.exports = flagsDB;