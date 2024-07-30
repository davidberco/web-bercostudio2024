const visit = require('unist-util-visit');
const { createRemoteFileNode } = require('gatsby-source-filesystem');

module.exports = async ({ markdownAST, cache, createNode, createNodeId, getCache, reporter }) => {
  const promises = [];

  visit(markdownAST, 'image', (node) => {
    if (node.url.startsWith('http')) {
      promises.push(
        createRemoteFileNode({
          url: node.url,
          cache,
          createNode,
          createNodeId,
          getCache,
          reporter,
        }).then((fileNode) => {
          if (fileNode) {
            node.url = fileNode.publicURL;
          }
        })
      );
    }
  });

  await Promise.all(promises);
};