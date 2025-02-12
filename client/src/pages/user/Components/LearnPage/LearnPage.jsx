import Header from '../Header'
import LearnSection from './LearnSection'
import LearnData from './LearnData'

const LearnPage = () => {
  return (
    <div>
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
  )
}

export default LearnPage