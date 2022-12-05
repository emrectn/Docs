# Git

## How to permanently remove few commits from remote branch
````bash

# Just note to use the last_working_commit_id, when reverting a non-working commit
git reset --hard <last_working_commit_id>

# So we must not reset to the commit_id that we don't want.
# Then sure, we must push to remote branch:
git push --force

````