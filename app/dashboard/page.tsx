import {Suspense} from 'react'
import {PostFeed, Weather} from '@/app/dashboard/Components'

export default function Posts() {
    return (
        <section>
            <Suspense fallback={<p>正在加载...</p>}>
                <PostFeed/>
            </Suspense>
            <Suspense fallback={<p>加载天气...</p>}>
                <Weather/>
            </Suspense>
        </section>
    )
}
