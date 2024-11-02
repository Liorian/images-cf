export default function HelpPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-8">帮助中心</h1>
            <div className="grid gap-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">常见问题</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-medium mb-2">如何上传图片？</h3>
                            <p className="text-gray-600">登录后，点击上传按钮或将图片拖拽到上传区域即可开始上传。</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">支持哪些图片格式？</h3>
                            <p className="text-gray-600">我们支持 JPG、PNG、GIF、WebP 等常见图片格式。</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">如何管理我的图片？</h3>
                            <p className="text-gray-600">在个人中心可以查看、编辑和删除已上传的图片。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 