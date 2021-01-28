import { LocalStorageAPI } from '../../core/LocalStorageAPI';

function useUUID() {
    function getUUID(
        localStorageAPI: LocalStorageAPI,
        generationFn: () => string,
    ): string {
        try {
            const data = localStorageAPI.get<string>('UUID');
            if (data) return data;
            else return createUUID(localStorageAPI, generationFn);
        } catch (err) {
            return '';
        }
    }

    function createUUID(
        localStorageAPI: LocalStorageAPI,
        generationFn: () => string,
    ): string {
        try {
            const UUID = generationFn();
            localStorageAPI.set('UUID', UUID);

            return UUID;
        } catch (err) {
            return '';
        }
    }

    return { getUUID };
}

export default useUUID;
