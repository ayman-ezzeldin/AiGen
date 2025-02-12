import SectionData from "./SectionData";
import Header from "../Header";
import Section from "../ModelPage/ModelSection";

export const DatasetPage = () => {
  return (
    <div>
      <Header
        title="Datasets"
        subtitle="Explore, analyze, and share quality data."
        buttonLabel="+ New Dataset"
        // onButtonClick={}
        searchPlaceholder="Search datasets"
        // onSearch={}
        filterLabel="Filter"
        img="./public/Datasets.jpg"
        filters={[
          "Dataset Size",
          "Dataset Format",
          "License",
          "Creator/Publisher",
          "Usability Rating",
          "Highly Voted For",
        ]}
      />
      <div className="container my-4">
        <Section
          title="Your Models"
          logo="./public/user.png"
          data={SectionData}
        />
        <Section
          title="Trending Models"
          logo="./public/trend.png"
          data={SectionData}
        />
        <Section title="NLP" logo="./public/nlp.png" data={SectionData} />
        <Section title="Economics" logo="./public/tag.png" data={SectionData} />
      </div>
    </div>
  );
};
