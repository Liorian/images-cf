export default function NavFooter() {
    return (
        <footer className="w-full border-t bg-white/95">
            <div className="container mx-auto py-8 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-semibold">图片托管</h3>
                        <p className="text-sm text-gray-500">
                            分享精彩瞬间，连接视觉世界
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">快速链接</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <a href="/about" className="text-sm text-gray-500 hover:text-black transition-colors">关于我们</a>
                            <a href="/help" className="text-sm text-gray-500 hover:text-black transition-colors">帮助中心</a>
                            <a href="/terms" className="text-sm text-gray-500 hover:text-black transition-colors">使用条款</a>
                            <a href="/privacy" className="text-sm text-gray-500 hover:text-black transition-colors">隐私政策</a>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold">联系我们</h3>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-500">邮箱：contact@example.com</p>
                            <p className="text-sm text-gray-500">微信：image_hosting</p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center text-sm text-gray-500">
                    © {new Date().getFullYear()} 图片托管 版权所有
                </div>
            </div>
        </footer>
    )
}
