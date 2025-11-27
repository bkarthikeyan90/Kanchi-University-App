import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { apiService } from '../../services/api';

export default function DepartmentDetailScreen() {
  const route = useRoute();
  const { id } = route.params as { id: string };
  const [department, setDepartment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartment();
  }, [id]);

  const loadDepartment = async () => {
    try {
      const data = await apiService.getDepartmentDetail(id);
      setDepartment(data);
    } catch (error) {
      console.error('Error loading department:', error);
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

  if (!department) {
    return (
      <View style={styles.centerContainer}>
        <Text>Department not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{department.name}</Text>
        <Text style={styles.code}>{department.code}</Text>
        {department.description && (
          <Text style={styles.description}>{department.description}</Text>
        )}
        {department.headName && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Head of Department</Text>
            <Text style={styles.headName}>{department.headName}</Text>
            {department.headEmail && (
              <Text style={styles.headContact}>{department.headEmail}</Text>
            )}
            {department.headPhone && (
              <Text style={styles.headContact}>{department.headPhone}</Text>
            )}
          </View>
        )}
        {department.courses && department.courses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Courses</Text>
            {department.courses.map((course: any) => (
              <TouchableOpacity key={course.id} style={styles.courseCard}>
                <Text style={styles.courseName}>{course.name}</Text>
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.courseLevel}>{course.level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {department.faculty && department.faculty.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Faculty</Text>
            {department.faculty.map((faculty: any) => (
              <View key={faculty.id} style={styles.facultyCard}>
                <Text style={styles.facultyName}>{faculty.name}</Text>
                <Text style={styles.facultyDesignation}>{faculty.designation}</Text>
              </View>
            ))}
          </View>
        )}
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
  content: {
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  code: {
    fontSize: 16,
    color: '#6366f1',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  headName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  headContact: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  courseCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  courseCode: {
    fontSize: 14,
    color: '#6366f1',
    marginBottom: 3,
  },
  courseLevel: {
    fontSize: 12,
    color: '#666',
  },
  facultyCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  facultyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  facultyDesignation: {
    fontSize: 14,
    color: '#666',
  },
});

