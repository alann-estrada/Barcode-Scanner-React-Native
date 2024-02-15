import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Barcode from '@kichiyaki/react-native-barcode-generator';
import QRCode from 'react-native-qrcode-svg';
import Nav from '../components/nav';
import { formatDateTime } from '../helpers/utils/methodDate';
import { generalStyles } from '../generalStyles';

export default function Generator() {
    const route = useRoute();
    const navigation = useNavigation();
    const { code, type, date } = route.params;

    return (
        <>
            <Nav />
            <View style={[generalStyles.container, generalStyles.backgroundDefault, generalStyles.flexCenter]}>
                <View style={generalStyles.flexCenter}>
                    <Text style={[generalStyles.textDefault, generalStyles.paddingDefault, generalStyles.textBold]}>Código generado:</Text>
                </View>
                <View style={[generalStyles.backgroundDefault, generalStyles.widthDefault, generalStyles.flexCenter, generalStyles.marginBottomDefault, generalStyles.marginHorizontalDefault]}>
                    {type === 'QR' ? <QRCode value={code} size={200} backgroundColor="#001524" color='#fff' /> : <Barcode value={code} format="CODE128" text={code} width={3} height={100} background='#001524' lineColor="#fff" textStyle={{ color: "#fff" }} />}
                </View>
                <View style={[generalStyles.flexCenter, generalStyles.gap]}>
                    {type === 'QR' && <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Código: {code}</Text>}
                    <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Tipo: {type}</Text>
                    <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Fecha: {formatDateTime(date)}</Text>
                </View>
                <View style={[generalStyles.flexRow, generalStyles.gap]}>
                    <TouchableOpacity style={[generalStyles.marginTopDefault, generalStyles.paddingDefault, generalStyles.borderRadiusDefault, { backgroundColor: "#ff7d00" }]} onPress={() => navigation.navigate("Home")}>
                        <Text style={[generalStyles.textDefault, generalStyles.textBold]}>Volver</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
