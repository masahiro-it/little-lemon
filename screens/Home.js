import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initDatabase, getMenuItems, saveMenuItems, searchMenuItems } from '../database'; // パスを調整

const Home = ({ navigation, route }) => {
  const { setState, saveChanges } = route.params || {};
  const [avatarSource, setAvatarSource] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        // データベース初期化
        await initDatabase();

        // プロファイルデータのロード
        const profileData = await AsyncStorage.getItem('profileData');
        if (profileData) {
          const parsedProfile = JSON.parse(profileData);
          setFirstName(parsedProfile.firstName || '');
          setLastName(parsedProfile.lastName || '');
          const savedAvatar = parsedProfile.avatarSource;
          if (savedAvatar) {
            setAvatarSource({ uri: savedAvatar });
          } else {
            setAvatarSource(null);
          }
        }

        // メニュー項目のロード
        const existingData = await getMenuItems();
        if (existingData.length === 0) {
          // データがない場合、リモートから取得して保存
          const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
          const data = await response.json();
          const menuItems = data.menu.map(item => ({
            name: item.name,
            price: item.price,
            description: item.description,
            image: item.image,
            category: item.category,
          }));
          await saveMenuItems(menuItems);
          setMenuData(menuItems);
          setCategories([...new Set(menuItems.map(item => item.category))]);
        } else {
          // 既存データがある場合、ロード
          setMenuData(existingData);
          setCategories([...new Set(existingData.map(item => item.category))]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setMenuData([]);
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const getPlaceholderText = () => {
    const firstChar = firstName.charAt(0).toUpperCase();
    const lastChar = lastName.charAt(0).toUpperCase();
    return firstChar + (lastChar || '');
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const toggleCategory = (category) => {
    setActiveCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const debounceSearch = useCallback((text) => {
    const delay = 500; // 500msデバウンス
    clearTimeout(debounceSearch.timer);
    debounceSearch.timer = setTimeout(async () => {
      const filteredData = await searchMenuItems(text, activeCategories);
      setMenuData(filteredData);
    }, delay);
  }, [activeCategories]);

  const handleSearch = (text) => {
    setSearchText(text);
    debounceSearch(text);
  };

  const isItemHighlighted = (item) => activeCategories.includes(item.category);

  const renderMenuItem = ({ item }) => (
    <View style={[styles.menuItem, isItemHighlighted(item) && styles.highlightedItem]}>
      <View style={styles.menuText}>
        <Text style={[styles.menuName, isItemHighlighted(item) && styles.highlightedText]}>{item.name}</Text>
        <Text style={[styles.menuDescription, isItemHighlighted(item) && styles.highlightedText]}>{item.description}</Text>
        <Text style={[styles.menuPrice, isItemHighlighted(item) && styles.highlightedText]}>${item.price.toFixed(2)}</Text>
      </View>
      <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} style={styles.menuImage} />
    </View>
  );

  if (isLoading) return <ActivityIndicator size="large" color="#495E57" />;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
        <TouchableOpacity onPress={navigateToProfile}>
          {avatarSource ? (
            <Image source={avatarSource} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.placeholderText}>{getPlaceholderText()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      {/* Banner with Search Bar */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Little Lemon</Text>
        <View style={styles.contentRow}>
          <View style={styles.textContainer}>
            <Text style={styles.bannerSubtitle}>Chicago</Text>
            <Text style={styles.bannerText}>
              We are a family owned Mediterranean restaurant, filtered on traditional recipes served with a modern twist.
            </Text>
          </View>
          <Image source={require('../assets/HeroImage.png')} style={styles.heroImage} />
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search menu..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      {/* Order for Delivery */}
      <View style={styles.deliverySection}>
        <Text style={styles.deliveryTitle}>ORDER FOR DELIVERY!</Text>
        <View style={styles.categoryButtons}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryButton, activeCategories.includes(category) && styles.activeCategoryButton]}
              onPress={() => toggleCategory(category)}
            >
              <Text style={[styles.categoryText, activeCategories.includes(category) && styles.activeCategoryText]}>{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Menu Items List */}
        <FlatList
          data={menuData}
          renderItem={renderMenuItem}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          contentContainerStyle={styles.menuList}
        />
      </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
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
  placeholderText: {
    fontFamily: 'Karla',
    fontSize: 16,
    color: '#495E57',
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: '#495E57',
    padding: 20,
  },
  bannerTitle: {
    fontFamily: 'Markazi Text',
    fontSize: 48,
    color: '#F4CE14',
    textAlign: 'flex-start',
    marginBottom: 10,
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  bannerSubtitle: {
    fontFamily: 'Markazi Text',
    fontSize: 32,
    color: '#fff',
    marginBottom: 10,
  },
  bannerText: {
    fontFamily: 'Karla',
    fontSize: 16,
    color: '#fff',
    textAlign: 'left',
  },
  heroImage: {
    width: 150,
    height: 200,
    resizeMode: 'contain',
  },
  searchBar: {
    width: '100%',
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  deliverySection: {
    padding: 20,
    flex: 1,
  },
  deliveryTitle: {
    fontFamily: 'Karla',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  categoryButton: {
    backgroundColor: '#EDEFEE',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  activeCategoryButton: {
    backgroundColor: '#495E57',
  },
  categoryText: {
    fontFamily: 'Karla',
    fontSize: 16,
    color: '#495E57',
  },
  activeCategoryText: {
    color: '#F4CE14',
  },
  menuList: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEFEE',
  },
  highlightedItem: {
    backgroundColor: '#E6F3FA',
  },
  menuText: {
    flex: 1,
    marginRight: 10,
  },
  menuName: {
    fontFamily: 'Karla',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  highlightedText: {
    color: '#2E7D32',
  },
  menuDescription: {
    fontFamily: 'Karla',
    fontSize: 14,
    color: '#666',
  },
  menuPrice: {
    fontFamily: 'Karla',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495E57',
  },
  menuImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Home;