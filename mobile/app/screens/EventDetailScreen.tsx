import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../../services/api';

export default function EventDetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      const data = await apiService.getEventDetail(id);
      setEvent(data);
    } catch (error) {
      console.error('Error loading event detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.centerContainer}>
        <Text>Event not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {event.imageUrl && (
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#6366f1" />
          <Text style={styles.infoText}>
            {new Date(event.startDate).toLocaleString()}
          </Text>
        </View>
        {event.location && (
          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color="#6366f1" />
            <Text style={styles.infoText}>{event.location}</Text>
          </View>
        )}
        <Text style={styles.body}>{event.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginTop: 15,
  },
});

