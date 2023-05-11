import { Platform, StyleSheet, StatusBar } from "react-native";

export default GlobalStyles = StyleSheet.create({

    safeAreaView: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }

});