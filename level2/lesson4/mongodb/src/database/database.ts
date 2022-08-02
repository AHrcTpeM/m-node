import mongoose from "mongoose";
import 'dotenv/config';
 
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PATH,
} = process.env;

interface User {
      login: string,
      pass: string,
      session: string,
      makerId: number,
      items: {
        id: number,
        text: string,
        checked: boolean
      }[]
  }

const postSchema = new mongoose.Schema({
      login: String,
      pass: String,
      session: String,
      makerId: Number,
      items: [{
        id: Number,
        text: String,
        checked: Boolean
      }]
    }
  );

console.log(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);

const postModel = mongoose.model<User & mongoose.Document>('User', postSchema);

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

// If the database is empty, add test data from db     
postModel.find().then(users => {
    if (!users.length) {
        postModel.insertMany(db.users).then(function(){
            console.log("Data inserted")
            }).catch(function(error){
                console.log(error)
        });
    }        
})

export default postModel;