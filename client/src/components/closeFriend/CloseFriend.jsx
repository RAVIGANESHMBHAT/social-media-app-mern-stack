import "./closeFriend.css";

export default function CloseFriend({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <div className="sidebarFriendDiv">
        <img className="sidebarFriendImg" src={PF + user.profilePicture} alt="" />
        <span className="sidebarFriendName">{user.username}</span>
      </div>
    </li>
  );
}
