// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL

async function getData() {
    // 模拟一个 3 秒的延迟
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log('Successfully getData');
}

export default async function Page() {
    await getData();
    return <h1>Hello, Dashboard Page!</h1>
}
