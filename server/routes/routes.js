const express=require('express');
const multer=require('multer');
const path=require('path')
const router=express.Router();
const API=require('../controllers/api');
//multer middleware
let storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads');
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})
let upload=multer({
    storage:storage
}).single("image");

//routes
router.get('/',API.fetchAllPosts)
//testing multer image buffer
/* router.post('/testing',API.fetchTestingApi) */
//ends here
router.get('/:path',API.fetchAllFiles)
router.get('/:id',API.fetchPostByID)
router.post('/',upload,API.createPost)
router.patch('/:id',upload,API.updatePost)
router.delete('/:id',API.deletePost)




module.exports=router;