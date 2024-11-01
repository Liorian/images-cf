export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* 团队导航骨架屏 */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div
                        key={i}
                        className="h-10 w-24 rounded-full bg-gray-200 animate-pulse"
                    />
                ))}
            </div>

            {/* 团队信息头部骨架屏 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            </div>

            {/* 团队成员列表骨架屏 */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                            <div className="flex-1">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
                                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 