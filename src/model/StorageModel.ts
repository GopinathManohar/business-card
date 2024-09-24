export interface StorageInterface {
    set: (token: string, value: string) => void,
    get: (token: string) => string,
    setObject: (token: string, value: string) => void,
    clear: () => void,
    remove: (token: string) => void,
}