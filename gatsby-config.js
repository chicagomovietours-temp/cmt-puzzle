module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `Chicago Movie Tours`,
    description: ``,
    author: `Chicago Movie Tours`,
    siteURL: `https://www.chicagomovietours.com/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        implementation: require("sass"),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `babel-preset-gatsby`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chicago Movie Tours`,
        short_name: `CMT`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `standalone`,
        icon: `src/data/icon.png`,
        icon_options: {
          purpose: `maskable`,
        },
      },
    },
    {
      resolve: "gatsby-plugin-netlify-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    `gatsby-plugin-netlify`,
  ],
}
