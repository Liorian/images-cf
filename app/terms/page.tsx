export default function TermsPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">使用条款</h1>
            <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                    欢迎使用图片托管服务。在使用我们的服务之前，请仔细阅读以下条款。使用我们的服务即表示您同意并接受以下所有条款：
                </p>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">1. 服务使用规则</h2>
                        <p className="text-gray-600">
                            用户需要遵守相关法律法规，不得上传违法违规内容。具体包括但不限于：
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-600">
                            <li>禁止上传任何涉及暴力、色情、赌博等违法内容</li>
                            <li>禁止上传侵犯他人知识产权的内容</li>
                            <li>禁止利用本服务进行任何形式的网络攻击或违法活动</li>
                            <li>禁止上传含有计算机病毒或可能危害系统安全的内容</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-semibold mb-2">2. 用户责任</h2>
                        <p className="text-gray-600">
                            用户在使用本服务时应当承担以下责任：
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-600">
                            <li>妥善保管账号密码，定期更新密码以确保账号安全</li>
                            <li>对账号下的所有行为负责，包括内容上传和分享</li>
                            <li>及时备份重要数据，本服务不对数据丢失承担责任</li>
                            <li>遵守服务器资源使用限制，不得滥用服务器资源</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">3. 内容规范</h2>
                        <p className="text-gray-600">
                            上传的图片内容需要符合以下规范：
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-600">
                            <li>图片格式支持：JPG、PNG、GIF、WebP等常见格式</li>
                            <li>单张图片大小不超过10MB</li>
                            <li>图片内容清晰可见，不得上传模糊或失真的图片</li>
                            <li>不得上传含有水印或广告的图片</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">4. 服务变更与终止</h2>
                        <p className="text-gray-600">
                            本服务保留以下权利：
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-600">
                            <li>可能随时修改或终止服务，无需事先通知</li>
                            <li>对违规账号进行警告、限制使用或永久封禁</li>
                            <li>删除违规内容，且无需承担任何责任</li>
                            <li>根据法律要求或技术需要修改服务条款</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">5. 知识产权</h2>
                        <p className="text-gray-600">
                            关于知识产权，请注意：
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-600">
                            <li>用户保留其上传内容的所有权利</li>
                            <li>用户上传即视为授予本服务展示和存储的权限</li>
                            <li>用户需确保拥有上传内容的相关权利</li>
                            <li>本服务的界面、功能等相关知识产权归本公司所有</li>
                        </ul>
                    </div>

                    <div className="mt-8 text-sm text-gray-500">
                        <p>最后更新日期：2024年3月1日</p>
                        <p>如有任何问题，请联系客服：support@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 