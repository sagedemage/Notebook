/* eslint-env node */
module.exports = {
  "root": true,
  "extends": [
    "plugin:vue/vue3-essential",
    "eslint:recommended"  
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "eqeqeq": "error",
    "curly": "error",
    "quotes": [
        "error", 
        "double"
    ],
    "no-unused-vars": [
        "error",
        {
            "vars": "all",
            "args": "after-used",     
            "ignoreRestSiblings": false 
         }
      ]
}
}
