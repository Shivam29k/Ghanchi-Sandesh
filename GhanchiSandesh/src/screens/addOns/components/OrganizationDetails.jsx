import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, BackHandler } from 'react-native';

const OrganizationDetails = ({ orgId, onBack }) => {
  const [org, setOrg] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchOrgDetails = async (id) => {
      try {
        const response = await fetch('https://ghanchisandesh.live/get-gs-social-org-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        setOrg(data.response);
      } catch (error) {
        console.error('Error fetching organization details:', error);
      }
    };

    const fetchOrgImages = async (id) => {
      try {
        const response = await fetch('https://ghanchisandesh.live/get-all-gs-social-org-images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        setImages(data.response.images);
      } catch (error) {
        console.error('Error fetching organization images:', error);
      }
    };

    fetchOrgDetails(orgId);
    fetchOrgImages(orgId);
  }, [orgId]);

  if (!org) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: org.logo }} style={styles.detailLogo} />
      <Text style={styles.detailName}>{org.name}</Text>
      <Text style={styles.detailText}><Text style={styles.label}>अध्यक्ष:</Text> {org.chairman}</Text>
      <Text style={styles.detailText}><Text style={styles.label}>कार्यालय:</Text> {org.address}</Text>
      <Text style={styles.detailText}><Text style={styles.label}>मोबाइल नं:</Text> {org.contact}</Text>
      <Text style={styles.detailText}><Text style={styles.label}>कार्य:</Text> {org.work}</Text>
      {images.map((image, index) => (
        <Image key={index} source={{ uri: image }} style={styles.detailImage} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    flex: 1,
    marginBottom: 10,
  },
  detailLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    borderRadius: 50,
    marginBottom: 10,
  },
  detailName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#e51a4b'
  },
  detailText: {
    fontSize: 18,
    marginBottom: 5,
    paddingHorizontal: 10,
    color: '#333',
  },
  label: {
    color: '#e51a4b',
    fontWeight: '600',
  },
  detailImage: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default OrganizationDetails;
