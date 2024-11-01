import {Button} from "@/components/ui/button"
import {Card} from "@/components/ui/card"
import Image from "next/image"

export default function PersonalGallery() {
    return (
        <section className="w-full max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                <Card className="w-full md:w-[500px] aspect-square bg-muted flex items-center justify-center relative shadow-lg">
                    <Image
                        src="/placeholder.svg"
                        alt="Gallery preview"
                        fill
                        className="object-cover rounded-lg"
                    />
                </Card>

                <div className="space-y-6 flex-1 text-center md:text-left">
                    <h2 className="text-3xl font-bold">你的个人图库</h2>
                    <p className="text-muted-foreground text-lg">
                        管理你上传的图片，将它们整理成集合，并与朋友和家人分享。
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                        <Button variant="default" className="bg-black hover:bg-black/90">
                            查看资料
                        </Button>
                        <Button variant="outline">
                            管理图片
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
