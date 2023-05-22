import { Alert } from "react-native";

/**
 * 
 * @param {String} title 
 * @param {String} message 
 * @param {String} buttonText 
 */
export const alertWindow = (title, message, buttonText) => Alert.alert(
    title,
    message,
    [
        {
            text: buttonText
        }

    ]
);