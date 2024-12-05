import fs from 'fs'
import path from 'path'
import {v4 as uuidv4} from 'uuid'

const STABILITY_API_KEY = process.env.STABILITY_API_KEY

export async function generateImage(prompt: string): Promise<string> {
    if (!STABILITY_API_KEY) {
        throw new Error('STABILITY_API_KEY is not configured')
    }

    try {
        // 创建 FormData 对象
        const formData = new FormData()
        formData.append('prompt', prompt)

        const response = await fetch('https://api.stability.ai/v2beta/stable-image/generate/core', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${STABILITY_API_KEY}`,
                'Accept': 'image/*',
                // 移除 Content-Type header，让浏览器自动设置正确的 boundary
            },
            body: formData
        })

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(
                `API request failed with status ${response.status}. ` +
                `Status text: ${response.statusText}. ` +
                `Error details: ${errorText}`
            );
        }

        // 确保 public/generated 目录存在
        const uploadDir = path.join(process.cwd(), 'public', 'generated')
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true})
        }

        // 生成唯一的文件名
        const fileName = `${uuidv4()}.png`
        const filePath = path.join(uploadDir, fileName)

        // 将响应内容写入文件
        const buffer = await response.arrayBuffer()
        fs.writeFileSync(filePath, Buffer.from(buffer))

        // 返回相对路径
        return `/generated/${fileName}`
    } catch (error) {
        console.error('Image generation failed:', error)
        throw error
    }
}
