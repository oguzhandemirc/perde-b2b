module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'],
    'scope-enum': [
      2,
      'always',
      ['mobile', 'web', 'backend', 'shared', 'api', 'repo', 'deps', 'docs', 'claude'],
    ],
  },
};
