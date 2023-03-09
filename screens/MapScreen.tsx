import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');


const ASPECT_RATIO = width / height;
const LATITUDE = 55.4038;
const LONGITUDE = 10.4024;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapScreen extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            markers: [
                {
                    title: 'Det Islamiske Trossamfund på Fyn',
                    coordinates: {
                        latitude: 55.37523,
                        longitude: 10.44082
                    },
                },
                {
                    title: 'Den Tyrkiske Moské I Odense',
                    coordinates: {
                        latitude: 55.41188,
                        longitude: 10.38509
                    },
                },
                {
                    title: 'Tyrkisk Kultur Forening',
                    coordinates: {
                        latitude: 55.31997,
                        longitude: 10.79367
                    },
                },
                {
                    title: 'Masjid Al-Noor',
                    coordinates: {
                        latitude: 55.40683,
                        longitude: 10.38499
                    },
                },
                {
                    title: 'DAWAA center',
                    coordinates: {
                        latitude: 55.41605,
                        longitude: 10.43988
                    },
                },
                {
                    title: 'Dansk-Arabisk Kultur- og Videnskab Forening',
                    coordinates: {
                        latitude: 55.40251,
                        longitude: 10.39263
                    },
                },
                {
                    title: 'Al Thaqalain Center og Kapel (مركز و مصلا الثقلين)',
                    coordinates: {

                        latitude: 55.37797,
                        longitude: 10.41432
                    },
                },
                {
                    title: 'Pakistansk Islamisk Welfare Society',
                    coordinates: {
                        latitude: 55.40681,
                        longitude: 10.38498
                    },
                },
                {
                    title: 'Det Islamiske Trossamfund af Bosniakker I Danmark',
                    coordinates: {
                        latitude: 55.38226,
                        longitude: 10.40948
                    },
                },
                {
                    title: 'Imam Ali Moskeen',
                    coordinates: {
                        latitude: 55.70008,
                        longitude: 12.53184
                    },
                },
                {
                    title: 'Islamisk Kultur Center',
                    coordinates: {
                        latitude: 55.67172,
                        longitude: 12.54859
                    },
                },
                {
                    title: 'Københavns Moské',
                    coordinates: {
                        latitude: 55.64853,
                        longitude: 12.50711
                    },
                },
                {
                    title: 'Masjid Al-Nour moskéen',
                    coordinates: {
                        latitude: 55.68732,
                        longitude: 12.55898
                    },
                },
                {
                    title: 'Imam Malik Instituttet',
                    coordinates: {
                        latitude: 55.64849,
                        longitude: 12.50686
                    },
                },
                {
                    title: 'Helsingør Islamisk Menighed / Helsingør Merve Moské',
                    coordinates: {
                        latitude: 56.01993,
                        longitude: 12.58639
                    },
                },
                {
                    title: 'Vesterbro Moske',
                    coordinates: {
                        latitude: 55.66896,
                        longitude: 12.54195
                    },
                },
                {
                    title: 'Masjid Al-Faruq',
                    coordinates: {
                        latitude: 55.70298,
                        longitude: 12.54441
                    },
                },
                {
                    title: 'Dansk Islamisk Center',
                    coordinates: {
                        latitude: 55.6846,
                        longitude: 12.50974
                    },
                },
                {
                    title: 'Masjid Sunnah',
                    coordinates: {
                        latitude: 55.67266,
                        longitude: 12.55369
                    },
                },
                {
                    title: 'Det Islamiske Trossamfund, Wakf',
                    coordinates: {
                        latitude: 55.70836,
                        longitude: 12.52499
                    },
                },
                {
                    title: 'Det Islamiske Trossamfund af Bosniakker I Danmark',
                    coordinates: {
                        latitude: 55.69741,
                        longitude: 12.54888
                    },
                },
                {
                    title: 'Andre trossamfund',
                    coordinates: {
                        latitude: 55.6742,
                        longitude: 12.57819
                    },
                },
                {
                    title: 'Dansk Islamisk Trossamfund | Danimarka İslam Toplumu',
                    coordinates: {
                        latitude: 55.64069,
                        longitude: 12.46605
                    },
                },
                {
                    title: 'Mosaisk Trossamfund',
                    coordinates: {
                        latitude: 55.68097,
                        longitude: 12.57323
                    },
                },
                {
                    title: 'Aalborg Moské',
                    coordinates: {
                        latitude: 57.03934,
                        longitude: 9.93027
                    },
                },
                {
                    title: 'VEJLE MOSKÉ',
                    coordinates: {
                        latitude: 55.67634,
                        longitude: 9.53445
                    },
                },
                {
                    title: 'Fredens Moské',
                    coordinates: {
                        latitude: 56.16576,
                        longitude: 10.13313
                    },
                },
                {
                    title: 'Iqra kultur forening - Al Iman Moskeé Sønderborg',
                    coordinates: {
                        latitude: 54.91884,
                        longitude: 9.81375
                    },
                },
                {
                    title: 'Esbjerg Anatoliens Cami.',
                    coordinates: {
                        latitude: 55.4758,
                        longitude: 8.46
                    },
                },
                {
                    title: 'Silkeborg Moské',
                    coordinates: {
                        latitude: 56.1915,
                        longitude: 9.55887
                    },
                },
                {
                    title: "Wakf Aarhus, Aisha's mosque",
                    coordinates: {
                        latitude: 56.16423,
                        longitude: 10.12433
                    },
                },
            ]
        }
    }

    render() {
        return (
            <View style={styles.container} accessible>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude: LATITUDE,
                        longitude: LONGITUDE,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}>
                    {this.state.markers.map((marker: { coordinates: { latitude: any; longitude: any; }; title: string | undefined; }) => (
                        <Marker
                            key={marker.coordinates.latitude + marker.coordinates.longitude}
                            coordinate={marker.coordinates}
                            title={marker.title}
                        />
                    ))}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

function useState<T>(arg0: null): [any, any] {
    throw new Error('Function not implemented.');
}
