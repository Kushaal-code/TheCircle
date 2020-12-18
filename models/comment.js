let mongoose= require('mongoose');

//Comments Schem

const commentSchema={
    commenter_id:{
        type: String,
        required: true
    },
    comment_body:{
        type: String,
        required: true
    },
    comment_time:{
        type: Date,
        required: true
    },
    article_id:{
        type: String,
        required: true
    }
}

let Comment= module.exports=mongoose.model('Comment',commentSchema);