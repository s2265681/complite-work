module.exports = function ({ types: t }) {
  return {
    visitor: {
      JSXElement(path, state) {
        const openingElement = path.node.openingElement;
        const name = openingElement.name.name;

        if (name === "Trans") {
          // Skip Trans components
          return;
        }

        // Create <Trans> wrapper around JSXElement
        const transElement = t.jsxElement(
          t.jsxOpeningElement(t.jsxIdentifier("Trans"), []),
          t.jsxClosingElement(t.jsxIdentifier("Trans")),
          [path.node]
        );

        // Replace JSXElement with <Trans>
        path.replaceWith(transElement);
      },
    },
  };
};
