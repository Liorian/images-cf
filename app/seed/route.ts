import {db} from '@vercel/postgres';

export async function GET() {
    const client = db.connect();
    console.log(client)
    return Response.json({message: 'Database seeded successfully'});
}

