

const Comment = (props) => {
    const { id, post_id, user_id, user, content } = props.comment;
    return (
        <div className="flex items-center">
            <img className="w-9 h-9 m-3 rounded-full" src={user.image} alt="" />
            <span className="mr-2 font-semibold text-sm">{user.name}</span>
            <p className="text-xs">{content}</p>
        </div>
    )
}

export default Comment