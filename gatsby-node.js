/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const slash = require(`slash`);

exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type ContentfulWork implements Node {
      contentful_id: String
      title: String
      slug: String
      type: String
      url: String
      image: ContentfulImage
      thumbnail: ContentfulImage
    }

    type ContentfulImage implements Node {
      title: String
      url: String
    }
  `
  createTypes(typeDefs)
};


exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(
    `
      query {
        contentfulWorkList(contentful_id: {eq: "1p5V0NNEhIoZedN0PVNirR"}) {
          works {
            contentful_id
            title
            slug
            type
            url
            image {
              title
              url
            }
            thumbnail {
              title
              url
            }
          }
        }
      }
    `
  ).then(result => {
      if (result.errors) {
        console.log("Error retrieving contentful data",      result.errors);
      }
      // Resolve the paths to our template
      const blogPostTemplate = path.resolve("./src/templates/work.js");
      // Then for each result we create a page.
      result.data.contentfulWorkList.works.forEach(work => {
        createPage({
          path: `/work/${work.slug}/`,
          component: slash(blogPostTemplate),
          context: {
            id: work.contentful_id,
            title: work.title,
	          slug: work.slug,
            image: work.image,
            thumbnail: work.thumbnail,
            type: work.type,
            url: work.url,
          }
        });
      });
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};
