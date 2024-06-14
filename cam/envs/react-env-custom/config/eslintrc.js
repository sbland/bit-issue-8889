/**
 * @see https://bit.dev/reference/eslint/eslint-config
 */
module.exports = {
  extends: [require.resolve('@teambit/react.react-env/config/eslintrc')],
  rules: {
    // Add custom rules here
    "react/button-has-type": "off",
    "jsx-a11y/label-has-associated-control": ["error", {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    "no-console": "off", // disable no-console rule
  },
};