import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import AppHeader from '../common/header/AppHeader';
import PrimaryButton from '../common/button/PrimaryButton';
const index = ({ navigation }) => {
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');


    return (
        <View style={styles.container}>
            <AppHeader
                title={'Security Settings'}
                leftIcon={'left'}
                leftCallback={() => navigation.goBack()}
            />
            <View style={styles.subContainer}>
                <Text style={styles.label}>{'Update Password'}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Current Password"
                    value={input1}
                    onChangeText={(text) => setInput1(text)}
                    placeholderTextColor={'gray'}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter New Password"
                    value={input2}
                    onChangeText={(text) => setInput2(text)}
                    placeholderTextColor={'gray'}

                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm New Password"
                    value={input3}
                    onChangeText={(text) => setInput3(text)}
                    placeholderTextColor={'gray'}

                />

                <View style={{ flex: 1 }} />
                <PrimaryButton
                    title={'Save'}
                    buttonStyle={{ marginBottom: 20 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1
    },
    subContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10
    },
    input: {
        height: 40,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 10,
        backgroundColor: '#C5C6D0',
        color: 'black'
    },
    label: {
        color: 'black',
        fontSize: 12,
        fontWeight: '700'
    }
});

export default index;
