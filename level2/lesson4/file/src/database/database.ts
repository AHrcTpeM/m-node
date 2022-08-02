import fs from 'fs';

let db: {          
          users: {
            login: string,
            pass: string,
            session: string,
            makerId: number,
            items: {
              id: number,
              text: string,
              checked: boolean
            }[] 
          }[]
        } = {
                users: [
                    { login: 'admin', pass: 'admin', session: '', makerId : 100,
                      items: [
                        { id: 22, text: "Buy milk", checked: false },
                        { id: 23, text: "Buy bread", checked: false },
                        { id: 24, text: "Do the cleaning", checked: true }
                  ]},
                      { login: 'user1', pass: 'user1', session: '', makerId : 100,
                    items: [
                      { id: 25, text: "Do homework", checked: false },
                      { id: 26, text: "Read smart book", checked: true }
                    ]}
                  ]
            }

try {
  db = JSON.parse(fs.readFileSync("public/text.txt", "utf8"));
} 
catch(err) {
  fs.writeFileSync("public/text.txt", `${JSON.stringify(db)}`);
}

export default db;
