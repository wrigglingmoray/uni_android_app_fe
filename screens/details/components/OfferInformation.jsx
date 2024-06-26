import React, {useEffect, useState} from "react";
import {ScrollView, Text, View, Image} from "react-native";
import {profileStyles, stockStyles} from "../../../assets/styles/commonStyles";
import ReservationButton from "../../../components/Input/ReservationButton";
import {findOfferTypeKey} from "../../../utils/offerTranslation";
import {offerTypes} from "../../../utils/constants";
import PlaceholderImage from "../../../assets/images/no_pic.png";

const OfferInformation = ({route}) => {
    const [offer, setOffer] = useState(route.params.offer ?? route.params);
    useEffect(() => {
        setOffer(route.params.offer ?? route.params)
    }, [route]);

    const handleCancelReservation = () => {
        console.log('reservation cancelled');
    }

    return (
        <ScrollView style={profileStyles.body}>
            {offer.productPic ? (
                <Image style={stockStyles.imgTemplate} source={{uri: offer.productPic}}/>
            ) : (
                <Image style={stockStyles.imgTemplate} source={PlaceholderImage}/>
            )}
            <View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Titel</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.title}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Kategorie</Text>
                    <Text style={profileStyles.propertyValue}>
                        {findOfferTypeKey(offer.category)}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Quantität</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.quantity}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Art des Angebots</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offerTypes.find(e => e.value === offer.priceType).label}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>{offer.priceType === "TRADE" ? "Tauschwert" : "Preis"}</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.priceType === "TRADE" ? offer.price : offer.price + " €"}
                    </Text>
                </View>
                <View style={profileStyles.detailsContainer}>
                    <Text>Beschreibung</Text>
                    <Text style={profileStyles.propertyValue}>
                        {offer.description}
                    </Text>
                </View>
            </View>

            <ReservationButton offer={offer} onCancel={handleCancelReservation}></ReservationButton>
        </ScrollView>
    )
};
export default OfferInformation;