'use client'
import NavBar from "@/components/ui/navbar"
import Form from "@/layout/Form"
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const MyPolling = () => {
    return (
        <>
            <NavBar />
            <section className="w-full min-h-screen bg-black flex-row pt-8 pb-5 items-center justify-center">
                <div className="bg-black w-[90%] mx-auto rounded-md p-8">
                    <h1 className="text-white text-start text-lg font-semibold pb-2">My Polling</h1>
                    <hr className="border-gray-800" />
                    <br />
                    <Form category="search-poll" />
                    <br />
                    <Card className="rounded-sm">
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                    </Card>
                    <br />
                    <Card className="rounded-sm">
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                    </Card>
                    <br />
                    <Card className="rounded-sm">
                        <CardHeader>
                            <CardTitle>Card Title</CardTitle>
                            <CardDescription>Card Description</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </section>
        </>
    )
}

export default MyPolling