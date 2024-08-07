import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, BackHandler } from 'react-native';
import ServiceTypeList from './components/ServiceTypeList';

import hallImage from './images/hall.png';
import hostelImage from './images/hostel.png';
import ambulanceImage from './images/ambulance.png';
import mandirImage from './images/temple.png';

const types = {
  hall: {
    type: "hall",
    title: "समाज भवन",
    image: hallImage,
  },
  hostel: {
    type: "hostel",
    title: "समाज छात्रावास",
    image: hostelImage,
  },
  ambulance: {
    type: "ambulance",
    title: "एम्बूलैस सेवा",
    image: ambulanceImage,
  },
  mandir: {
    type: "mandir",
    title: "समाज के मदिर",
    image: mandirImage,
  },
};

const ServiceItem = ({ title, image, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image
      source={image}
      style={styles.image}
    />
    <Text style={styles.itemText}>{title}</Text>
  </TouchableOpacity>
);

const Services = () => {
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const backAction = () => {
      if (selectedType) {
        setSelectedType(null);
        return true; // Prevents default back action
      }
      return false; // Allows default back action
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Cleanup the event listener
  }, [selectedType]);

  const handleServicePress = (type) => {
    setSelectedType(type);
  };


  if (selectedType) {
    return <ServiceTypeList type={types[selectedType]} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>सामाजिक सेवाएं</Text>
      <View style={styles.grid}>
        {Object.values(types).map((service) => (
          <ServiceItem
            key={service.type}
            title={service.title}
            image={service.image}
            onPress={() => handleServicePress(service.type)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e51a4b',
    marginBottom: 15,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 15,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    elevation: 2,
    width: '46%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  itemText: {
    fontSize: 20,
    color: '#e51a4b',
    textAlign: 'center',
    fontWeight: 'semibold',
  },
});

export default Services;