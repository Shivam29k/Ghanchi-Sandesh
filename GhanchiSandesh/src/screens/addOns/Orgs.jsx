import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OrganizationDetails from './components/OrganizationDetails';

const Orgs = () => {
  const [orgData, setOrgData] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const saveDataToStorage = async (data) => {
    try {
      await AsyncStorage.setItem('orgData', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to storage:', error);
    }
  };

  const fetchOrgData = async (forceRefresh = false) => {
    try {
      if (!forceRefresh) {
        const storedData = await AsyncStorage.getItem('orgData');
        if (storedData) {
          setOrgData(JSON.parse(storedData));
          return;
        }
      }

      const response = await fetch('https://ghanchisandesh.live/get-all-gs-social-orgs-name-logo');
      const data = await response.json();
      setOrgData(data);
      saveDataToStorage(data);
    } catch (error) {
      console.error('Error fetching organization data:', error);
    }
  };

  useEffect(() => {
    fetchOrgData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrgData(true).then(() => setRefreshing(false));
  };

  const handleOrgPress = (id) => {
    setSelectedOrgId(id);
  };

  const OrganizationItem = ({ id, name, logo }) => (
    <TouchableOpacity style={styles.item} onPress={() => handleOrgPress(id)}>
      <Image source={{ uri: logo }} style={styles.logo} />
      <Text style={styles.itemText}>{name}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <Text style={styles.header}>सामाजिक संस्थाएँ</Text>
  );

  return (
    <View style={styles.container}>
      {selectedOrgId ? (
        <OrganizationDetails orgId={selectedOrgId} />
      ) : (
        <FlatList
          data={orgData}
          renderItem={({ item }) => <OrganizationItem id={item._id} name={item.name} logo={item.logo} />}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={renderHeader}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#f5f5f5',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#e51a4b',
      marginBottom: 15,
      textAlign: 'center',
    },
    item: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 5,
      marginBottom: 10,
      elevation: 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      fontSize: 20,
      color: '#333',
      marginLeft: 10,
    },
    logo: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
  });

export default Orgs;