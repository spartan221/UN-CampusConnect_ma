import { storeData, getData, deleteData } from './asyncStorage';

const KEY = 'TOKEN';

export const storeToken = async (token) => {
    await storeData(KEY, token);
}

export const getToken = async () => {
    const token = await getData(KEY);
    return token;
}

export const deleteToken = async () => {
    await deleteData(KEY);
}