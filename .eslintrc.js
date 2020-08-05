module.exports = {
  env: {
    browser: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "plugin:cypress/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["jest", "prettier", "react"],
  settings: {
    "import/resolver": {
      webpack: {
        config: "webpack.config.js"
      }
    }
  },
  rules: {
    camelcase: "warn",
    "import/no-extraneous-dependencies": "warn",
    "import/newline-after-import": "warn",
    "prettier/prettier": "error",
    "import/order": "warn",
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
    "spaced-comment": "off",
    "no-useless-escape": "warn",
    "no-extra-boolean-cast": "warn",
    "no-unused-expressions": "warn",
    "no-unused-vars": ["error", { argsIgnorePattern: "^_$" }],
    "no-case-declarations": "warn",
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-curly-brace-presence": "warn",
    "react/jsx-curly-newline": "off",
    "react/jsx-wrap-multilines": "off",
    "react/no-array-index-key": "warn",
    "react/jsx-no-target-blank": "warn",
    "jsx-a11y/no-static-element-interactions": "warn",
    "jsx-a11y/click-events-have-key-events": "warn",
    "jsx-a11y/alt-text": "warn",
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/control-has-associated-label": "warn",
    "cypress/no-unnecessary-waiting": "warn"
  },
  overrides: [
    {
      files: "cypress/**/*.js",
      rules: {
        "jest/valid-expect": "off",
        "jest/valid-expect-in-promise": "off"
      }
    }
  ]
};
