/* eslint-disable eslint-plugin/prefer-message-ids */

'use strict';
const path = require('path');

module.exports = {
    meta: {
        type: 'problem', // `problem`, `suggestion`, or `layout`
        docs: {
            description: 'Plugin for checking relative paths',
            recommended: false,
            url: null // URL to the documentation page for this rule
        },
        fixable: null, // Or `code` or `whitespace`
        schema: [] // Add a schema if the rule has options
    },

    create(context) {
        return {
            ImportDeclaration(node) {
                const importTo = node.source.value;
                const fromFilename = context.getFilename();

                if (shouldBeRelative(fromFilename, importTo)) {
                    context.report({
                        node,
                        message: 'В рамках одного слайса все импорты дожны быть относительными'
                    });
                }
            }
        };
    }
};

function isPathRelative(path) {
    return path === '.' || path.startsWith('./') || path.startsWith('../');
}

const layers = {
    entities: 'entites',
    features: 'features',
    shared: 'shared',
    widgets: 'widgets',
    pages: 'pages'
};

function shouldBeRelative(from, to) {
    if (isPathRelative(to)) {
        return false;
    }

    const toArray = to.split('/');
    const toLayer = toArray[0];
    const toSlice = toArray[1];

    if (!toLayer || !toSlice || !layers[toLayer]) {
        return false;
    }

    const fromNormalizedPath = path.toNamespacedPath(from);
    const isWindowsOS = fromNormalizedPath.includes('\\');
    const fromPath = fromNormalizedPath.split('src')[1];
    const fromArray = fromPath.split(isWindowsOS ? '\\' : '/');
    const fromLayer = fromArray[1];
    const fromSlice = fromArray[2];

    if (!fromLayer || !fromSlice || !layers[fromLayer]) {
        return false;
    }

    return fromLayer === toLayer && fromSlice === toSlice;
}
