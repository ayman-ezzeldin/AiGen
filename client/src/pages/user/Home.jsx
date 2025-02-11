import { useDispatch } from "react-redux";
// import { logoutUser } from "../../store/auth-slice"
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Section from "./Components/DatasetPage/DataSection";
import SectionData from "./Components/DatasetPage/SectionData";
import LearnSection from "./Components/LearnPage/LearnSection";
import LearnData from "./Components/LearnPage/LearnData";
import ArchitectureData from "./Components/ArchitecturePage/ArchitectureData";
import ArchitectureSection from "./Components/ArchitecturePage/ArchitectureSection";
import ModelSection from "./Components/ModelPage/ModelSection";
import ModelData from "./Components/ModelPage/ModelData";
import "./App.css";

const UserHome = () => {
  const dispatch = useDispatch();
  {
    /* <button onClick={()=> dispatch(logoutUser()) } >Log out</button> */
  }

  return (
    <div>
      {/* the Models Page */}
{/*       
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
      <Footer
        title="Didn't find what you were looking for?"
        paragraph="Explore Models From Organizations Like Google Search , Deepmind , and More."
        linkLabel="View All Community Models"
        linkHref="https://example.com/datasets"
        buttonLabel="Make A Model Request "
        buttonLink="https://example.com/public-datasets"
      /> */}



      {/* the DataSets Page  */}

      {/* <Header
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
        <Section title="Your Models" logo="./public/user.png" data={SectionData} />
        <Section title="Trending Models" logo="./public/trend.png" data={SectionData} />
        <Section title="NLP" logo="./public/nlp.png" data={SectionData} />
        <Section title="Economics" logo="./public/tag.png" data={SectionData} />
      </div>
      <Footer
        title="Didn't find what you were looking for?"
        buttonLabel="Explore All Public DataSets"
        buttonLink="https://example.com/public-datasets"
      /> */}


      {/* The Learn Page  */}

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
      <Footer
        title="Didn't find what you were looking for?"
        buttonLabel="Search On Youtube"
        buttonLink="https://example.com/public-datasets"
      />

      {/* The Architecture Page  */}
      {/* <Header
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
      <Footer
        title="Didn't find what you were looking for?"
        buttonLabel="Explore All Public Architecture"
        buttonLink="https://example.com/public-datasets"
      /> */}
    </div>
  );
};

export default UserHome;
