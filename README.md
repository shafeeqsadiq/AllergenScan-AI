# AllergenScan AI

## Overview

AllergenScan AI is an intelligent AI agent that helps users identify potential allergens in food through advanced image analysis. This AI-powered detection system is designed to give people with food allergies more confidence when eating by providing quick and accurate allergen identification through their smartphone camera.

## Features

- **AI-Powered Food Recognition**: Upload food images for intelligent identification
- **Allergen Analysis Engine**: Autonomously detects common allergens in identified foods
- **Basic Authentication**: Simple login/logout functionality with token persistence
- **Cross-Platform Intelligence**: Works seamlessly on both iOS and Android devices
- **Intelligent User Interface**: Streamlined workflow from image capture to results

## Test the App with Expo Go

The easiest way to test AllergenScan AI is using Expo Go:

1. **Clone the repository and install dependencies**:

   ```bash
   git clone https://github.com/yourusername/SmartFoodAllergyDetective.git
   cd SmartFoodAllergyDetective
   npm install
   ```

2. **Start the Expo development server**:

   ```bash
   npx expo start
   ```

3. **Access the app on your device**:
   - **iOS**: Scan the QR code with your iPhone camera app
   - **Android**: Scan the QR code using the Expo Go app
   - The Expo Go app can be downloaded from the App Store or Google Play

## AI Core

- **Clarifai Neural Network API**: Used for basic food image classification
- **Perplexity AI LLM Integration**: Dynamic allergen identification using sonar-pro model
- **Two-Stage Detection Process**: Sequential API calls for food identification and allergen generation

## Frontend

- React Native (0.76.7)
- Expo SDK 52
- TypeScript
- React Navigation 6
- AsyncStorage for local data persistence
- ImagePicker for camera integration
- Axios for API communication

## Backend

- Node.js REST API
- Express.js server
- Clarifai API integration for AI vision capabilities
- AI-powered allergen identification instead of traditional database integration

## Authentication

- **Simple Token System**: Basic authentication flow with user token persistence
- **Session Management**: Automatic token validation on app launch
- **Logout Functionality**: Complete session termination capability

## Intelligent Agent Workflow

1. **Login**: Secure user authentication
2. **Image Acquisition**: Take or upload a photo of food
3. **AI Vision Analysis**: Clarifai API processes image to identify food items
4. **LLM Allergen Identification**: System queries Perplexity AI (which acts as our Food Allergens database) to generate allergen information for the identified food
5. **Results Display**: User receives list of detected allergens for the identified food

## Screenshots

| Login Screen | Food Detection | Results Screen |
| :----------: | :------------: | :------------: |
|    Login     |  AI Detection  |    Results     |

## Acknowledgments

- Inspired by research from The University of Manchester on food allergen testing
- AI design influenced by existing allergen detection tools like Ally and AllerPal
