/**
 * This function lists all storage-configured signaling channel ARNs and their associated stream's ARN.
 */
async function listStorageChannels(formValues) {
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

        // Get all signaling channels
        const result = await kinesisVideoClient.listSignalingChannels().promise();
        const allChannels = result.ChannelInfoList;

        // Grab channel ARNs
        const allChannelARNs = allChannels.map(channel => {
            return channel.ChannelARN;
        });


        const output = [];
        // Print channel ARN and its storage stream ARN if media storage is enabled for the channel
        for (const channelARN of allChannelARNs) {
            const request = {
                ChannelARN: channelARN,
            };
            const storageResult = await kinesisVideoClient.describeMediaStorageConfiguration(request).promise();
            if (storageResult.MediaStorageConfiguration.Status === 'ENABLED') {
                output.push({
                    ChannelARN: channelARN,
                    StreamARN: storageResult.MediaStorageConfiguration.StreamARN,
                });
            }

            await new Promise(res => setTimeout(res, 500)); // To avoid getting rate limited
        }

    } catch (e) {}
}
