/**
 * This file demonstrates the process of creating a KVS Signaling Channel.
 */
async function createSignalingChannel(formValues) {
    $('#logs-header')[0].scrollIntoView({
        block: 'start',
    });

    try {
 
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
        });

        // Get signaling channel ARN
        await kinesisVideoClient
            .createSignalingChannel({
                ChannelName: formValues.channelName,
            })
            .promise();

        // Get signaling channel ARN
        const describeSignalingChannelResponse = await kinesisVideoClient
            .describeSignalingChannel({
                ChannelName: formValues.channelName,
            })
            .promise();
        const channelARN = describeSignalingChannelResponse.ChannelInfo.ChannelARN;
         
    } catch (e) {
       
    }
}
