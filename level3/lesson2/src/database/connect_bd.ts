import * as mysql from "mysql2";
import 'dotenv/config';
 
const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PATH,
  MYSQL_SCHEMA
} = process.env;

const connection = mysql.createPool({
  host: MYSQL_PATH,
  user: MYSQL_USER,
  database: MYSQL_SCHEMA,
  password: MYSQL_PASSWORD
}).promise();

const sql = `create table if not exists books(
  id INT PRIMARY KEY AUTO_INCREMENT,
  login VARCHAR(20),
  pass VARCHAR(20),
  session VARCHAR(255)
)`;

const sql1 = `CREATE TABLE if not exists author(
    id INT PRIMARY KEY AUTO_INCREMENT,
    CustomerId INT,
    text VARCHAR(255),
    checked BOOL,
    FOREIGN KEY (CustomerId)  REFERENCES books (id)
)`;

connection.query(sql).then((result) => {
  let status = JSON.parse(JSON.stringify(result))[0].warningStatus;
  if (!status) {
    console.log("Таблица создана1");
    const users = [['admin', 'admin', ''],
                   ['user1', 'user1', '']];        
    const sql2 = `INSERT INTO books(login, pass, session) VALUES ?`;

    connection.query(sql2, [users]).then((results) => {
        console.log('Тестовые данные добавлены');
    });
  }
  
}
)
.then(() => connection.query(sql1).then((result) => {
let status = JSON.parse(JSON.stringify(result))[0].warningStatus;
if (!status) {
console.log("Таблица создана2");
const items: [number, string, boolean][] = [
              [1, "Buy milk", false],
              [1, "Buy bread", true],
              [1, "Do the cleaning", false],
              [2, "Do homework", false],
              [2, "Read smart book", false]];

const sql3 = `INSERT INTO author(CustomerId, text, checked) VALUES ?`;

connection.query(sql3, [items]).then((results) => {
  console.log('Тестовые данные добавлены');
});
}
}))

connection.query(`CREATE SCHEMA if not exists ${MYSQL_SCHEMA}`).then((result) => {
    console.log(JSON.parse(JSON.stringify(result))[0].warningStatus);
    if(!JSON.parse(JSON.stringify(result))[0].warningStatus) {
        console.log('CREATE SCHEMA');
    } else {
        console.log('SCHEMA EXISTS')
    }
        
  }
)

export default connection;