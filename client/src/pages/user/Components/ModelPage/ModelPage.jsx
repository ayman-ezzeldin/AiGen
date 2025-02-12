import Header from "../Header"
import ModelSection from "./ModelSection"
import ModelData from "./ModelData"

const ModelPage = () => {
  return (
    <div>
      <Header
        title="Models"
        subtitle="Discover and use thousands of machine learning models, including the most popular diffusion models and LLMs."
        buttonLabel="+ New Model"
        searchPlaceholder="Search Models"
        filterLabel="Filter"
        img="./public/Moodels.jpg"
        filters={[
          "Task",
          "Data Type",
          "Model Type",
          "Creator/Publisher",
          "Usability Rating",
          "Size",
          "Language",
          "Licenses",
        ]}
      />

      <div className="container my-4">
        <ModelSection
          title="Your Models"
          logo="./public/user.png"
          data={ModelData}
        />
        <ModelSection
          title="Trending Models"
          logo="./public/trend.png"
          data={ModelData}
        />
        <ModelSection
          title="Community Models"
          logo="./public/group.png"
          data={ModelData}
        />
      </div>
    </div>
  )
}

export default ModelPage