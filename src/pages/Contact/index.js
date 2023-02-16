import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {Icon} from 'react-native-elements';

const Contact = ({navigation}) => {
  const [contactID, setContactID] = useState('');

  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Chats</Text>
          <Text style={styles.textHeaderSecondary}>Welcome, Ikhsan</Text>
        </View>
        <View style={styles.inputBody}>
          <KeyboardAvoidingView style={styles.inputGroup}>
            <Icon
              name="person-add-alt"
              size={20}
              color={'grey'}
              style={styles.addIcon}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Insert username..."
              placeholderTextColor={'grey'}
              value={contactID}
              onChangeText={text => setContactID(text)}
            />
          </KeyboardAvoidingView>
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.buttonAddText}>Add</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contactBody}>
          <View style={styles.contactList}>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => navigation.navigate('Chat')}>
              <View style={styles.contactIconOverlay}>
                <Icon
                  name="person"
                  size={32}
                  color={'white'}
                  style={styles.contactIcon}
                />
              </View>
              <Text style={styles.contactText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.buttonLogOut}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonLogOutText}>LOG OUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: '100%',
    maxWidth: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: '#FFFFFF',
    // borderColor: 'purple',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'auto',
    paddingVertical: 10,
    // borderColor: 'purple',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  textHeader: {fontSize: 36, fontWeight: 'bold'},
  textHeaderSecondary: {fontSize: 18},
  inputBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid',
  },
  inputGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#8D8D8D',
    borderWidth: 2,
    borderStyle: 'solid',
    marginRight: 5,
  },
  addIcon: {
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  textInput: {
    height: 30,
    width: '80%',
    maxWidth: '75%',
    paddingVertical: 5,
    color: 'black',
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
  },
  buttonAdd: {
    marginLeft: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#1C94F7',
    borderRadius: 10,
  },
  buttonAddText: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  buttonLogOut: {
    width: '30%',
    alignSelf: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
  },
  buttonLogOutText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
  },
  contactBody: {
    flexDirection: 'column',
    marginVertical: 10,
    borderTopColor: '#8D8D8D',
    borderTopWidth: 4,
    borderBottomColor: '#8D8D8D',
    borderBottomWidth: 4,
  },
  contactList: {
    minHeight: '80%',
    maxHeight: '100%',
    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
  },
  contactItem: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
  },
  contactIconOverlay: {
    padding: 5,
    backgroundColor: '#1C94F7',
    borderWidth: 0,
    borderStyle: 'solid',
    borderRadius: 20,
  },
  contactText: {
    paddingLeft: 20,
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Contact;
