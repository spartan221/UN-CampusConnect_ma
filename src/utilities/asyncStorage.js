import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Save a key:value pair in local storage 
 * @param {String} key 
 * @param {String} value 
 * @returns true if the process is sucessful, otherwise false
 */
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Get value from local storage with a key
 * @param {String} key 
 * @returns true if the process is sucessful, otherwise false
 */
export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        }
        return false;
    } catch (e) {
        return false;
    }
}

/**
 * Delete value from local storage with a key
 * @param {String} key 
 * @returns true if the process is sucessful, otherwise false
 */
export const deleteData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        return false
    }
}