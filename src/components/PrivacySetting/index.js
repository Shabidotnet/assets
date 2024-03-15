import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Pressable } from 'react-native';
import AppHeader from '../common/header/AppHeader';
import PrimaryButton from '../common/button/PrimaryButton';
const index = ({ navigation }) => {
    const [input1, setInput1] = useState(false);
    const [input2, setInput2] = useState(false);
    const [input3, setInput3] = useState(false);

    const Switch=({check,onPress})=>{
        return (
            <Pressable
            onPress={onPress}
            style={{height:20,width:35,backgroundColor:check?'#3DED97':'gray',borderRadius:12,justifyContent:'center',paddingHorizontal:5,alignItems:check?'flex-start':'flex-end'}}>
                <View style={{height:12,width:12,backgroundColor:'white',borderRadius:18}}/>
            </Pressable>
        )
    }


    return (
        <View style={styles.container}>
            <AppHeader
                title={'Privacy Settings'}
                leftIcon={'left'}
                leftCallback={() => navigation.goBack()}
            />
            <View style={styles.subContainer}>
                <View style={styles.switchView}>
                    <Text style={styles.title}>Notification</Text>
                    <Switch check={input1} onPress={()=>setInput1(!input1)}/>
                </View>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.switchView}>
                    <Text style={styles.title}>{'Location Access'}</Text>
                    <Switch check={input2} onPress={()=>setInput2(!input2)}/>
                </View>
            </View>
            <View style={styles.subContainer}>
                <View style={styles.switchView}>
                    <Text style={styles.title}>{'Display Contact Number'}</Text>
                    <Switch check={input3} onPress={()=>setInput3(!input3)}/>
                </View>
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
        paddingHorizontal: 16,
        paddingTop: 10
    },
    switchView: {
        backgroundColor: '#C5C6D0',
        height: 50,
        width: '100%',
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    title: {
        color: 'gray'
    }
});

export default index;
