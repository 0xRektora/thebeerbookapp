type TLocalStorageKeys = 'UUID';

interface ILocalStorageSet<T> {
    key: string;
    value: T;
}
export class LocalStorageAPI {
    public set<T>(
        key: TLocalStorageKeys,
        value: T,
    ): ILocalStorageSet<T> | undefined {
        try {
            localStorage.setItem(key, JSON.stringify(value));

            return {
                key,
                value,
            };
        } catch (err) {
            return undefined;
        }
    }

    public get<T>(key: TLocalStorageKeys): T | undefined {
        try {
            return JSON.parse(localStorage.getItem(key)!);
        } catch (err) {
            return undefined;
        }
    }
}
