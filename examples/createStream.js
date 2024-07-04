/**
 * This file demonstrates the process of creating a Kinesis Video Stream.
 */
async function createStream(formValues) {
    try {
 
        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
        });

        const createStreamResponse = await kinesisVideoClient
            .createStream({
                StreamName: formValues.streamName,
                DataRetentionInHours: formValues.retentionInHours,
            })
            .promise();

         
    } catch (e) {
        
    }
}
