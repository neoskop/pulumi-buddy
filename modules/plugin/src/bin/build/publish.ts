import { Storage } from '@google-cloud/storage';
import * as path from 'path';
import { step, info } from '../cli-utils';

export async function publish(files: string[], bucketName: string) {
    const storage = new Storage({ projectId: 'pulumi-270712' });
    const bucket = storage.bucket(bucketName);

    step('Publish', `to bucket gs://${bucketName}`);

    for (const file of files) {
        const fileName = path.basename(file);
        info('Upload', fileName);

        await bucket.upload(file, {
            gzip: false,
            destination: fileName,
            resumable: false
        });
    }
}
