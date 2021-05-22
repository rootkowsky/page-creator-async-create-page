function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.createSchemaCustomization = ({ actions, schema }) => {
    const { createTypes } = actions
    const typeDefs = [
        schema.buildObjectType({
            name: "AsyncResolver",
            fields: {
                field: {
                    type: "String!",
                    /**
                     * Remove `sleep` to fix
                     * or
                     * Increase sleep time (i.e. 2000ms), and find out another error
                     */
                    resolve: async (source) => {
                        await sleep(100);
                        return source.field;
                    },
                },
            },
            interfaces: ["Node"],
        }),
    ]
    createTypes(typeDefs)
}

/**
 * create node, for test purposes,
 * nothing to see here
 */
exports.sourceNodes = ({actions: {createNode, addThirdPartySchema}, createNodeId, createContentDigest}) => {
    [{field: 'value'}].map(item => createNode({
        ...item,
        id: createNodeId(item.field),
        internal: {
            type: `AsyncResolver`,
            contentDigest: createContentDigest(item)
        }
    }));
};

