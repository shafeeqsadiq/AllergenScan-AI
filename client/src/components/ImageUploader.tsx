import { useState } from 'react';
import { Alert, Image, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUploader({ onImageSelected }: { 
  onImageSelected: (base64: string) => void 
}) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async (useCamera: boolean) => {
    try {
      const permission = useCamera 
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert('Permission required', 'We need access to your photos/camera');
        return;
      }

      const result = await (useCamera 
        ? ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            base64: true,
          })
        : ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            base64: true,
          }));

      if (!result.canceled && result.assets[0].base64) {
        setSelectedImage(result.assets[0].uri);
        onImageSelected(result.assets[0].base64);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to select image');
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image 
          source={{ uri: selectedImage }}
          style={styles.image}
        />
      )}
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.galleryButton]}
          onPress={() => pickImage(false)}
        >
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cameraButton]}
          onPress={() => pickImage(true)}
        >
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 256,
    height: 256,
    marginBottom: 20,
    borderRadius: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  galleryButton: {
    backgroundColor: '#3b82f6', // Blue
  },
  cameraButton: {
    backgroundColor: '#10b981', // Green
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});
