import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

// 模拟团队数据类型
interface TeamMember {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

interface TeamData {
    id: string;
    name: string;
    description: string;
    members: TeamMember[];
}

// 模拟多个团队的数据
const mockTeams: Record<string, TeamData> = {
    '1': {
        id: '1',
        name: "研发团队",
        description: "负责产品研发和技术创新",
        members: [
            {id: 1, name: "张三", role: "团队负责人", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=1"},
            {id: 2, name: "李四", role: "开发工程师", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=2"},
        ]
    },
    '2': {
        id: '2',
        name: "产品团队",
        description: "负责产品规划和用户体验",
        members: [
            {id: 3, name: "王五", role: "产品经理", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=3"},
            {id: 4, name: "赵六", role: "UI设计师", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=4"},
        ]
    },
    '3': {
        id: '3',
        name: "运营团队",
        description: "负责市场运营和用户增长",
        members: [
            {id: 5, name: "钱七", role: "运营总监", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=5"},
            {id: 6, name: "孙八", role: "市场专员", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=6"},
        ]
    },
    '4': {
        id: '4',
        name: "销售团队",
        description: "负责产品销售和客户维护",
        members: [
            {id: 7, name: "周九", role: "销售总监", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=7"},
            {id: 8, name: "吴十", role: "客户经理", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=8"},
        ]
    },
    '5': {
        id: '5',
        name: "客服团队",
        description: "负责客户服务和支持",
        members: [
            {id: 9, name: "郑十一", role: "客服主管", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=9"},
            {id: 10, name: "王十二", role: "客服专员", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=10"},
        ]
    }
};

async function fetchTeam(id: string): Promise<TeamData | undefined> {
    // 模拟 API 调用
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockTeams[id]);
        }, 500);
    });
}

// 创建团队导航组件
async function TeamNavigation({ currentId }: { currentId: string }) {
    // 添加一个异步操作来验证参数
    const teams = await mockTeams;

    return (
        <div className="flex gap-2 mb-6 overflow-x-auto">
            {Object.keys(teams).map((teamId) => (
                <Link
                    key={teamId}
                    href={`/team/${teamId}`}
                    className={`px-4 py-2 rounded-full ${
                        currentId === teamId
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {teams[teamId].name}
                </Link>
            ))}
        </div>
    );
}

// 创建团队信息组件
async function TeamInfo({ id }: { id: string }) {
    const team = await fetchTeam(id);

    if (!team) {
        redirect('/login');
    }

    return (
        <>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold mb-2">{team.name}</h1>
                <p className="text-gray-600">{team.description}</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">团队成员</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {team.members.map((member) => (
                        <div key={member.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <img
                                src={member.avatar}
                                alt={member.name}
                                className="w-12 h-12 rounded-full"
                            />
                            <div>
                                <h3 className="font-medium">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// 修改主页面组件
export default async function TeamPage({ params }: { params: { id: string } }) {
    // 在组件开始就等待并验证 params
    const { id } = await params;

    // 验证 ID 是否有效
    if (!mockTeams[id]) {
        redirect('/login');
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* 团队导航 */}
            <Suspense fallback={
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div
                            key={i}
                            className="h-10 w-24 rounded-full bg-gray-200 animate-pulse"
                        />
                    ))}
                </div>
            }>
                <TeamNavigation currentId={id} />
            </Suspense>

            {/* 团队信息 */}
            <Suspense fallback={
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                        <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
                        <div className="h-4 w-full bg-gray-200 rounded" />
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                        <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                                    <div className="w-12 h-12 rounded-full bg-gray-200" />
                                    <div>
                                        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
                                        <div className="h-3 w-32 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            }>
                <TeamInfo id={id} />
            </Suspense>
        </div>
    );
}
