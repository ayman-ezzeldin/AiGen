
const Sidebar = () => {
  return (
    <div className="w-1/4shadow-lg border-r border-gray-400 overflow-y-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Chats</h2>
        <div className="space-y-3">
          <div className="p-3 bg-muted hover:bg-muted/80 rounded-xl cursor-pointer transition-all">User 1</div>
          <div className="p-3 bg-muted hover:bg-muted/80 rounded-xl cursor-pointer transition-all">User 2</div>
        </div>
      </div>
  )
}

export default Sidebar