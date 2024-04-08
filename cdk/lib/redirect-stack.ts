import { Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import { HostedZone } from 'aws-cdk-lib/aws-route53';
import { HttpsRedirect } from 'aws-cdk-lib/aws-route53-patterns';

export class HttpsRedirectStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const hostedZone = HostedZone.fromHostedZoneAttributes(this, 'HostedZoneWithAttributes', {
      hostedZoneId: 'Z10321711YVDS28R758W4',
      zoneName: 'modbeautyco.com'
    })

    new HttpsRedirect(this, 'RedirectStack', {
      recordNames: ['modbeautyco.com'],
      targetDomain: 'www.modbeautyco.com',
      zone: hostedZone
    })
  }
}