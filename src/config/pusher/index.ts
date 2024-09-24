export const pusherOptions = {
    host: 'pusher.com',
    secret: process.env.PUSHER_SECRET,
    appId: process.env.PUSHER_APP_ID,
    key: '63b782e0f7efbd748918',
};

export const chunkingOptions = {
    limit: 4000,
    enabled: true,
};
