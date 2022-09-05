const Post=require('../models/posts');
const PostImage=require('../models/imagesTest')
const fs=require('fs')
module.exports= class API{
    //fetch all posts
    static async fetchAllPosts(req,res){
        try {
            /* res.download('../../uploads/'+req.params.path) */
            const posts=await Post.find();
            res.status(200).json(posts)
        } catch (err) {
            res.status(400).json({message:err.message})
        }
    }

    
    //Testing api fetch api 
 /*     static async fetchTestingApi(req,res){
        const post=req.body;
        const imagename=req.file.filename;
        post.image=imagename;
        try {
            await Post.create(post);
            res.status(201).json({message:'Post created successfully'})
        } catch (err) {
            res.status(400).json({message:err.message})
        }
    } */
    //ends here 

     //fetch all files
     static async fetchAllFiles(req,res){
        try {
             res.json('./uploads/'+req.params.path) 
            /* const posts=await Post.find();
            res.status(200).json(posts) */
        } catch (err) {
            res.status(400).json({message:err.message})
        }
    }
     //fetch post by id
     static async fetchPostByID(req,res){
        const id=req.params.id;
        try {
           const post=await Post.findById(id);
            res.status(200).json(post)
        } catch (err) {
            res.status(404).json({message:err.message})
        }
    }
     //create post 
     static async createPost(req,res){
        const post=req.body;
        const imagename=req.file.filename;
        post.image=imagename;
        try {
            await Post.create(post);
            res.status(201).json({message:'Post created successfully'})
        } catch (err) {
            res.status(400).json({message:err.message})
        }
    }
     //update post
     static async updatePost(req,res){
        const id=req.params.id;
        let new_image='';
        if(req.file){
            new_image=req.file.filename;
            try {
                fs.unlinkSync('./uploads/'+req.body.old_image)
            } catch (err) {
                console.log(err);
            }
        }else{
            new_image=req.body.old_image;
        }
        let newPost=req.body;
        newPost.image=new_image;
        try {
            await Post.findByIdAndUpdate(id,newPost);
            res.status(200).json({message:"Post Updated successfully"});
        } catch (err) {
            res.status(404).json({message:err.message})
        }
    }
       //delete post
       static async deletePost(req,res){
        const id=req.params.id;
      try {
        const results=await Post.findByIdAndDelete(id);
        if(results.image != ''){
            try {
                fs.unlinkSync('./uploads/'+results.image)
            } catch (err) {
                console.log(err);
            }
        }
        res.status(200).json({message:"Post deleted successfully"});
      } catch (err) {
        res.status(404).json({message:err.message});
      }
    }
}