import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';

const ContactItem = ({
  navigation,
  name,
  _id,
  setActive,
  contactActive,
  unread,
}) => {
  const handleSelectItem = () => {
    setActive();
    navigation.navigate('Chat');
  };

  return (
    <TouchableOpacity style={styles.contactItem} onPress={handleSelectItem}>
      <Icon
        name="person"
        size={32}
        color={'white'}
        style={styles.contactIcon}
      />
      <Text style={styles.contactText}>{name}</Text>
    </TouchableOpacity>
  );
};

export default ContactItem;

const styles = StyleSheet.create({
  contactItem: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E7E7E7',
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
});
