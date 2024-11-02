export default function AboutPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">关于我们</h1>
            <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                    图片托管平台致力于为用户提供简单、快速、可靠的图片存储和分享服务。我们的使命是让每个人都能轻松地分享视觉故事。
                </p>
                <p className="text-gray-600 mb-4">
                    我们的团队由一群热爱技术和设计的专业人士组成，始终致力于提供最佳的用户体验和可靠的服务质量。
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">我们的优势</h2>
                <ul className="list-disc pl-6 text-gray-600">
                    <li>高速稳定的图片存储服务</li>
                    <li>简洁直观的用户界面</li>
                    <li>完善的图片管理功能</li>
                    <li>安全可靠的数据保护</li>
                </ul>
            </div>
        </div>
    )
} 