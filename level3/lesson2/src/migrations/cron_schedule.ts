import cron from 'node-cron';
import mysqldump from 'mysqldump';
import { writeFileSync, stat, readdirSync, unlink } from 'fs';
import 'dotenv/config';

import { deleteBookByCron } from '../controllers/admin';

const {
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_PATH,
    MYSQL_SCHEMA
  } = process.env;

export function startCron(){ 
    cron.schedule('30 22 * * *', async() => {
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

    cron.schedule('45 22 * * *', async() => {
        deleteBookByCron();
        console.log('Cron performed the planned deletion');
    });

    cron.schedule('30 23 * * *', () => {
        const files = readdirSync("src/migrations/backup");
        //console.log(files);
        files.forEach(file => {
            if (file.length > 20) {
                stat(`src/migrations/backup/${file}`, (error, stats) => {
                    if (error) {
                        console.log(error);
                    }
                    //console.log(stats);
                    //console.log(file, Date.now() - stats.birthtimeMs);
                    if (Date.now() - stats.birthtimeMs > 24 * 60 * 60 * 1000) {
                        unlink(`src/migrations/backup/${file}`, (err) => {
                            if (err) {
                                console.error(err)
                            }
                        })
                        console.log('-------Старый dump удален-------');
                    }
                })
            }
        })        
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