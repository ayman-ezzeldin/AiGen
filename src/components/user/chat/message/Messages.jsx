
const Messages = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-muted/50">
          <div className="flex justify-end">
            <div className="px-4 py-2 rounded-2xl max-w-[70%] shadow bg-indigo-700 ">Hi there!</div>
          </div>
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl max-w-[70%] shadow bg-[#102E50] ">Hello!</div>
          </div>
          <div className="flex justify-end">
            <div className=" px-4 py-2 rounded-2xl max-w-[70%] shadow bg-indigo-700">Are you Here</div>
          </div>
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl max-w-[70%] shadow bg-[#102E50]">Yes</div>
          </div>
        </div>
  )
}

export default Messages