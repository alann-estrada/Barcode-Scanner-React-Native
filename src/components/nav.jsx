import { View, Text, TouchableOpacity } from 'react-native';
import { generalStyles } from '../generalStyles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Nav() {
    const navigation = useNavigation();
    return (
        <View style={[generalStyles.backgroundNav, generalStyles.flexRow, generalStyles.justifySpaceAround]}>
            <View style={generalStyles.textContainer}>
                <Text style={[generalStyles.textDefault, generalStyles.paddingDefault, generalStyles.textBold]}>Lector de código de barras</Text>
            </View>
            <TouchableOpacity style={generalStyles.iconContainer} onPress={() => navigation.navigate("Home")}>
                <MaterialCommunityIcons name='barcode-scan' size={24} color='#fff' style={[generalStyles.paddingDefault]} />
            </TouchableOpacity>
        </View>
    )
}