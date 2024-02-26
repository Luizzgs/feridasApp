import React, { useEffect, useState } from 'react';
import {ActivityIndicator, Button, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { useCameraPermission, useCameraDevice, Camera } from 'react-native-vision-camera';

const CameraApp = () => {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const [isCameraOpen, setCameraOpen] = useState<boolean>(false);
  


  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }
  , [hasPermission]);

  console.log('hasPermission', hasPermission);

  if (device == null) return <ActivityIndicator />;

  if(!hasPermission){
    return <Text>No permission</Text>
  }
    
  if(!device){
    return <Text>No device</Text>
  }

 
  const openCamera = async () => {
    try {
      // Inicializar a câmera
           // Abrir a câmera
      await Camera;
      setCameraOpen(true);
    } catch (error) {
      console.error('Erro ao abrir a câmera:', error);
    }
  };

  return (    
    <View style={styles.container}>
      {!isCameraOpen ? (
        <View style={styles.content}>
          <Text>Pressione o botão para abrir a câmera</Text>
          <TouchableOpacity onPress={openCamera} style={styles.button}>
            <Text style={styles.buttonText}>Abrir Câmera</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera device={device} style={StyleSheet.absoluteFill} isActive={true}>          
        </Camera>       
        
        
      )}
    </View>
  );
};
    

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});


export default CameraApp;


