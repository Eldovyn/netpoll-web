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

const apiAccountActivePage = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/account-active/verification?token=${token}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response;
};

const apiUserAccountActive = async (options: UserOptions) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/account-active/verification`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(options),
    });
    return response;
};

export { apiRegister, apiAccountActive, apiAccountActivePage, apiUserAccountActive };