interface taskTabI {
    title: string,
    tasks?: taskI[]
}

interface taskI {
    title: string,
    desc?: string,
    category?: string,
    taskTime: taskTimeI
}

interface taskTimeI {
    hour: number,
    minute: number,
    length: number
}

export type { taskTabI, taskI, taskTimeI };