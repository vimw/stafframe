interface taskTabI {
    title: string,
    tasks?: taskI[]
}

interface taskI {
    title: string,
    desc?: string,
    category: string,
    taskTime: taskTimeI
}

interface taskTimeI {
    hour: number,
    minute: number,
    length: number
}

interface categoryI {
    name: string,
    desc?: string,
    bgColor: string,
    color?: string
}

export type { taskTabI, taskI, taskTimeI, categoryI };