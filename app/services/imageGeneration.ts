import fs from 'fs'
import path from 'path'
import {v4 as uuidv4} from 'uuid'

// API 相关常量
const API_ENDPOINT = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis'
const TASK_STATUS_ENDPOINT = 'https://dashscope.aliyuncs.com/api/v1/tasks'
const MODEL_VERSION = 'stable-diffusion-3.5-large'
const IMAGE_SIZE = '1024*1024'
const POLL_INTERVAL = 5000 // 轮询间隔：5秒
const MAX_RETRIES = 12 // 最大重试次数：1分钟超时

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY

export async function generateImage(prompt: string): Promise<string> {
    if (!DASHSCOPE_API_KEY) {
        throw new Error('环境变量中缺少 DASHSCOPE_API_KEY 配置')
    }

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
                'Content-Type': 'application/json',
                'X-DashScope-Async': 'enable'
            },
            body: JSON.stringify({
                model: MODEL_VERSION,
                input: {
                    prompt: prompt
                },
                parameters: {
                    size: IMAGE_SIZE,
                    n: 1,
                    seed: Math.floor(Math.random() * 2147483647)
                }
            })
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(
                `API 请求失败，状态码：${response.status}。` +
                `错误详情：${JSON.stringify(errorData)}`
            )
        }

        const result = await response.json()

        // 检查任务状态
        if (result.output && result.output.task_status === 'PENDING') {
            const taskId = result.output.task_id
            let retries = 0

            // 开始轮询任务状态
            while (retries < MAX_RETRIES) {
                const statusResponse = await fetch(`${TASK_STATUS_ENDPOINT}/${taskId}`, {
                    headers: {
                        'Authorization': `Bearer ${DASHSCOPE_API_KEY}`
                    }
                })

                if (!statusResponse.ok) {
                    throw new Error(`检查任务状态失败，状态码：${statusResponse.status}`)
                }

                const statusResult = await statusResponse.json()

                if (statusResult.output && statusResult.output.task_status === 'SUCCEEDED') {
                    const imageBase64 = statusResult.output.results[0].url

                    // 确保存储目录存在
                    const uploadDir = path.join(process.cwd(), 'public', 'generated')
                    if (!fs.existsSync(uploadDir)) {
                        fs.mkdirSync(uploadDir, {recursive: true})
                    }

                    // 生成唯一的文件名并保存图片
                    const fileName = `${uuidv4()}.png`
                    const filePath = path.join(uploadDir, fileName)

                    try {
                        // 下载并保存图片
                        const imageResponse = await fetch(imageBase64)
                        if (!imageResponse.ok) {
                            throw new Error(`下载图片失败，状态码：${imageResponse.status}`)
                        }
                        const imageBuffer = await imageResponse.arrayBuffer()
                        fs.writeFileSync(filePath, Buffer.from(imageBuffer))
                        return `/generated/${fileName}`
                    } catch (downloadError) {
                        console.error('下载或保存图片失败:', downloadError)
                        throw new Error('处理生成的图片时发生错误')
                    }
                } else if (statusResult.output && statusResult.output.task_status === 'FAILED') {
                    throw new Error(`任务执行失败：${JSON.stringify(statusResult.output)}`)
                }

                retries++
                await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL))
            }

            throw new Error('任务执行超时（1分钟）')
        }

        throw new Error('收到意外的响应格式')
    } catch (error) {
        console.error('图片生成失败:', {
            error,
            prompt,
            timestamp: new Date().toISOString()
        })
        throw new Error(`图片生成失败: ${error instanceof Error ? error.message : '未知错误'}`)
    }
}
