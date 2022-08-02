import mongoose from "mongoose";
import 'dotenv/config';
 
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PATH,
} = process.env;

interface Post {
    author: string;
    content: string;
    title: string;
}

const postSchema = new mongoose.Schema({
    author: String,
    content: String,
    title: String,
});

const postModel = mongoose.model<Post & mongoose.Document>('Post', postSchema);

console.log(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);
mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`);

function createPost() {
    const postData: Post = {
        author: "2",
        content: "qqqq",
        title: "pppp"
    };
    const createdPost = new postModel(postData);
    createdPost.save()
      .then(savedPost => {
        console.log(savedPost);
      })

    postModel.insertMany([postData, postData]).then(function(){
        console.log("Data inserted")  // Success
    }).catch(function(error){
        console.log(error)      // Failure
    });
}

function getAllPosts() {
    postModel.find({ _id: '62e8e17452fa159bde65561b'})
      .then(posts => {
        console.log(posts);
    })
}

function modifyPost() {
    const postData: Post = {
        author: "string",
        content: "111",
        title: ""
    };
    postModel.findOneAndUpdate({author: 'string'}, postData, { new: true })
      .then(post => {
        console.log(post);
      })
      postModel.findByIdAndDelete('62e8e350a00a7e4db286b692')
      .then(successResponse => {
        console.log("Here0", typeof successResponse, successResponse);
      })
}

createPost();
// getAllPosts()
// modifyPost()