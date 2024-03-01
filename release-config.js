const config = {
    plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      [
        "@semantic-release/github",
        {
          "assets": ["dist/**"],
          "message": "chore(release): ${nextRelease.Version} [skip ci]\n\n${nextRelease.notes}"
        }
      ],
      "@semantic-release/git"
    ]
}

module.exports = config;