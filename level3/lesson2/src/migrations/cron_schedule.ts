import cron from 'node-cron';
import mysqldump from 'mysqldump';
import { writeFileSync } from 'fs';
import 'dotenv/config';

const {
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_PATH,
    MYSQL_SCHEMA
  } = process.env;

export function startCron(){
    cron.schedule('59 * * * *', async() => {
        let name = getDate() + '-dump.sql';        	
        writeFileSync("src/migrations/backup/nameDump.txt", name); // запысываем имя последнего бэкап
        console.log('startDump', name);
        await mysqldump({
            connection:{
                host: MYSQL_PATH,
                user: MYSQL_USER||"",
                password: MYSQL_PASSWORD||"",
                database: MYSQL_SCHEMA||"",
            },
            dumpToFile: (`src/migrations/backup/${name}`),
        });
        console.log("endDump")
    });
 }

 function getDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    let hr = today.getHours();
    let mt = today.getMinutes();
    return hr + '-' + mt + '_' + dd + '-' + mm + '-' + yyyy;
}