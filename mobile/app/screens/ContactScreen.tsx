import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

export default function ContactScreen() {
  const contactInfo = {
    phone: '+91-1234567890',
    email: 'info@kanchiuniv.ac.in',
    address: 'Kanchi University, Kanchipuram, Tamil Nadu, India',
    coordinates: {
      latitude: 12.8342,
      longitude: 79.7036,
    },
  };

  const openPhone = () => {
    Linking.openURL(`tel:${contactInfo.phone}`);
  };

  const openEmail = () => {
    Linking.openURL(`mailto:${contactInfo.email}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <TouchableOpacity style={styles.contactItem} onPress={openPhone}>
          <Ionicons name="call" size={24} color="#6366f1" />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Phone</Text>
            <Text style={styles.contactValue}>{contactInfo.phone}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem} onPress={openEmail}>
          <Ionicons name="mail" size={24} color="#6366f1" />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Email</Text>
            <Text style={styles.contactValue}>{contactInfo.email}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.contactItem}>
          <Ionicons name="location" size={24} color="#6366f1" />
          <View style={styles.contactContent}>
            <Text style={styles.contactLabel}>Address</Text>
            <Text style={styles.contactValue}>{contactInfo.address}</Text>
          </View>
        </View>
      </View>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: contactInfo.coordinates.latitude,
            longitude: contactInfo.coordinates.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={contactInfo.coordinates}
            title="Kanchi University"
            description={contactInfo.address}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  contactContent: {
    marginLeft: 15,
    flex: 1,
  },
  contactLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  contactValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  mapContainer: {
    height: 300,
    margin: 15,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

