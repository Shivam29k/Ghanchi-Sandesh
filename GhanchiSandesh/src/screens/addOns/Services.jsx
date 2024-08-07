import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Import all images at the top
import hallImage from './images/hall.png';
import hostelImage from './images/hostel.png';
import ambulanceImage from './images/ambulance.png';
import mandirImage from './images/temple.png';

const ServiceItem = ({ title, image }) => (
    <TouchableOpacity style={styles.item}>
        <Image
            source={image}
            style={styles.image}
        />
        <Text style={styles.itemText}>{title}</Text>
    </TouchableOpacity>
);

const Services = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>सामाजिक सेवाएं</Text>
            <View style={styles.grid}>
                <ServiceItem title="समाज भवन" image={hallImage} />
                <ServiceItem title="समाज छात्रावास" image={hostelImage} />
                <ServiceItem title="एम्बूलैस सेवा" image={ambulanceImage} />
                <ServiceItem title="समाज के मदिर" image={mandirImage} />
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
        width: '46%', // Adjust as needed to fit your layout
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