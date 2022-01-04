import dotenv from "dotenv";
dotenv.config();

export default {
  siteMetadata: {
    title: `Slick's Slices`,
    siteUrl: "https://gatsbys-slick.pizza",
    description: "Best Pizza in New Delhi",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-styled-components",
    {
      //this is name of plugin you are adding
      resolve: "gatsby-source-sanity",
      options: {
        projectId: "s8k1p2i8",
        dataset: "production",
        apiVersion: "2021-12-30", //new feature add today's date
        watchMode: true,
        token: process.env.SANITY_TOKEN,
      },
    },
  ],
};
