// src/screens/HomeScreen.tsx
import { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Image, 
  ActivityIndicator, 
  ScrollView, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';


// For production
const API_BASE = process.env.EXPO_PUBLIC_API_URL || 'https://api-tak2xhbhba-uc.a.run.app';

// For development fallback
// const API_BASE = __DEV__ ? 'http://192.168.1.241:3001' : 'https://us-central1-your-project-id.cloudfunctions.net';


type FoodItem = {
  name: string;
  confidence: number;
};

type AllergenResponse = {
  allergens: string[];
};

export default function HomeScreen() {
  const { logout } = useAuth();
  const [result, setResult] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (!permissionResult.granted) {
        Alert.alert('Permission Required', 'Camera roll access is needed to select photos');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        setImage(result.assets[0].uri);
        processImage(result.assets[0].base64);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const processImage = async (base64: string) => {
    try {
      setLoading(true);
      setResult([]);

      const foodResponse = await axios.post<FoodItem[]>(
        `${API_BASE}/detect-food`,
        { imageBase64: base64 }
      );

      if (!foodResponse.data?.length) {
        throw new Error('No food items detected');
      }

      const allergensResponse = await axios.post<AllergenResponse>(
        `${API_BASE}/check-allergens`,
        { foodName: foodResponse.data[0].name }
      );

      setResult(allergensResponse.data.allergens);

    } catch (error) {
      if (error && typeof error === 'object' && 'isAxiosError' in error) {
        const axiosError = error as { response?: { data?: { error?: string } } };
        setResult([axiosError.response?.data?.error || 'Food detection failed']);
      } else if (error instanceof Error) {
        setResult([error.message]);
      } else {
        setResult(['Unknown error occurred']);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* Upload Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={pickImage}
        >
          <Text style={styles.buttonText}>Upload Food Image</Text>
        </TouchableOpacity>

        {/* Image Preview */}
        {image && (
          <Image 
            source={{ uri: image }} 
            style={styles.image} 
          />
        )}

        {/* Loading Indicator */}
        {loading && (
          <ActivityIndicator 
            size={36} 
            color="#2196F3" 
            style={styles.loader} 
          />
        )}

        {/* Results Display */}
        {result.length > 0 && (
          <View style={styles.resultsContainer}>
            <Text style={styles.sectionTitle}>Detected Allergens:</Text>
            {result.map((allergen, index) => (
              <View key={index} style={styles.allergenItem}>
                <Text style={styles.allergenText}>• {allergen}</Text>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#ff4444',
    paddingVertical: 12,     // Increased
    paddingHorizontal: 20,   // Increased
    borderRadius: 8,
    marginTop: 15,           // Added margin from top
    marginBottom: 20,
    minHeight: 50,           // Larger touch target
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 20,
    backgroundColor: '#e0e0e0',
  },
  loader: {
    marginVertical: 30,
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  allergenItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  allergenText: {
    fontSize: 16,
    color: '#666',
  },
});