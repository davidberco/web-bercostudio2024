const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  // const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
    {
      allMarkdownRemark(limit: 1000, sort: {frontmatter: {date: DESC}}) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              templateKey
              title
              date(formatString: "DD:MM:YYYY hh:mm")

            }
          }
        }
      }
    }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges
    // Template For blog-post
    const blogPost = posts.filter(item => item.node.frontmatter.templateKey === 'blog-post')
    blogPost.forEach((post, index) => {
      const previous = index === blogPost.length - 1 ? null : blogPost[index + 1].node
      const next = index === 0 ? null : blogPost[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/blog-post.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    // Template For webdev-sub-page
    const webdevPage = posts.filter(item => item.node.frontmatter.templateKey === 'webdev-sub-page')
    webdevPage.forEach((post, index) => {
      const previous = index === webdevPage.length - 1 ? null : webdevPage[index + 1].node
      const next = index === 0 ? null : webdevPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/webdev-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    // Template For uxui-sub-page
    const uxuiPage = posts.filter(item => item.node.frontmatter.templateKey === 'uxui-sub-page')
    uxuiPage.forEach((post, index) => {
      const previous = index === uxuiPage.length - 1 ? null : uxuiPage[index + 1].node
      const next = index === 0 ? null : uxuiPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/uxui-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    // Template For logotypes-sub-page
    const logotypePage = posts.filter(item => item.node.frontmatter.templateKey === 'logotypes-sub-page')
    logotypePage.forEach((post, index) => {
      const previous = index === logotypePage.length - 1 ? null : logotypePage[index + 1].node
      const next = index === 0 ? null : logotypePage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/logotype-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    // Template For graphic-design-sub-page
    const graphicDesignPage = posts.filter(item => item.node.frontmatter.templateKey === 'graphic-design-sub-page')
    graphicDesignPage.forEach((post, index) => {
      const previous = index === graphicDesignPage.length - 1 ? null : graphicDesignPage[index + 1].node
      const next = index === 0 ? null : graphicDesignPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/graphic-design-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    // Template For multimedia-sub-page
    const multimediaPage = posts.filter(item => item.node.frontmatter.templateKey === 'multimedia-sub-page')
    multimediaPage.forEach((post, index) => {
      const previous = index === multimediaPage.length - 1 ? null : multimediaPage[index + 1].node
      const next = index === 0 ? null : multimediaPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/multimedia-sub-page.js`
        ),
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    //   Template For exhibitions-sub-page <- THIS COMMAND DOES NOT MAKE ANY SENSE att. berco
    const allPage = posts.filter(item =>
      item.node.frontmatter.templateKey !== 'blog-post' &&
      item.node.frontmatter.templateKey !== 'work-sub-page' &&
      item.node.frontmatter.templateKey !== 'exhibitions-sub-page')
    allPage.forEach((post, index) => {
      const previous = index === allPage.length - 1 ? null : allPage[index + 1].node
      const next = index === 0 ? null : allPage[index - 1].node

      createPage({
        path: post.node.fields.slug.split('/').slice(2, -1).join('/') === '' ? '/' : `/${post.node.fields.slug.split('/').slice(2, -1).join('/')}`,
        component: path.resolve(
          `src/templates/${String(post.node.frontmatter.templateKey)}.js`
        ),
        context: {
          slug: post.node.fields.slug,
          // previous,
          // next,
        },
      })
    })
    return null
  })
}
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
