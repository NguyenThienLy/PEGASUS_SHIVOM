export interface IEmailConfig {
    host: string
    port: number
    user: string
    pass: string
    secure: boolean,
    service: "gmail",
    testing?: boolean
}