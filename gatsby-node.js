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
      image: ContentfulAsset
      thumbnail: ContentfulAsset
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
            info
            description {
              json
            }
            image {
              title
              fluid(maxWidth: 1000, quality: 85) {           
                base64
                aspectRatio
                src
                srcSet
                sizes     
              } 
            }
            thumbnail {
              title
              file {
                url
              }
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
      const workTemplate = path.resolve("./src/templates/work.js");
      // Then for each result we create a page.
      result.data.contentfulWorkList.works.forEach(work => {
        createPage({
          path: `/work/${work.slug}/`,
          component: slash(workTemplate),
          context: {
            id: work.contentful_id,
            title: work.title,
	          slug: work.slug,
            image: work.image,
            thumbnail: work.thumbnail,
            type: work.type,
            url: work.url,
            info: work.info,
            description: work.description,
          }
        });
      });
    })
    .catch(error => {
      console.log("Error retrieving contentful data", error);
    });
};
