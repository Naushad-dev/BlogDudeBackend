const postModel = require("../models/posts.model")


const createPostController = async (req, res) => {

    try {

        const { title, description } = req.body

        if (!title || !description) {
            return res.status(500).send({
                status: false,
                message: "All fields are required",
            })
        }

        const post = await postModel({
            title,
            description,
            createdBy: req.auth._id,
        }).save()


        console.log(req)

        res.status(200).send({
            status: "success",
            message: "Post created successfully"
        })

    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Error while creating post API",
            error,
        })

    }

}

const getAllPostController = async (req, res) => {
    try {

        const posts = await postModel.find()
            .populate("createdBy", "_id name").sort({
                createdAt: -1
            })

        return res.status(200).send({
            status: "success",
            message: "All post get sucessfully created",
            posts,
        })


    } catch (error) {

        res.status(500).send({
            status: false,
            message: "Error while getting all post"
        })

    }

}


const getUserPostController = async (req, res) => {
    console.log("from controller==>", req.auth._id);

    try {

        const userPost = await postModel.find({ createdBy: req.auth._id })
        res.status(200).send({
            success: true,
            message: "user posts",
            userPost,
        });
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Error while getting user post"
        })

    }
}


const deleteUserPostController = async (req, res) => {
    try {

        const { id } = req.params;

        await postModel.findByIdAndDelete({ _id: id })
        res.status(200).send({
            status: true,
            message: "Successfully deleted post",

        })



    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Error while deleting user post"
        })

    }

}



const updatePostController = async (req, res) => {
    try {
      const { title, description } = req.body;
      //post find
      const post = await postModel.findById({ _id: req.params.id });


      const updatedPost = await postModel.findByIdAndUpdate(

        { _id: req.params.id },
        {
          title: title || post?.title,
          description: description || post?.description,
        },
        { new: true }

      );
      res.status(200).send({
        success: true,
        message: "Post Updated Successfully",
        updatedPost,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Errro in update post api",
        error,
      });
    }
  };

module.exports = { createPostController, getAllPostController, getUserPostController, deleteUserPostController ,updatePostController}