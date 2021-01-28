#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { CdkChatStack } from '../lib/cdk-chat-stack'

const app = new cdk.App()
new CdkChatStack(app, 'CdkChatStack')
