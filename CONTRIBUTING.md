## Initial Development Environment Setup
To set up a development environment in your local laptop/desktop, follow the instructions in this Wiki page: https://github.com/Philance/Philance/wiki/Isolated-development-environment-setup-and-code-changes

## Contributing Code for Philance
0. The following discussion assumes that you have completed the initial setup as described in https://github.com/Philance/Philance/wiki/Isolated-development-environment-setup-and-code-changes and have cloned the Philance master repository to your local dev environment. **Before starting any new development, ensure that you have the latest version of the master branch in your local environment**. To do this, pull the remote master branch (on GitHub) to your local repo as follows. _**Caveat**_: Like for many other actions, it's highly recommended to start a "git pull" only with a clean working copy. This means that you should not have any uncommitted local changes before you pull. If needed, use Git's Reset or Stash feature to discard or save your local changes, respectively.
* Open the Philance repo in Sourcetree and click on pull icon to merge latest commits in the GitHub Philance repo master branch into your local master branch in your local dev working directory
* It is good practice to create the Linux environment from scratch at the start of development, since the Vagrantfile (which has instructions about creating the local env) may have changed since your last round of development. To do so, issue commands **sudo vagrant destroy** and **sudo vagrant up** from _/opt/vagrant/Philance_ (for Mac) folder in a terminal session. For PCs, you would issue command **vagrant destroy** and **vagrant up** from _C:\Hashicorp\Philance_ folder in a terminal session that you started with admin privileges (_"cmd" Run as administrator_).

1. **Create a new (Feature) Branch**. We will follow the Git Feature Branch Workflow (https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) in our development. This means that we will create a new 'feature' branch from the master, every time we want to work on a new feature. _Code changes cannot be pushed directly into the "master" branch_. So before beginning code changes, click on "Branch" in Sourcetree and create a new branch, naming it based on the feature that you are working on in this branch. If the feature corresponds to an 'Issue', then name the branch as "Issue#<insert_issue_number_here>". _Please keep your code clean: one feature or bug-fix per branch. While working on a branch for a feature or bug-fix, if you want to fix a different bug, please do that in a separate branch_. The new branch is now checkedout out, meaning that you are working on the branch and not the master.

2. **Do your coding in your local dev environment**.
* Adhere to common conventions you see in the existing code and to common coding conventions listed at the end of this document.
* Include tests, and ensure they pass

3. **Commit your changes locally**. Once changes are made to code, the changes will show in SourceTree. To register the changes with git do the following:
* Click on "File Status"
* Right click on the file that is untracked (unstaged files) and then click "add" The file will be moved from the unstaged section to staged.
* Right click on the file in the staged section and this time click "commit"
* Enter a comment about the change and click commit. This will cause the change to be tracked locally. **NEVER leave the commit message blank!** Provide a detailed, clear, and complete description of your commit! See “[How to write a Git commit message](https://chris.beams.io/posts/git-commit/)” for great pointers.
4. **Push your branch to Remote Repo on GitHub.** You can use "Push" command in Sourcetree GUI.
5. **Issue a Pull Request.** The changes you pushed above will appear on the Philance GitHub site as a "New pull request" A pull request will need to be created from this and so:
* Click on the "New pull request" icon and enter a comment. 
* Click "Create pull request"
6. **Merge branch to master.** Someone else needs to review and approve the pull request you created. Once its is approved you can merge your branch into the master branch.
* Click on "Pull requests".
* Enter a comment and then click on "squash and merge"
* Confirm the merge by clicking on "Confirm squash and merge"
7. **Clean local Virtual Linux environment.**
* Once code changes have been made and committed, the virtual Linux environment on your local machine can be removed by running the command `vagrant destroy`. To create the Linux environment again i.e. for another round of code changes, simple issue the command `vagrant up`.


## Coding and Other Conventions
* **Naming**. We strive to have 100% parity between names of objects discussed in the user stories and names of classes and columns in the database.
* Two spaces, no tabs
* No trailing whitespaces
* Blank lines should have no spaces
* Use spaces around operators, after commas, colons, semicolons, around { and before }
* No space after (, [ or before ], )
* Avoid `return` when not required
* **Compatibility with latest versions of dependent libraries.** We strive to ship Philance with the most up to date dependencies. This means we ship with the latest stable version of Node, React, etc. We welcome contributions that help update dependencies to the latest stable version. However be sure to test for regressions.
