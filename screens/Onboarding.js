import * as React from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const Onboarding = ({ navigation, route }) => {
  const { completeOnboarding } = route.params || {};
  const [firstName, setFirstName] = React.useState(route.params?.firstName || '');
  const [lastName, setLastName] = React.useState(route.params?.lastName || '');
  const [email, setEmail] = React.useState(route.params?.email || '');

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const isFormValid = () => {
    const isFirstNameValid = firstName.trim().length > 0 && /^[a-zA-Z\s]*$/.test(firstName);
    const isLastNameValid = lastName.trim().length >= 0 && /^[a-zA-Z\s]*$/.test(lastName); // 空許可
    const isEmailValid = validateEmail(email);
    return isFirstNameValid && isEmailValid; // lastNameは必須でない
  };

  const handleNextPress = () => {
    if (completeOnboarding) {
      console.log('Submitting:', { firstName, lastName, email }); // デバッグ
      completeOnboarding(firstName, email, lastName); // lastNameを渡す
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.welcomeText}>Let us get to know you</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => {
            if (/^[a-zA-Z\s]*$/.test(text) || text === '') {
              setFirstName(text);
            }
          }}
          autoCapitalize="words"
          autoCorrect={false}
          maxLength={30}
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => {
            if (/^[a-zA-Z\s]*$/.test(text) || text === '') {
              setLastName(text);
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
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          maxLength={50}
        />
      </View>
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#495E57', padding: 10, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 150, height: 50, resizeMode: 'contain' },
  welcomeText: { fontFamily: 'Karla', fontSize: 18, fontWeight: '500', color: '#333', padding: 20, textAlign: 'center' },
  inputContainer: { paddingHorizontal: 20 },
  input: { fontFamily: 'Karla', fontSize: 16, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 15, backgroundColor: '#f9f9f9' },
  buttonContainer: { flex: 1, justifyContent: 'flex-end', paddingHorizontal: 20, paddingBottom: 20 },
  button: { backgroundColor: '#495E57', padding: 15, borderRadius: 5, alignItems: 'center' },
  disabledButton: { backgroundColor: '#a9a9a9' },
  buttonText: { fontFamily: 'Karla', fontSize: 16, fontWeight: 'bold', color: '#fff' },
});

export default Onboarding;