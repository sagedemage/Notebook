module.exports = {
    ci: {
      collect: {
        url: [
          'http://localhost:4173',
        ],
        startServerCommand: 'npm run build && npm run preview',
      },
      assert: {
        assertions: {
          /* Errors */
          "categories:performance": ["error", {"minScore": 0.8}],
          "categories:accessibility": ["error", {"minScore": 0.9}],
          "categories:best-practices": ["error", {"minScore": 0.9}],
          "categories:seo": ["error", {"minScore": 0.9}],

          /* Warnings */
          "categories:performance": ["warn", {"minScore": 0.9}],
        },
      },
      upload: {
        target: 'temporary-public-storage',
      },
    },
  };