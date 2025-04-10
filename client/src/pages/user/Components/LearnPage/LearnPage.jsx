import Header from '../Header'
import LearnSection from './LearnSection'
import LearnData from './LearnData'
import Sidebar from '../Sidebar'

const LearnPage = () => {
  return (
    <div className=" max-w-7xl mx-auto flex gap-3 ">
      <Sidebar />
      <div className="flex-1">
        <Header
          title="Learn"
          subtitle="Gain The Skills You need To Create Your Model."
          buttonLabel="Learn on Youtube"
          // onButtonClick={}
          searchPlaceholder="Search "
          // onSearch={}
          filterLabel="Filter"
          img="./public/learn.jpg"
          filters={[
            "Task",
            "Usability Rating",
            "Highly Voted For",
            "Creator/Publisher",
            "Language",
            "Licenses",
          ]}
        />
        <div className="container my-4">
          <LearnSection title="" data={LearnData} />
        </div>
        
      </div>
    </div>
  )
}

export default LearnPage