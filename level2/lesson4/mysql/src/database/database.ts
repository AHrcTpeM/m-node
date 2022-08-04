import * as mysql from "mysql2";
import 'dotenv/config';
 
const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_PATH,
} = process.env;

const connection = mysql.createPool({
  host: MYSQL_PATH,
  user: MYSQL_USER,
  database: "usersdb2",
  password: MYSQL_PASSWORD
}).promise();

const sql = `create table if not exists users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    login VARCHAR(20),
    pass VARCHAR(20),
    session VARCHAR(255)
  )`;

  const sql1 = `CREATE TABLE if not exists items
  (
      id INT PRIMARY KEY AUTO_INCREMENT,
      CustomerId INT,
      text VARCHAR(255),
      checked BOOL,
      FOREIGN KEY (CustomerId)  REFERENCES users (id)
  )`
connection.query(sql).then((result) => {
      let status = JSON.parse(JSON.stringify(result))[0].warningStatus;
      if (!status) {
        console.log("Таблица создана1");
        const users = [['admin', 'admin', ''],
                       ['user1', 'user1', '']];        
        const sql2 = `INSERT INTO users(login, pass, session, markerID) VALUES ?`;

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
    const items: [number, string, boolean][] = [[1, "Buy milk", false],
                  [1, "Buy bread", true],
                  [1, "Do the cleaning", false],
                  [2, "Do homework", false],
                  [2, "Read smart book", false]];

    const sql3 = `INSERT INTO items(CustomerId, text, checked) VALUES ?`;

    connection.query(sql3, [items]).then((results) => {
      console.log('Тестовые данные добавлены');
    });
  }
}))


// const sql4 = `SELECT * FROM items WHERE CustomerId=?`;
// const filter = 2;
// connection.query(sql4, filter).
// then((results) => {
//     console.log(results[0]);
//         // var string=JSON.stringify(results[0]);
//         // console.log('>> string: ', string );
//         // var json =  JSON.parse(string);   // JSON.parse(JSON.stringify(results[0]));
//         // console.log('>> json: ', json);
//         // console.log('>> user.name: ', json[0].text);
// });

export default connection;