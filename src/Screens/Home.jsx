import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { CameraView, Camera } from "expo-camera/next";
import { Camera } from 'expo-camera';
import Slider from '@react-native-community/slider';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Nav from '../components/nav';
import { generalStyles } from '../generalStyles';
import { formatDateTimeShort } from '../helpers/utils/methodDate';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const [hasPermission, setHasPermission] = useState(null);
    const [zoom, setZoom] = useState(0);
    // const [flash, setFlash] = useState(false);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [scannedCodes, setScannedCodes] = useState([]);
    const [dateFilter, setDateFilter] = useState(new Date().toISOString());
    const [refreshData, setRefreshData] = useState(false);
    const soundObject = new Audio.Sound();
    const navigation = useNavigation();

    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === "granted");
        };

        const getScannedCodes = async () => {
            try {
                const codes = await AsyncStorage.getItem('scannedCodes');
                if (codes) {
                    console.log(JSON.parse(codes));
                    setScannedCodes(JSON.parse(codes));
                }
            } catch (error) {
                console.error('Error al obtener los códigos escaneados:', error);
            }
        };

        if (refreshData) {
            getScannedCodes();
            setRefreshData(false);
        }
        getCameraPermissions();
        getScannedCodes();
    }, [refreshData]);

    const handleDelete = async (code) => {
        try {
            const newCodes = scannedCodes.filter(item => item.code !== code);
            await AsyncStorage.setItem('scannedCodes', JSON.stringify(newCodes));
            setRefreshData(true);
        } catch (error) {
            console.error('Error al eliminar el código:', error);
        }
    };

    const handleBarCodeScanned = async ({ type, data }) => {
        console.log(type, data);
        const isCodeExists = scannedCodes.some(item => item.code === data);
        if (!isCodeExists) {
            const scanType = type === 256 ? 'QR' : 'Barcode';
            const newCode = { code: data, scanType, scanDate: new Date().toISOString() };
            setScannedCodes(prevCodes => {
                const newCodes = prevCodes ? [...prevCodes, newCode] : [newCode];
                AsyncStorage.setItem('scannedCodes', JSON.stringify(newCodes));
                return newCodes;
            });
        }
        try {
            await soundObject.playAsync();
        } catch (error) {
            console.log(error);
        }
    };

    const Item = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={[
                    generalStyles.flexRow,
                    generalStyles.paddingVerticalDefault,
                    generalStyles.paddingHorizontalDefault,
                    generalStyles.marginBottomDefault,
                    generalStyles.borderRadiusDefault,
                    generalStyles.justifySpaceBetween,
                    generalStyles.gap,
                    {
                        borderBottomColor: index !== scannedCodes.length - 1 ? "#fff" : "transparent",
                        borderBottomWidth: index !== scannedCodes.length - 1 ? 1 : 0
                    }
                ]}
                onPress={() => navigation.navigate("Generator", { code: item.code, type: item.scanType, date: item.scanDate })}
            >
                <View style={[{ width: "60%" }]}>
                    <Text style={[generalStyles.textDefault, generalStyles.textXMedium]}>{item.code}</Text>
                </View>
                <View style={{ alignItems: "flex-end", flexDirection: "row", gap: 10 }}>
                    <View>
                        <Text style={[generalStyles.textDefault, generalStyles.textSmall]}>{formatDateTimeShort(item.scanDate)}</Text>
                        <Text style={[generalStyles.textDefault, generalStyles.textSmall]}>{item.scanType}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(item.code)}>
                        <AntDesign name="delete" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity >
        )
    }

    const toggleFlash = () => {
        setFlash(
            flash === Camera.Constants.FlashMode.off
                ? Camera.Constants.FlashMode.torch
                : Camera.Constants.FlashMode.off
        )
    }

    return (
        <>
            <Nav />
            <View style={[generalStyles.backgroundDefault, generalStyles.container]}>
                <View style={[generalStyles.marginHorizontalDefault, generalStyles.marginTopDefault, { flex: 1 }]}>
                    <View style={[generalStyles.marginBottomDefault, { backgroundColor: "#78290f", borderRadius: 10 }]}>
                        <Camera onBarCodeScanned={handleBarCodeScanned} style={{ width: "100%", height: 300, borderRadius: "10%", overflow: "hidden" }} barcodeScannerSettings={{ barCodeTypes: ["aztec", "code128", "code39", "code93", "dataMatrix", "ean13", "ean8", "interleaved2of5", "itf14", "pdf417", "qr", "upc_e"] }} zoom={zoom} flashMode={flash} />
                        <View style={[generalStyles.flexRow, generalStyles.widthDefault, generalStyles.marginTopDefault, generalStyles.marginBottomDefault]}>
                            <MaterialIcons name={flash ? "flash-on" : "flash-off"} size={24} color='#fff' onPress={toggleFlash} />
                            <AntDesign name='minus' size={24} color='#fff' />
                            <Slider style={{ width: "80%" }} minimumValue={0} maximumValue={1} minimumTrackTintColor="#FFFFFF" maximumTrackTintColor="#000000" onValueChange={(val) => setZoom(val)} />
                            <AntDesign name='plus' size={24} color='#fff' />
                        </View>
                    </View>
                    {hasPermission === null ? (
                        <Text style={[generalStyles.textDefault, generalStyles.textMedium]}>Solicitando permiso para usar la cámara</Text>
                    ) : hasPermission === false ? (
                        <Text style={[generalStyles.textDefault, generalStyles.textMedium]}>No se puede acceder a la cámara</Text>
                    ) : null}
                    <ScrollView style={{ flex: 1 }}>
                        <View>
                            <Text style={[{ color: "#1bc155" }, generalStyles.textXMedium]}>Últimos Códigos Escaneados:</Text>
                            <View style={[generalStyles.flexRow, generalStyles.justifySpaceAround, generalStyles.marginBottomDefault]}>
                                <TouchableOpacity style={[generalStyles.marginTopDefault, generalStyles.paddingDefault, generalStyles.borderRadiusDefault, { backgroundColor: "#1bc155" }]} onPress={() => navigation.navigate("Creator")}>
                                    <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Crear código</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[generalStyles.marginTopDefault, generalStyles.paddingDefault, generalStyles.borderRadiusDefault, { backgroundColor: "#ff7d00" }]} onPress={() => setRefreshData(true)}>
                                    <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Actualizar</Text>
                                </TouchableOpacity>

                            </View>
                            {scannedCodes.length > 0 && <Text style={[generalStyles.textDefault, generalStyles.textMedium]}>Códigos escaneados: {scannedCodes.length}</Text>}
                            {scannedCodes.length > 0 && Array.isArray(scannedCodes) && scannedCodes.map((item, index) => <Item item={item} index={index} key={index} />)}
                            {scannedCodes.length === 0 && (
                                <View style={[generalStyles.flexCenter, generalStyles.marginTopDefault]}>
                                    <Text style={[generalStyles.textDefault, generalStyles.textXMedium]}>No pudimos recuperar tus codigos guardados</Text>
                                    <Image source={require("../../assets/Image/notCodes.png")} style={{ width: "50%", height: 200, alignSelf: "center" }} />
                                    <Text style={[generalStyles.textDefault, generalStyles.textXMedium]}>Escanea o crea un código para verlo aquí</Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={[generalStyles.textDefault, generalStyles.textSmall]}>Desarrollado por: <Text style={[generalStyles.textBold]}>Alann Estrada</Text></Text>
                    </View>
                </View>
            </View>
        </>
    );
}
