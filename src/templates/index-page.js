import React from "react";
// import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostCard from "../components/postCard"
import BackgroundVideo from "../components/BackgroundVideo";

// eslint-disable-next-line
const IndexPage = ({ data }) => {
  const siteTitle = data.site.siteMetadata.title
  const social = data.site.siteMetadata.social
  const posts = data.allMarkdownRemark.edges
  let postCounter = 0
  const { video, videoPoster, videoTitle } = data.markdownRemark.frontmatter
  
  return (
    <Layout title={siteTitle} social={social}>
        <Seo keywords={[`Bercostudio`, `Design`, `motion-design`, `graphic design`, `digital art`, `web development`]}
            title={data.markdownRemark.frontmatter.title}
            description={data.markdownRemark.frontmatter.description ||  ''}
            image={data.markdownRemark.frontmatter.thumbnail.childImageSharp.fluid.src}
        />
        
        <section className="BackgroundVideo-container">
          <BackgroundVideo poster={videoPoster} videoTitle={videoTitle}>
          {video && <source src={video} type="video/mp4" />}
          </BackgroundVideo>
          <h2 className="BackgroundVideo-overlay-content">{data.site.siteMetadata.description}</h2>
        </section>

        {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
          <h4 className="page-head-description"></h4>
          <div className="">
            <ul className="actions">
              <li>
                <a
                  href="https://vimeo.com/381249190"
                  className="button primary"
                  target={"_blank"}
                  rel={"noreferrer"}
                >
                  Play ShowReel
                </a>
              </li>
            </ul>
          </div>
          </header>
        )}
        
        <h4 className="page-head-description">Our services</h4>
        
        <div className="post-feed">
            {posts.map(({ node }) => {
                postCounter++
                return (
                    <PostCard
                        key={node.fields.slug}
                        count={postCounter}
                        node={node}
                        postClass={`post`}
                    />
                )
            })}
        </div>
    </Layout>
  )
}

export default IndexPage
export const IndexPageQuery = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
        description
        social{
          twitter
          facebook
        }    
      }
    }
    markdownRemark(frontmatter: {templateKey: {eq: "index-page"}}) {
      frontmatter {
        title
        description
        heading
        video
        videoPoster
        videoTitle
        thumbnail {
          childImageSharp {
            fluid(maxWidth: 1360) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }    
    }
    allMarkdownRemark(
      filter: {frontmatter: {pagetype: {eq: "main"}}}
      limit: 30
      sort: {frontmatter: {number: ASC}}
      ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD,YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 1360) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;