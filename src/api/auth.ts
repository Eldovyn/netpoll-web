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

const apiAccountActive = async (options: UserOptions) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/account-active`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
    return response;
};

const apiLogin = async (options: UserOptions) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
    return response;
};

export { apiRegister, apiAccountActive, apiLogin };