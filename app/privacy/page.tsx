export default function PrivacyPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">隐私政策</h1>
            <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                    我们重视您的隐私保护，承诺保护您的个人信息安全。本隐私政策说明我们如何收集、使用和保护您的信息。请您仔细阅读并理解本隐私政策的全部内容。
                </p>
                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">1. 信息收集</h2>
                        <p className="text-gray-600">我们可能收集以下类型的信息：</p>
                        <ul className="list-disc pl-6 text-gray-600 mt-2">
                            <li>基本账户信息：用户名、电子邮件地址、密码等</li>
                            <li>个人资料信息：头像、个人简介等（如您选择提供）</li>
                            <li>使用数据：登录记录、操作日志、设备信息等</li>
                            <li>上传的内容：图片、文档等用户生成的内容</li>
                        </ul>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-semibold mb-2">2. 信息使用</h2>
                        <p className="text-gray-600">我们收集的信息将用于：</p>
                        <ul className="list-disc pl-6 text-gray-600 mt-2">
                            <li>提供、维护和改进我们的服务</li>
                            <li>处理您的请求和反馈</li>
                            <li>发送服务通知和更新信息</li>
                            <li>预防、检测和调查欺诈或其他违法行为</li>
                            <li>进行数据分析以改善用户体验</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">3. 信息共享</h2>
                        <p className="text-gray-600">除以下情况外，我们不会与第三方共享您的个人信息：</p>
                        <ul className="list-disc pl-6 text-gray-600 mt-2">
                            <li>获得您的明确同意</li>
                            <li>为完成服务必需的合作伙伴（如支付服务商）</li>
                            <li>遵守法律法规的要求</li>
                            <li>保护我们的合法权益</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">4. 信息保护</h2>
                        <p className="text-gray-600">我们采取多重措施保护您的信息安全：</p>
                        <ul className="list-disc pl-6 text-gray-600 mt-2">
                            <li>使用加密技术保护数据传输和存储</li>
                            <li>实施严格的数据访问控制</li>
                            <li>定期安全审计和漏洞检测</li>
                            <li>员工保密培训和管理</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">5. 您的权利</h2>
                        <p className="text-gray-600">关于您的个人信息，您有权：</p>
                        <ul className="list-disc pl-6 text-gray-600 mt-2">
                            <li>访问和查看您的个人信息</li>
                            <li>更正或更新您的个人信息</li>
                            <li>删除您的账户和相关信息</li>
                            <li>选择退出某些数据收集</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">6. Cookie 使用</h2>
                        <p className="text-gray-600">
                            我们使用 Cookie 和类似技术来提供和改进服务。您可以通过浏览器设置控制 Cookie 的使用。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">7. 隐私政策更新</h2>
                        <p className="text-gray-600">
                            我们可能会不时更新本隐私政策。更新后的政策将在网站上公布，重大变更会通过适当方式通知您。继续使用我们的服务即表示您同意更新后的隐私政策。
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">8. 联系我们</h2>
                        <p className="text-gray-600">
                            如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：<br />
                            电子邮件：privacy@example.com<br />
                            工作时间：周一至周五 9:00-18:00
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
} 