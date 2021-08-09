import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
const [selectedImage, setSelectedImage] = React.useState(null);

const testscreen = () => {


    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: selectedImage.localUri }}
                    style={styles.thumbnail}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Our logo, instructions, and picker button are hidden here to keep the example brief */}
        </View>
    );
}


export default testscreen

const styles = StyleSheet.create({
    /* Other styles hidden to keep the example brief... */
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    }
});
