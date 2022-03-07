import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import { Button, Image } from 'native-base';

export const CaptureAGTScreen2 = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePhoto = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          allowEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        setImage(photo);
        console.log(image);
        return photo;
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => takePhoto()}>
              <Text style={styles.text}> Photo </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <View>
          <Image
            source={{
              uri: image.uri,
            }}
            alt="Alternate Text"
            size="xl"
          />
          <Button onPress={() => setImage(null)}>Retake</Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});
