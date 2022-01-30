
# github-actions [![My First Github Action](https://github.com/mananjain31/github-actions/actions/workflows/test.yml/badge.svg)](https://github.com/mananjain31/github-actions/actions/workflows/test.yml)
Implemented continuous build and deployment pipelines to vercel following steps learned from the course : [CI/CD With GitHub Actions | codedamn](https://codedamn.com/learn/github-actions-ci-cd)


## Setting up initial folder structure
 
* In root directory of the project create `.github` directory . 
* In this `.github` directory create `workflows` directory.
* In this `workflows` directory create a YAML file named`test.yml`

## Steps for GitHub token creation (skip if already created)

* visit [Personal Access Tokens (github.com)](https://github.com/settings/tokens) 
* Click ```Generate new token```, give a name to the token and select `workflow` from the scope selections.
* Generate this token and copy it to a secured place

## Set up origin on git for workflow

 Add origin to the GitHub repo using below command syntax.
```
git remote add origin https://[generated github token]@github.com/[github username]/[repo name]
```

## build and deploy once to vercel
add build script to `package.json` then,
in the root of the project execute in terminal:
```bash
yarn build # or snowpack build
yarn add vercel --dev
```
create a token in Vercel and copy it to a secured place
```
yarn vc --token:[your vercel token] # and set source directory to ./build
```
now copy `projectId` and `orgId` from `.vercel/project.json` to a secured place

## GitHub repo Secrets 
Add these copied tokens and ID's as secrets created from settings of this repository
```
VERCEL_ORG_ID
VERCEL_PROJECT_ID
VERCEL_TOKEN
```

## `test.yml` file
```yml
name: My First Github Action
on: [push]
jobs:
  build-app:
    runs-on: ubuntu-latest
    env: # these will be fetched from this repo Secrets
      VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
      VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
    steps:
      - uses: actions/checkout@v2 # this clones the current repo in the docker instance running this action
      - uses: actions/setup-node@v2 # this installs nodejs with yarn
        with: 
          node-version: 14
      - name: Install node_modules
        run: yarn
      - name: Build your project
        run: yarn build
      - name: Deploying the project
        run: yarn deploy
      - name: Setup Finish
        run: echo " hurray! "
```

## Add build and deploy scripts in `package.json`
```json
"scripts": {
  "start": "snowpack dev",
  "build": "snowpack build",
  "deploy" : "vc --prod --confirm --token=$VERCEL_TOKEN"
},
```

## Conclusion
Now,  you can commit and push changes and view your build and deployment logs on the `Actions` tab of the GitHub repository.
