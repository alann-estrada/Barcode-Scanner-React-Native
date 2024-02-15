import React, { useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Nav from "../components/nav";
import { generalStyles } from "../generalStyles";
import { useNavigation } from "@react-navigation/native";

export default function Creator() {
    const [text, setText] = useState('');
    const [type, setType] = useState('QR');
    const navigation = useNavigation();

    const handleCreateCode = async () => {
        if (text) {
            try {
                let codes = await AsyncStorage.getItem('scannedCodes');
                if (codes) {
                    codes = JSON.parse(codes);
                    await AsyncStorage.setItem('scannedCodes', JSON.stringify([...codes, { code: text, scanType: type, scanDate: new Date().toISOString() }]));
                } else {
                    await AsyncStorage.setItem('scannedCodes', JSON.stringify([{ code: text, scanType: type, scanDate: new Date().toISOString() }]));
                }
                navigation.navigate('Generator', { code: text, type: type, date: new Date().toISOString() });
            } catch (e) {
                console.log(e);
            }
        } else {
            alert('Debes ingresar un texto');
        }
    }

    return (
        <>
            <Nav />
            <View style={[generalStyles.container, generalStyles.backgroundDefault]}>
                <View style={generalStyles.flexCenter}>
                    <Text style={[generalStyles.textDefault, generalStyles.paddingDefault, generalStyles.textBold]}>Creador de códigos</Text>
                    <Text style={[generalStyles.textDefault, generalStyles.paddingDefault]}>Crea códigos QR y de barras para tus productos, servicios o lo que necesites.</Text>
                    <View style={[generalStyles.flexRow, generalStyles.gap]}>
                        <TouchableOpacity style={[generalStyles.marginTopDefault, generalStyles.paddingDefault, generalStyles.borderRadiusDefault, { backgroundColor: "#ff7d00" }]} onPress={() => setType("QR")}>
                            <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Código QR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[generalStyles.marginTopDefault, generalStyles.paddingDefault, generalStyles.borderRadiusDefault, { backgroundColor: "#ff7d00" }]} onPress={() => setType("BarCode")}>
                            <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Código de barras</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[generalStyles.flexRow, generalStyles.gap]}>
                        <Text style={[generalStyles.textDefault, generalStyles.paddingDefault, generalStyles.textBold]}>Tipo: {type}</Text>
                    </View>
                    <TextInput style={[generalStyles.paddingDefault, generalStyles.borderRadiusDefault, generalStyles.textDefault, generalStyles.textBold, generalStyles.marginTopDefault, generalStyles.marginBottomDefault, { width: "90%", backgroundColor: "#f3f3f3", color: "#000" }]} placeholder="Escribe el texto que deseas convertir en código" onChangeText={(text) => setText(text)} />
                    <View style={[generalStyles.flexRow, generalStyles.gap]}>
                        <TouchableOpacity style={[generalStyles.marginTopDefault, generalStyles.paddingDefault, generalStyles.borderRadiusDefault, { backgroundColor: "#ff7d00" }]} onPress={handleCreateCode}>
                            <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Generar código</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[generalStyles.marginTopDefault, generalStyles.paddingDefault, generalStyles.borderRadiusDefault, { backgroundColor: "#78290f" }]} onPress={() => navigation.navigate('Home')}>
                            <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View >
        </>
    );
}
