import FriendListItem from "./FriendListItem";

const friendsList = ["Amy", "Lisa", "John", "Bob", "Sally"];
export default function FriendList() {
  return (
    <div className="flex flex-col items-center justify-center">
      {friendsList.map((friend) => (
        <FriendListItem friend={friend} key={friend} />
      ))}
    </div>
  );
}
