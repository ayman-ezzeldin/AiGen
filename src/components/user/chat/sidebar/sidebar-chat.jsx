import { useEffect } from "react";
import { fetchRooms } from "../../../../store/chat/roomsSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, fetchMessages, setSelectedRoom } from "../../../../store/chat/messagesSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleSelectRoom = (roomName) => {
    dispatch(setSelectedRoom(roomName));
    dispatch(clearMessages());
    dispatch(fetchMessages(roomName));
  };

  if (loading) {
    return <p className="text-gray-500 p-4">Loading rooms...</p>;
  }

  if (error) {
    return <p className="text-red-500 p-4 max-w-28">{error}</p>;
  }

  if (!Array.isArray(rooms)) {
    return <p className="text-red-500 p-4">Rooms data is invalid</p>;
  }

  if (rooms.length === 0) {
    return <p className="text-gray-400 p-4">No rooms available</p>;
  }

  return (
    <div className=" p-1 pt-4 border-r-2 border-gray-400 w-[110px]">
      <h2 className="text-md font-bold text-white text-center mb-4">Chat Rooms</h2>

      <div className="space-y-2">
        {rooms.map((room) => (
          <div
          key={room.id}
          onClick={() => handleSelectRoom(room.room_name)}
          className="flex items-center justify-center gap-2 relative overflow-hidden p-4 rounded-xl  border-b-2 text-white border-gray-300 shadow-sm hover:shadow-xl hover:border-blue-600 cursor-pointer"
        >
          {/* <img src='/bg.png' alt="bg"
            className=" w-8 h-8 rounded-full object-cover"
          /> */}
          <div className="text-sm font-semibold  transition">
            {room.room_name}
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
