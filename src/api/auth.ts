interface UserOptions {
    [key: string]: any;
}

const apiRegister = async (options: UserOptions) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
    return response;
};