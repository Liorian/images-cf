import { createKysely } from '@vercel/postgres-kysely';

interface Database {
  users: {
    id: string;
    name: string;
    email: string;
    password: string;
    bio: string | null;
    website: string | null;
    avatar_url: string | null;
    created_at: Date;
    updated_at: Date;
  }
}

export const db = createKysely<Database>(); 