import { useContext, useEffect, useState } from "react";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

import "./post.css";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar1.jpg"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img className="postImg" src={PF + post.img} alt=""></img>
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            {isLiked ? (
              <img
                className="likeIcon"
                src={`${PF}like.png`}
                onClick={likeHandler}
                alt=""
              />
            ) : (
              <img
                className="likeIcon"
                src={`${PF}like-before.png`}
                onClick={likeHandler}
                alt=""
              />
            )}
            {/* <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            /> */}
            <span className="postLikeCounter">{like} people liked</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment ? post.comment : 0} comments
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
