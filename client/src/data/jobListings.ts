export interface IJobListing {
  id: string;
  title: string;
  description: string;
  budget: number;
  userId: string;
  dateAdded: number;
  tags: string[];
}

export const jobListings: IJobListing[] = [
  {
    id: "1",
    title: "Frontend Developer",
    description:
      "Looking for a Frontend Developer who is motivated to combine the art of design with the art of programming. Responsibilities will include translation of the UI/UX design wireframes to actual code that will produce visual elements of the application.",
    budget: 1000,
    userId: "1",
    dateAdded: 1687285117944,
    tags: ["React", "JavaScript", "HTML", "CSS"],
  },

  {
    id: "2",
    title: "Backend Developer",
    description:
      "Looking for a Backend Developer who is responsible for managing the interchange of data between the server and the users. Primary focus will be development of all server-side logic, definition and maintenance of the central database, and ensuring high performance and responsiveness to requests from the front-end.",
    budget: 1000,
    userId: "2",
    dateAdded: 1687285117344,
    tags: ["Node.js", "Express", "MongoDB"],
  },

  {
    id: "3",
    title: "Graphic Designer",
    description:
      "Looking for a Graphic Designer who is responsible for creating design solutions that have a high visual impact. The role involves listening to clients and understanding their needs before making design decisions.",
    budget: 10,
    userId: "2",
    dateAdded: 1683285117944,
    tags: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma"],
  },

  {
    id: "4",
    title: "Data Scientist",
    description:
      "Looking for a Data Scientist who is responsible for developing custom data models and algorithms to apply to data sets. The Data Scientist will use predictive modeling to increase and optimize customer experiences, revenue generation, ad targeting and other business outcomes.",
    budget: 1000,
    userId: "1",
    dateAdded: 1687245117944,
    tags: ["Python", "R", "SQL", "Machine Learning"],
  },

  {
    id: "5",
    title: "Logo Designer",
    description: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    budget: 1000,
    userId: "1",
    dateAdded: 1687285117944,
    tags: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma"],
  },
];
