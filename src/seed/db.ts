export const DB = {
  roles: [
    { id: "1", name: "admin" },
    { id: "2", name: "user" },
  ],
  users: [
    {
      id: "1",
      username: "aloulou",
      email: "aloulou@insat.ucar.tn",
      roles: ["1"],
    },
    {
      id: "2",
      username: "sami",
      email: "sami@insat.ucar.tn",
      roles: ["2"],
    },
    {
      id: "3",
      username: "bedis",
      email: "bedis@insat.ucar.tn",
      roles: ["1", "2"],
    },
  ],
  skills: [
    { id: "1", designation: "Devops" },
    { id: "2", designation: "Machine Learning" },
    { id: "3", designation: "Data Science" },
  ],
  cvs: [
    {
      id: "1",
      name: "Medius Application",
      age: 22,
      job: "Devops Engineer",
      owner: "1",
      skills: ["1"],
    },
    {
      id: "2",
      name: "Sami CV for Summer Internship",
      age: 21,
      job: "Junior MLops Engineer",
      owner: "2",
      skills: ["1", "2"],
    },
    {
      id: "3",
      name: "CV Final - Exchange Program",
      age: 23,
      job: "Junior Data Scientist",
      owner: "1",
      skills: ["2", "3"],
    },
  ],
};
