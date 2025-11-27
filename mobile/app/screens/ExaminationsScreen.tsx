import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../../services/api';

export default function ExaminationsScreen() {
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      const response = await apiService.getExaminations(true);
      setExams(response.data);
    } catch (error) {
      console.error('Error loading exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const openUrl = (url: string) => {
    if (url) {
      Linking.openURL(url);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      {item.description && (
        <Text style={styles.description}>{item.description}</Text>
      )}
      {item.examDate && (
        <View style={styles.dateRow}>
          <Ionicons name="calendar" size={16} color="#6366f1" />
          <Text style={styles.date}>
            {new Date(item.examDate).toLocaleString()}
          </Text>
        </View>
      )}
      <View style={styles.actions}>
        {item.timetableUrl && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => openUrl(item.timetableUrl)}
          >
            <Ionicons name="document-text" size={16} color="#6366f1" />
            <Text style={styles.actionText}>Timetable</Text>
          </TouchableOpacity>
        )}
        {item.hallTicketUrl && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => openUrl(item.hallTicketUrl)}
          >
            <Ionicons name="ticket" size={16} color="#6366f1" />
            <Text style={styles.actionText}>Hall Ticket</Text>
          </TouchableOpacity>
        )}
        {item.resultsUrl && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => openUrl(item.resultsUrl)}
          >
            <Ionicons name="trophy" size={16} color="#6366f1" />
            <Text style={styles.actionText}>Results</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={styles.emptyText}>No examinations found</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 14,
    color: '#6366f1',
    marginLeft: 5,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

