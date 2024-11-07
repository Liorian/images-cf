import {createUsersTable} from '@/lib/init-db';
import {NextResponse} from "next/server";

export async function GET() {
    return Response.json({
        message: '注释',
        status: 'success'
    });
    // console.log('收到数据库初始化请求');
    // try {
    //     await createUsersTable();
    //     console.log('数据库初始化成功');
    //     return NextResponse.json({
    //         message: '数据库初始化成功',
    //         status: 'success'
    //     });
    // } catch (error) {
    //     console.error('数据库初始化失败:', error);
    //     return NextResponse.json({
    //         message: '数据库初始化失败',
    //         error: error instanceof Error ? error.message : '未知错误',
    //         status: 'error'
    //     }, {status: 500});
    // }
}

