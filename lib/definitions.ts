export type User = {
  id: string;        // 用户ID
  name: string;      // 用户名
  email: string;     // 邮箱
  password: string;  // 密码
  bio?: string;      // 可选的个人简介
  website?: string;  // 可选的个人网站
  avatar_url?: string; // 可选的头像URL
  created_at: Date;  // 创建时间
  updated_at: Date;  // 更新时间
}; 