import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Services from './Services';
import Orgs from './Orgs';

const AddOns = () => {
  const [activeTab, setActiveTab] = useState('services');

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'services' && styles.activeTab
          ]}
          onPress={() => setActiveTab('services')}
        >
          <Text style={styles.tabText}>सामाजिक सेवाएं</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'organizations' && styles.activeTab
          ]}
          onPress={() => setActiveTab('organizations')}
        >
          <Text style={styles.tabText}>सामाजिक संस्थाएँ</Text>
        </TouchableOpacity>
      </View>
      {activeTab === 'services' ? <Services /> : <Orgs />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#ffcccb', // Light pink background for active tab
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e51a4b',
  },
});

export default AddOns;