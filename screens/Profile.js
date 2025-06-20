import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // 修正済みのインポート

const Profile = ({ navigation, route }) => {
  const { setState, saveChanges } = route.params || {};
  const [avatarSource, setAvatarSource] = useState(null); // 初期アバターをnullに
  const [initialAvatarSource, setInitialAvatarSource] = useState(null); // 初期アバター保存
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notifications, setNotifications] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });
  const [initialNotifications, setInitialNotifications] = useState({
    orderStatuses: true,
    passwordChanges: true,
    specialOffers: true,
    newsletter: true,
  });

  useEffect(() => {
    const loadProfileData = async () => {
      const data = await AsyncStorage.getItem('profileData');
      if (data) {
        const parsedData = JSON.parse(data);
        setFirstName(parsedData.firstName || '');
        setLastName(parsedData.lastName || '');
        setEmail(parsedData.email || '');
        setPhone(parsedData.phone || '');
        // アバター画像をURIとしてロード
        const savedAvatar = parsedData.avatarSource;
        if (savedAvatar) {
          setAvatarSource({ uri: savedAvatar });
          setInitialAvatarSource({ uri: savedAvatar });
        } else {
          setAvatarSource(null); // 画像がない場合プレースホルダー用
          setInitialAvatarSource(null);
        }
        setNotifications(parsedData.notifications || {
          orderStatuses: true,
          passwordChanges: true,
          specialOffers: true,
          newsletter: true,
        });
        setInitialNotifications(parsedData.notifications || {
          orderStatuses: true,
          passwordChanges: true,
          specialOffers: true,
          newsletter: true,
        });
      }
    };
    loadProfileData();
  }, []);

  // 画像ピッカーを起動
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarSource(result.assets[0].uri); // アバターとヘッダーの両方を更新
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarSource(null); // プレースホルダーに戻す
    console.log('Remove avatar pressed');
  };

  const saveProfileChanges = async () => {
    if (saveChanges) {
      await saveChanges(firstName, email);
    }
    const profileData = {
      firstName,
      lastName,
      email,
      phone,
      avatarSource: avatarSource?.uri || null, // 画像URIを保存
      notifications,
    };
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(profileData));
      console.log('Profile data saved');
    } catch (error) {
      console.log('Error saving profile data:', error);
    }
  };

  const discardChanges = () => {
    setAvatarSource(initialAvatarSource); // 初期アバターに戻す
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setNotifications(initialNotifications); // 初期通知設定に戻す
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('isOnboardingCompleted');
      await AsyncStorage.removeItem('profileData');
      if (setState) {
        setState((prevState) => ({ ...prevState, isOnboardingCompleted: false }));
      }
      navigation.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      });
    } catch (error) {
      console.log('Error during logout:', error);
    }
  };

  // プレースホルダー用テキスト生成
  const getPlaceholderText = () => {
    const firstChar = firstName.charAt(0).toUpperCase();
    const lastChar = lastName.charAt(0).toUpperCase();
    return firstChar + lastChar || '??'; // 名前が空の場合は'??'
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        {avatarSource ? (
          <Image source={avatarSource} style={styles.profileImage} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text style={styles.placeholderText}>{getPlaceholderText()}</Text>
          </View>
        )}
      </View>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.avatarSection}>
            <Text style={styles.label}>Avatar</Text>
            <View style={styles.avatarRow}>
              {avatarSource ? (
                <Image source={avatarSource} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.placeholderText}>{getPlaceholderText()}</Text>
                </View>
              )}
              <TouchableOpacity style={styles.changeButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.removeButton} onPress={handleRemoveAvatar}>
                <Text style={styles.buttonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.label}>First name</Text>
          <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} placeholder="Tilly" />
          <Text style={styles.label}>Last name</Text>
          <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Doe" />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="tillydoe@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="(217) 555-0113"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.notificationSection}>
          <Text style={styles.sectionTitle}>Email notifications</Text>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, notifications.orderStatuses && styles.checkboxChecked]}
              onPress={() => setNotifications(prev => ({ ...prev, orderStatuses: !prev.orderStatuses }))}
            />
            <Text style={styles.checkboxLabel}>Order statuses</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, notifications.passwordChanges && styles.checkboxChecked]}
              onPress={() => setNotifications(prev => ({ ...prev, passwordChanges: !prev.passwordChanges }))}
            />
            <Text style={styles.checkboxLabel}>Password changes</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, notifications.specialOffers && styles.checkboxChecked]}
              onPress={() => setNotifications(prev => ({ ...prev, specialOffers: !prev.specialOffers }))}
            />
            <Text style={styles.checkboxLabel}>Special offers</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[styles.checkbox, notifications.newsletter && styles.checkboxChecked]}
              onPress={() => setNotifications(prev => ({ ...prev, newsletter: !prev.newsletter }))}
            />
            <Text style={styles.checkboxLabel}>Newsletter</Text>
          </View>
        </View>
        {/* Logout Button */}
        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.logoutButton} onPress={logout}>
            <Text style={styles.logoutButtonText}>Log out</Text>
          </TouchableOpacity>
        </View>
        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.discardButton} onPress={discardChanges}>
            <Text style={styles.actionButtonText}>Discard changes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={saveProfileChanges}>
            <Text style={styles.actionButtonText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEFEE',
    padding: 10,
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 20,
    color: '#333333',
    fontFamily: 'Karla',
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'contain',
  },
  profileImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EDEFEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  infoSection: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Karla',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
    textAlign: 'left',
  },
  avatarSection: {
    flexDirection: 'column',
  },
  label: {
    fontFamily: 'Karla',
    fontSize: 16,
    color: '#333333',
    marginBottom: 10,
    textAlign: 'left',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EDEFEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  placeholderText: {
    fontFamily: 'Karla',
    fontSize: 32,
    color: '#495E57',
    fontWeight: 'bold',
  },
  changeButton: {
    backgroundColor: '#495E57',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#EDEFEE',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Karla',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  inputSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  input: {
    fontFamily: 'Karla',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#EDEFEE',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  notificationSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#333333',
    borderRadius: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#495E57',
  },
  checkboxLabel: {
    fontFamily: 'Karla',
    fontSize: 16,
    color: '#333333',
  },
  logoutContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontFamily: 'Karla',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  discardButton: {
    backgroundColor: '#a9a9a9',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#495E57',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  actionButtonText: {
    fontFamily: 'Karla',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Profile;