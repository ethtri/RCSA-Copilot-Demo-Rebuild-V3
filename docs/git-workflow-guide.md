# Git Workflow Guide for RCSA Demo V7

## Quick Reference: Daily Commit Workflow

```bash
# 1. Check status
git status

# 2. Stage your changes
git add .

# 3. Commit with a descriptive message
git commit -m "Your descriptive commit message"

# 4. Push to GitHub
git push
```

---

## Initial Repository Setup (One-Time Only)

If the repository hasn't been initialized yet:

```bash
# Navigate to project directory
cd C:\Projects\RCSA-DEMO-V7-100325

# Initialize git repository
git init

# Add remote repository
git remote add origin https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3.git

# Create initial commit
git add .
git commit -m "Initial commit"

# Push and set upstream
git push -u origin master
```

---

## Authentication

### Check Authentication Status

```bash
gh auth status
```

**Expected Output:**
```
✓ Logged in to github.com account ethtri (keyring)
- Active account: true
```

### If Not Authenticated

```bash
gh auth login
```

Follow the prompts to authenticate with GitHub.

---

## Common Workflows

### Scenario 1: Made Changes to Existing Files

```bash
# See what changed
git status

# Review specific file changes (optional)
git diff src/pages/home/index.liquid

# Stage all changes
git add .

# Commit with message
git commit -m "Update home page hero section"

# Push to GitHub
git push
```

### Scenario 2: Added New Files and Folders

```bash
# Check what's new/changed
git status

# Stage everything (new + modified)
git add .

# Commit
git commit -m "Add dashboard components and templates"

# Push
git push
```

### Scenario 3: Want to Stage Specific Files Only

```bash
# Stage specific files
git add src/pages/home/index.liquid
git add src/components/dashboard/*.liquid

# Commit
git commit -m "Update home page and dashboard components"

# Push
git push
```

---

## Writing Good Commit Messages

### Format

```
Short summary (50 chars or less)

Optional detailed description:
- What changed
- Why it changed
- Any important notes
```

### Examples

**Good:**
```bash
git commit -m "Add hero section to home page

- Implement responsive hero with CTA buttons
- Add accessibility attributes
- Include design system tokens"
```

**Better for Quick Updates:**
```bash
git commit -m "Fix dashboard KPI card alignment"
```

**Multi-File Updates:**
```bash
git commit -m "Refactor Liquid templates for consistency

- Standardize component structure
- Add inline documentation
- Extract reusable partials"
```

---

## Checking Your Work

### Before Committing

```bash
# See all changes
git status

# See detailed changes in files
git diff

# See staged changes
git diff --staged
```

### After Committing (Before Pushing)

```bash
# View commit history
git log --oneline -5

# View last commit details
git show
```

### After Pushing

Visit: https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/commits/master

---

## Common Issues & Solutions

### Issue: "Permission denied" or 403 Error

**Solution:**
```bash
# Check authentication
gh auth status

# Re-authenticate if needed
gh auth login
```

### Issue: "Your branch is behind 'origin/master'"

**Solution:**
```bash
# Pull latest changes first
git pull

# Then push your changes
git push
```

### Issue: Want to Undo Last Commit (Not Pushed Yet)

**Solution:**
```bash
# Keep changes, undo commit
git reset --soft HEAD~1

# Discard changes, undo commit (CAREFUL!)
git reset --hard HEAD~1
```

### Issue: Committed Wrong Files

**Solution:**
```bash
# Undo last commit, keep changes
git reset --soft HEAD~1

# Unstage specific files
git restore --staged src/wrong-file.txt

# Re-commit correctly
git add .
git commit -m "Correct commit message"
git push
```

---

## Best Practices for AI Agents

### 1. Always Check Status First
```bash
git status
```
This shows you what's changed and prevents surprises.

### 2. Commit Related Changes Together
Don't mix unrelated changes in one commit. For example:
- ✅ Good: All dashboard component updates in one commit
- ❌ Bad: Dashboard updates + header changes + doc updates in one commit

### 3. Commit Frequently
Small, focused commits are better than large ones:
- After completing a feature
- After fixing a bug
- After major refactoring
- Before switching to a different task

### 4. Push Regularly
Push commits to GitHub at least:
- After completing a user request
- At the end of a work session
- Before context window resets

### 5. Write Clear Messages
Your commit message should answer: "What does this commit do?"
- ✅ "Add ROI calculator to home page"
- ❌ "Updates"

---

## Project-Specific Notes

### Files to Ignore
The `.gitignore` is configured to exclude:
- `node_modules/`
- `design-system/dist/*.css` (compiled files)
- `.env` files
- IDE/editor files

### Repository Structure
```
RCSA-DEMO-V7-100325/
├── design-system/       # Design tokens and styles
├── docs/                # Documentation (including this guide)
├── legacy-reference/    # Old portal code for reference
├── portal-snapshots/    # Current portal state
├── src/
│   ├── components/      # Reusable Liquid components
│   ├── pages/          # Page templates
│   ├── templates/      # Layout templates
│   └── data/           # Mock data
└── tools/              # Build and utility scripts
```

### When to Commit

**Always commit after:**
- Creating new pages or components
- Updating documentation
- Fixing bugs or issues
- Completing sprint tasks
- Refactoring code

**Consider committing:**
- After significant design system changes
- When switching between tasks
- Before trying experimental changes

---

## Quick Troubleshooting Checklist

- [ ] Are you in the correct directory? (`cd C:\Projects\RCSA-DEMO-V7-100325`)
- [ ] Are you authenticated? (`gh auth status`)
- [ ] Did you stage your changes? (`git add .`)
- [ ] Did you write a commit message? (`git commit -m "message"`)
- [ ] Did you push? (`git push`)
- [ ] Any errors? Check error message and authentication

---

## Additional Resources

- **Repository:** https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3
- **GitHub CLI Docs:** https://cli.github.com/manual/
- **Git Basics:** https://git-scm.com/book/en/v2/Getting-Started-Git-Basics

---

## For Other AI Agents

If you're an AI agent working on this project:

1. **Read this guide first** before attempting git operations
2. **Always check authentication** before pushing (`gh auth status`)
3. **Use descriptive commit messages** that explain what changed
4. **Commit frequently** to track progress
5. **Push after completing tasks** to save work
6. **Don't use force push** unless absolutely necessary
7. **If uncertain, check git status** to see what you're about to commit

---

*Last Updated: October 30, 2025*
*Project: RCSA Demo V7*
*Repository: ethtri/RCSA-Copilot-Demo-Rebuild-V3*

