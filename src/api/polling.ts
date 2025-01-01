interface UserOptions {
    [key: string]: any;
}

const apiAddPolling = async (token: string, options: UserOptions) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/polling`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(options),
    });
    return response;
};

const apiGetPolling = async (token: string, polling_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_NETPOLL_API}netpoll/polling?polling_id=${polling_id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return response;
};

export { apiAddPolling, apiGetPolling };