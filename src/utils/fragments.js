import { graphql } from "gatsby";

export const workListFields = graphql`
  fragment workListFields on ContentfulWorkList {
    works {
      contentful_id
      title
      type
      slug
      image {
        title
        description
        fluid(maxWidth: 150, quality: 75, toFormat: JPG) {
          ...GatsbyContentfulFluid
        }
      }
      thumbnail {
        title
        description
        fluid(maxWidth: 150, quality: 75, toFormat: JPG) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;
