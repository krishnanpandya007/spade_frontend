import Comment from './Comment'


function CommentBody({comments, username}) {

    return (
        <div>
            {
                comments.map((val, index) => (
                    <Comment val={val} key={index} is_liked={val.likes.includes(username)} username={username} />
                ))
            }
        </div>
    )
}

export default CommentBody
