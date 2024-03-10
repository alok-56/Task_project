import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const ImageDetails = ({route}) => {
  const {image} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedDocument(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Document picking cancelled');
      } else {
        console.error('Error picking document:', err);
      }
    }
  };

  const handleSubmission = () => {
    if (!firstName || !lastName || !email || !phone) {
      alert('Please fill in all fields.');
      return;
    }

    const userFormData = new FormData();
    userFormData.append('first_name', firstName);
    userFormData.append('last_name', lastName);
    userFormData.append('email', email);
    userFormData.append('phone', phone);
    if (selectedDocument) {
      userFormData.append('user_image', {
        uri: selectedDocument[0].uri,
        type: selectedDocument[0].type,
        name: selectedDocument[0].name,
      });
    }

    fetch('http://dev3.xicom.us/xttest/savedata.php', {
      method: 'POST',
      body: userFormData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => response.json())
      .then(data => {
        alert('Data saved successfully');
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {selectedDocument ? (
        <Image source={selectedDocument} style={styles.image} />
      ) : (
        <Image source={{uri: `${image}`}} style={styles.image} />
      )}

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={text => setPhone(text)}
        keyboardType="phone-pad"
      />

      {/* Button for picking a document */}
      {!selectedDocument && (
        <TouchableOpacity
          onPress={handleDocumentPick}
          style={styles.documentPickerButton}>
          <Text style={styles.documentPickerButtonText}>Pick Image</Text>
        </TouchableOpacity>
      )}

      {/* Display the selected document information */}
      {selectedDocument && (
        <View style={styles.selectedDocumentContainer}>
          <Text style={styles.selectedDocumentText}>Selected Document:</Text>
          <Text>{selectedDocument[0].name}</Text>
        </View>
      )}

      {/* Submit Form button */}
      <TouchableOpacity onPress={handleSubmission} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit Form</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 8,
  },
  documentPickerButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  documentPickerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedDocumentContainer: {
    marginTop: 10,
  },
  selectedDocumentText: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  submitButton: {
    width: '90%',
    alignSelf: 'center',
    height: 40,
    backgroundColor: 'aqua',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ImageDetails;
