import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const windowScale = Dimensions.get('window').scale;

const ContactItem = ({
  navigation,
  name,
  setActive,
  unread,
  _id,
  contactActive,
}) => {
  const handleSelectItem = () => {
    setActive();
    navigation.navigate('Chat');
  };

  return (
    <>
      <TouchableOpacity style={styles.contactItem} onPress={handleSelectItem}>
        <View style={styles.contactName}>
          <Icon
            name="person"
            size={32}
            color={'white'}
            style={styles.contactIcon}
          />
          <Text style={styles.contactText}>{name}</Text>
        </View>
        {unread > 0 && (
          <View style={styles.unreadContainer}>
            <Text style={[styles.unreadText, {color: 'white'}]}>
              {unread > 0 ? unread : ''}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: windowHeight * 0.005,
    padding: windowScale * 4,
    backgroundColor: '#E7E7E7',
  },
  contactName: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'purple',
  },
  contactIcon: {
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
  unreadText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  unreadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: windowHeight * 0.007,
    paddingHorizontal: windowWidth * 0.03,
    borderRadius: windowScale * 10,
    backgroundColor: 'red',
  },
});
