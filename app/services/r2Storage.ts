import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';

const r2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    },
});

const BASE_URL = 'https://cdn.lhao.org';

function generateStoragePath(fileName: string): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `images/${year}/${month}/${day}/${fileName}`;
}

export async function uploadToR2(imageData: Buffer, fileName: string): Promise<string> {
    try {
        const storagePath = generateStoragePath(fileName);

        await r2Client.send(
            new PutObjectCommand({
                Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
                Key: storagePath,
                Body: imageData,
                ContentType: 'image/png',
                CacheControl: 'public, max-age=31536000', // 1年的缓存时间
            })
        );

        // 返回完整的CDN URL
        return `${BASE_URL}/${storagePath}`;
    } catch (error) {
        console.error('上传到 R2 失败:', error);
        throw new Error('上传图片到 R2 存储失败');
    }
}
