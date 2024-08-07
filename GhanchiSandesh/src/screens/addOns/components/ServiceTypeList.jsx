import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Image, FlatList, RefreshControl, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const ServiceItem = ({ item }) => (
    <View style={styles.itemCard}>
        <Image
            source={{ uri: item.image }}
            style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemInfo}><Text style={styles.label}>संचालन:</Text> {item.management}</Text>
            <Text style={styles.itemInfo}><Text style={styles.label}>पता:</Text> {item.address}</Text>
            <Text style={styles.itemInfo}><Text style={styles.label}>व्यवस्थापक:</Text> {item.established_by}</Text>
            <Text style={styles.itemInfo}><Text style={styles.label}>मोबाइल नं:</Text> {item.number}</Text>
            <Text style={styles.itemInfo}><Text style={styles.label}>अन्य:</Text> {item.other}</Text>
        </View>
    </View>
);

const ServiceTypeList = ({ type }) => {
    const [services, setServices] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchServices = useCallback(async () => {
        try {
            const cachedServices = await AsyncStorage.getItem(`services_${type.type}`);
            if (cachedServices) {
                setServices(JSON.parse(cachedServices));
            }

            const response = await fetch('https://ghanchisandesh.live/get-all-gs-social-services-type', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: type.type }),
            });

            if (response.ok) {
                const data = await response.json();
                setServices(data);
                await AsyncStorage.setItem(`services_${type.type}`, JSON.stringify(data));
            }
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setRefreshing(false);
        }
    }, [type]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        fetchServices();
    }, [fetchServices]);

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer} >
            <Image
                source={type.image}
                style={styles.headerImage}
            />
            </View>
            <Text style={styles.header}>{type.title}</Text>
            <FlatList
                data={services}
                renderItem={({ item }) => <ServiceItem item={item} />}
                keyExtractor={(item) => item._id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    imageContainer: {
        paddingHorizontal: 30,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    headerImage: {
        width: 'auto',
        height: SCREEN_HEIGHT * 0.30,
        resizeMode: 'cover',
        padding: 10,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#e51a4b',
        marginBottom: 10,
        textAlign: 'center',
    },
    itemCard: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 2,
        marginBottom: 10,
        marginHorizontal: 10,
        overflow: 'hidden',
        alignItems: 'center',
        padding: 10,
        gap: 10,
    },
    itemImage: {
        width: '40%',
        aspectRatio: 1,
        resizeMode: 'stretch',
        borderRadius: 5,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e51a4b',
        marginBottom: 5,
    },
    itemInfo: {
        fontSize: 14,
        color: '#333',
        marginBottom: 2,
    },
    label: {
        color: '#e51a4b',
        fontWeight: '600',
    },
});

export default ServiceTypeList;