const users = [
  {
    id: 1,
    image: "https://i.pravatar.cc/150?img=1",
    bg: "#F8A5D8",
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/150?img=5",
    bg: "#A9B6FF",
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/150?img=12",
    bg: "#A7F3C7",
  },
  {
    id: 4,
    image: "https://i.pravatar.cc/150?img=8",
    bg: "#F8A5D8",
  },
];

export default function AvatarGroup({ members }) {
  return (
    <div className="flex items-center">
      {members.map((user, index) => (
        <div
          key={user._id}
          className={`relative flex h-10 w-10 items-end justify-center overflow-hidden rounded-full border-4 border-white ${
            index !== 0 ? "-ml-4" : ""
          }`}
          style={{ backgroundColor: user.bg, zIndex: members.length - index }}
        >
          {user.profilePicUrl ? (
            <img
              src={user.profilePicUrl}
              alt=""
              className="h-[90%] w-[90%] object-cover"
            />
          ) : (
            <div className="h-full w-full rounded-full flex justify-center items-center bg-blue-700">
              {user.firstName?.slice(0, 1) || user.email?.slice(0, 1)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
