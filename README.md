# First Steps With App Sync <!-- omit in toc -->

GraphQL API built using AWS CDK based on [This](https://dev.to/dabit3/full-stack-serverless-building-a-real-time-chat-app-with-graphql-cdk-appsync-and-react-1dbb) article.

## Table of Contents <!-- omit in toc -->

<!-- TOC -->

- [Setting Up The Project](#setting-up-the-project)
  - [Deploying The Backend](#deploying-the-backend)

<!-- TOC -->

## Setting Up The Project

### Deploying The Backend

You need to have set up the AWS CLI and have your account credentials set. You also need to have AWS CDK installed.
To deploy the backend:

- `cd cdk-chat`
- `cdk synth`
- `cdk deploy`

Answer yes to any of the questions that you are asked. Note that the user referenced by your credentials need to have the necessary permissions to create the resources.

**[⬆ back to top](#table-of-contents)**
