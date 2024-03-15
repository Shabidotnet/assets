import React, {useState} from 'react';
import {View, TextInput, Image, Text, ScrollView} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const MySelectInput = ({
  icon,
  title,
  borderColor,
  selectProps,
  options,
  isMultiple,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(options);

  return (
    <View style={{marginBottom: 15}}>
      <ScrollView nestedScrollEnabled={true}>
        <DropDownPicker
          listMode="MODAL"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownDirection="TOP"
          multiple={isMultiple} // Conditionally set the 'multiple' prop
          style={{
            borderColor: borderColor ? borderColor : '#2DC3A1',
            width: '100%',
            height: undefined,
            aspectRatio: 5,
            borderWidth: 2,
          }}
          dropDownContainerStyle={{borderColor: '#2DC3A1', borderWidth: 2}}
          {...selectProps}
        />
      </ScrollView>
    </View>
  );
};

export default MySelectInput;
