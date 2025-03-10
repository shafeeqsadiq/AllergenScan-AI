// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

// Updated credentials as requested
const VALID_USERNAME = "shafeeq";
const VALID_PASSWORD = "pass1234";

export default function LoginScreen() {
  const { login } = useAuth();
  const [username, setUsername] = useState(''); // Empty to start
  const [password, setPassword] = useState(''); // Empty to start
  const [isLoading, setIsLoading] = useState(false);
  const [showHint, setShowHint] = useState(false); // To control hint visibility
  
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check against hardcoded credentials
      if (username === VALID_USERNAME && password === VALID_PASSWORD) {
        await login('user-auth-token-123');
      } else {
        Alert.alert('Login Failed', 'Invalid username or password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Allergen Scan AI</Text>
      
      <Text style={styles.description}>AI-powered food allergen detector</Text>

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
      
      {/* Hint Toggle Button */}
      <TouchableOpacity
        onPress={() => setShowHint(!showHint)}
        style={styles.hintToggle}
      >
        <Text style={styles.hintToggleText}>
          {showHint ? 'Hide' : 'Credentials'}
        </Text>
      </TouchableOpacity>
      
      {/* Hint Text */}
      {showHint && (
        <Text style={styles.hint}>
          Username is "shafeeq" and password is "pass1234"
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,  // Add space after the description
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  hintToggle: {
    marginTop: 15,
    alignItems: 'center',
  },
  hintToggleText: {
    color: '#2196F3',
    fontSize: 14,
  },
  hint: {
    marginTop: 8,
    textAlign: 'center',
    color: '#888',
    fontSize: 14,
    padding: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 5,
  }
});
