export const SessionStorage = {
    set: (token: string, value: string) =>  sessionStorage.setItem(token, value),
    get: (token: string) =>  sessionStorage.getItem(token),
    setObject: (token: string, value: string) => sessionStorage.setItem(token, JSON.stringify(value)),
    remove: (token: string) => sessionStorage.removeItem(token),
    clear: () => sessionStorage.clear(),
}