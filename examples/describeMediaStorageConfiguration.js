/**
 * This function fetches the media storage configuration.
 */
async function describeMediaStorageConfiguration(formValues) {
    $('#logs-header')[0].scrollIntoView({
        block: 'start',
    });

    try {

        // Create KVS client
        const kinesisVideoClient = new AWS.KinesisVideo({
            region: formValues.region,
            accessKeyId: formValues.accessKeyId,
            secretAccessKey: formValues.secretAccessKey,
            sessionToken: formValues.sessionToken,
            endpoint: formValues.endpoint,
        });

        const mediaStorageConfiguration = await kinesisVideoClient.describeMediaStorageConfiguration({ ChannelName: formValues.channelName }).promise();

    } catch (e) {
        
    }
}
