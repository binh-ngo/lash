#!/usr/bin/env node
import { App, Environment, Stack, StackProps } from 'aws-cdk-lib';
import { FrontendStack } from '../lib/frontend-stack';
import { CognitoStack } from '../lib/cognito-stack';
import { BackendStack } from '../lib/backend-stack';
import { CertificateStack } from '../lib/certificate-stack';
import { HttpsRedirectStack } from '../lib/redirect-stack';
require("dotenv").config({ path: '.env' });

const app = new App();

class LashStack extends Stack {
  constructor(parent: App, name: string, props: StackProps) {
    super(parent, name, props);

    const certificate = new CertificateStack(this, "CertificateStack", {
      env: props.env as Environment,
      domainName: "modbeautyco.com",
      siteSubDomain: "*",
    });
    
    new FrontendStack(this, 'ModBeautyFrontendStack', {
      env: props.env as Environment,
      siteDomain: certificate.siteDomain,
      viewerCertificate: certificate.viewerCertificate,
      zone: certificate.zone,
    });

    const cognito = new CognitoStack(this, "CognitoStack", {
      env: props.env as Environment,
    });

    new BackendStack(this, "BackendStack", {
      env: props.env as Environment,
      userPool: cognito.userPool,
    });

    new HttpsRedirectStack(app, "ModBeautyHttpsRedirectStack", {
      env: props.env as Environment,
    })
  }
}

new LashStack(app, 'LashSite', {
  env: {
    region: process.env.CDK_DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});