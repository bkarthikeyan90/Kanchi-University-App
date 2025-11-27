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
import { apiService } from '../../services/api';

export default function NewsDetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [news, setNews] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, [id]);

  const loadNews = async () => {
    try {
      const data = await apiService.getNewsDetail(id);
      setNews(data);
    } catch (error) {
      console.error('Error loading news detail:', error);
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

  if (!news) {
    return (
      <View style={styles.centerContainer}>
        <Text>News not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {news.imageUrl && (
        <Image source={{ uri: news.imageUrl }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{news.title}</Text>
        <View style={styles.meta}>
          <Text style={styles.date}>
            {new Date(news.publishedAt || news.createdAt).toLocaleDateString()}
          </Text>
          {news.category && (
            <View style={styles.category}>
              <Text style={styles.categoryText}>{news.category}</Text>
            </View>
          )}
        </View>
        <Text style={styles.body}>{news.content}</Text>
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
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  category: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 5,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});

