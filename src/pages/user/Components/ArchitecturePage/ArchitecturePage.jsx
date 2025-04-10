import Header from "../Header"
import ArchitectureData from "./ArchitectureData"
import ArchitectureSection from "./ArchitectureSection"

const ArchitecturePage = () => {
  return (
    <div>
      <Header
        title="Architecture"
        subtitle="Browse , Manage , and Share AI Architectures."
        buttonLabel="+ Create New Architecture"
        buttonLabel1="+ Import Architecture"
        // onButtonClick={}
        searchPlaceholder="Search Acrhitecture"
        // onSearch={}
        filterLabel="Filter"
        img="./public/learn.jpg"
        filters={[
          "Task",
          "DataSet Type",
          "DataSet Format",
          "Model Type",
          "Architecture Size",
          "Usability Rating",
          "Highly Voted For",
          "Creator/Publisher",
          "Language",
          "Licenses",
        ]}
      />
      <div>
        <ArchitectureSection
          title="Your Architectures"
          logo="./public/user.png"
          data={ArchitectureData}
        />
        <ArchitectureSection
          title="Popular Architectures"
          logo="./public/star.png"
          data={ArchitectureData}
        />
        <ArchitectureSection
          title="Trending Architectures"
          logo="./public/trend.png"
          data={ArchitectureData}
        />
      </div>
      
    </div>
  )
}

export default ArchitecturePage