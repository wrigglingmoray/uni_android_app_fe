import {Alert, ScrollView, Text, TouchableOpacity, View, Dimensions} from "react-native";
import React, {useEffect, useState} from "react";
import {authentificationStyles, profileStyles, stockStyles} from "../../assets/styles/commonStyles";
import {useAuth} from "../../context/AuthContext";
import LoadingMsg from "../../components/LoadingMsg";
import MyOffer from "../../components/Offer/MyOffer";
import EmptyState from "../../components/EmptyState";
import {useFocusEffect, useNavigation, useRoute} from "@react-navigation/native";
import {sortByAttribute} from "../../utils/sortUtil";

const StockScreen = () => {
    const {onGetMyOffers, onLogout} = useAuth();
    const [offerList, setOfferList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [offerListHeight, setOfferListHeight] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    //const windowHeight = Dimensions.get("window").height;

    const navigation = useNavigation();
    const route = useRoute();
    let {filterParams, sortOptions} = route.params;

    useEffect(() => {
        if (!!sortOptions) {
            const sortedArray = sortByAttribute(offerList, sortOptions.sortBy, sortOptions.direction);
            setOfferList(sortedArray);
        }
    }, [sortOptions]);

    useEffect(() => {
        if (!!filterParams) {
            loadMyOffers();
        }
    }, [filterParams]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadMyOffers();
        })
        return unsubscribe;
    }, [navigation]);

    const loadMyOffers = async () => {
        const result = await onGetMyOffers(filterParams);
        if (result && result.error) {
            if (['403', '500'].includes(result.status.toString())) {
                onLogout();
                Alert.alert("Login", "Login abgelaufen.")
            } else if (result.status.toString() === '406') {
                navigation.navigate("Mein Profil");
                Alert.alert("Fehler", "Standort im Profil nicht gesetzt!");
            } else {
                Alert.alert(result.status, result.msg);
            }
        } else {
            setOfferList(result.data);
            setIsLoading(false);
        }
    };

    return (
        <View
            style={profileStyles.container}
            onLayout={(event) => setWindowHeight(event.nativeEvent.layout.height)}
        >
            {isLoading
                ? <LoadingMsg/>
                : (offerList && offerList.length === 0
                        ? (<EmptyState message={"Noch keine Angebote erstellt"}></EmptyState>)
                        : (
                            <ScrollView>
                                <View
                                    onLayout={(event) => setOfferListHeight(event.nativeEvent.layout.height)}
                                    style={stockStyles.listContainer}
                                >
                                    {offerList.map((item) => (
                                        <MyOffer
                                            key={item.offerId}
                                            offer={item}
                                            navigation={navigation}
                                        />
                                    ))}
                                </View>
                                {(offerListHeight / windowHeight) > 0.7 &&
                                    <View style={stockStyles.btnContainer}>
                                        <TouchableOpacity
                                            style={stockStyles.button}
                                            onPress={() => navigation.navigate('Neues Angebot')}
                                        >
                                            <Text style={authentificationStyles.buttonText}>Neues Angebot</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </ScrollView>
                        )
                )
            }
            {(offerListHeight / windowHeight) < 0.7 &&
                <View style={stockStyles.btnContainerFixed}>
                    <TouchableOpacity
                        style={stockStyles.button}
                        onPress={() => navigation.navigate('Neues Angebot')}
                    >
                        <Text style={authentificationStyles.buttonText}>Neues Angebot</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}

export default StockScreen;