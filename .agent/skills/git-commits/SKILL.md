---
name: Git Commits Standard
description: Enforces a specific version-based format for all git commits.
---

# Git Commit Formatting Rules

When writing git commit messages, you MUST always follow the user's standard numbering format.

## Format:
`[VERSION] - [Description of Changes]`

Example:
`0.6.6 - Website Deployment to Vercel`
`0.6.7 - Updated Hero Image`

**Instructions for the Assistant:**
1. Whenever you are asked to make a commit, or if you suggest a commit message, ALWAYS use this exact structure.
2. Check the git log (`git log -n 5`) to determine the *last* version number used.
3. Increment the version number sequentially for your new commit (e.g., if the last was `0.6.6`, the new one should be `0.6.7`).
4. Keep the description clear, concise, and capitalized like a title.

Do not use conventional commits (like `chore: ...` or `feat: ...`) unless specifically asked by the user to deviate from this version numbered standard.
