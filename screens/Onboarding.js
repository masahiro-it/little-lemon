import * as React from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const Onboarding = ({ navigation, route }) => {
    const { completeOnboarding } = route.params || {}; // App.jsから渡された関数

    const [firstName, setFirstName] = React.useState("");
    const [email, setEmail] = React.useState("");

    const validateEmail = (text) => {
        const emailRegx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegx.test(text);
    };

    const isFormValid = () => {
        const isFirstNameValid = firstName.trim().length > 0 && /^[a-zA-Z\s]*$/.test(firstName);
        const isEmailValid = validateEmail(email);
        return isFirstNameValid && isEmailValid;
    }

    const handleNextPress = () => {
        if (completeOnboarding) {
            completeOnboarding(); // オンボーディング完了を保存
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require("../assets/Logo.png")} style={styles.logo}/>
            </View>
            <Text style={styles.welcomeText}>Let us get to know you</Text>

            {/* Input Fields */}
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={(text) => {
                        if (/^[a-zA-Z\s]*$/.test(text) || text==="") {
                            setFirstName(text);
                        }
                    }}
                    autoCapitalize="words"
                    autoCorrect={false}
                    maxLength={30}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={50}
                />
            </View>

            {/* Next Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, !isFormValid() && styles.disabledButton]}
                    disabled={!isFormValid()}
                    onPress={handleNextPress} 
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        backgroundColor: '#EDEFEE',
        padding: 10,
        justifyContent: "center",
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 50,
        resizeMode: "contain",
    },
    welcomeText: {
        fontFamily: "Karla",
        fontSize: 18,
        fontWeight: "500",// Mediumに相当
        color: "#333",
        padding: 20,
        textAlign: "center",
    },
    inputContainer: {
        paddingHorizontal: 20,
    },
    input: {
        fontFamily: "Karla",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#F9F9F9",
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    button: {
        backgroundColor: "#495E57",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    disabledButton: {
        backgroundColor: "#A9A9A9",
    },
    buttonText: {
        fontFamily: "Karla",
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff",
    },

});

export default Onboarding;
