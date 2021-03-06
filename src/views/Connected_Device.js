import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  Image,
  ToastAndroid,
} from 'react-native';

import AccessoryItem from '../components/AccessoryItem';
//import ProgressCircle from 'react-native-progress-circle';
import CircularProgress from 'react-native-circular-progress-indicator';

import {Component} from 'react/cjs/react.production.min';
import hot_bg_img from '../images/background_img/hot_bg_img.png';
import cold_bg_img from '../images/background_img/login_background.png';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import freezing_img from '../images/weather_img/freezing_cold.jpg';
import cold_img from '../images/weather_img/cold.jpg';
import cool_img from '../images/weather_img/cool.jpg';
import warm_img from '../images/weather_img/warm.jpg';
import hot_img from '../images/weather_img/hot.jpg';
import burning_img from '../images/weather_img/burning_hot.jpg';

import facemask from '../images/accessory_img/facemask.jpg';
import sundress from '../images/accessory_img/sundress.jpg';
import sunscreen from '../images/accessory_img/sun_scream.jpg';
import sunglasses from '../images/accessory_img/sunglasses.jpg';

import golf from '../images/accessory_img/golf.jpg';
import camera from '../images/accessory_img/camera.jpg';
import sport_clothes from '../images/accessory_img/sport_clothes.jpg';
import fashion_clothes from '../images/accessory_img/fashion_clothes.jpg';

import sweater from '../images/accessory_img/sweater.jpg';
import sock_gloves from '../images/accessory_img/sock_gloves.jpg';
import scarf from '../images/accessory_img/scarf.jpg';
import snow_shoes from '../images/accessory_img/snow_shoes.jpg';

import axios from '../api';
import PushNotification from 'react-native-push-notification';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function ConnectedDevice({navigation}) {
  const [greet, setGreet] = useState();
  const [sensorData, setSensorData] = useState({
    temp: 0,
    humid: 0,
    uv: 0,
    light: 0,
  });

  // call api
  const getSensorInformation = async () => {
    try {
      const {data} = await axios.get('/sensor/detail', {});
      if (data.success) {
        setSensorData({
          temp: data.info.temp[0].celcius,
          humid: data.info.humid[0].humidity,
          uv: data.info.light[0].uv,
          light: data.info.light[0].light,
        });
        ToastAndroid.showWithGravity(
          'Get Info Successfully!',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }
    } catch (e) {
      console.error(e);
      ToastAndroid.showWithGravity(
        'Get Info Failed!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
    }
  };

  // const createChannel = () => {
  //   PushNotification.createChannel({
  //     channelId: '1',
  //     channelName: 'Get sensor data',
  //   });
  // };

  const handleNotification = ({temp, humid, uv, light}) => {
    PushNotification.cancelAllLocalNotifications();
    PushNotification.localNotification({
      channelId: '1',
      ticker: 'Get sensor data successfully!',
      bigText: `T=${temp}??C, H=${humid}%, UV=${uv}, L=${light}`,
    });
  };

  const getFeelingByTemp = temp => {
    if (temp < 25)
      return {
        title: 'Tr???i h??m nay kh?? l???nh ????',
        ad_title: 'Tr???i kh?? l???nh',
      };
    if (temp < 30)
      return {
        title: 'Nhi???t ????? ho??n h???o ????? ra ngo??i',
        ad_title: 'Th???i ti???t ?????p',
      };
    if (temp < 35)
      return {title: 'Tr???i h??m nay kh?? n??ng ????', ad_title: 'Tr???i kh?? n??ng'};
    if (temp < 40)
      return {title: 'Tr???i r???t n??ng, h??y c???n th???n!', ad_title: 'Tr???i r???t n??ng'};
  };

  const getFeeling = temp => {
    if (temp < 15)
      return {
        title: 'Freezing Cold',
        image: {
          uri: 'https://i.pinimg.com/564x/8d/2d/a9/8d2da973662e2275c83f0c53e475fa70.jpg',
        },
        msg: 'T???t h??n h???t l?? b???n n??n ??? trong nh?? v?? s??? d???ng l?? s?????i (kh??ng n??n s??? d???ng s?????i b???ng than), m???c qu???n ??o gi??? ???m c?? th??? .  U???ng nhi???u n?????c ???m. N???u c???n ra ngo??i b???n n??n m???c ??o qu???n d??y v?? mang theo c??c d???ng c??? ch???ng tr??n tr?????t (c?? th??? c?? tuy???t).',
      };
    if (temp >= 15 && temp <= 20)
      return {
        title: 'Cold',
        image: {
          uri: 'https://i.pinimg.com/564x/8d/2d/a9/8d2da973662e2275c83f0c53e475fa70.jpg',
        },
        msg: 'B???n n??n s??? d???ng l?? s?????i khi ??? nh?? (kh??ng n??n s??? d???ng s?????i b???ng than), m???c qu???n ??o gi??? ???m c?? th???. Ra ngo??i tr???i b???n n??n m???c th??m ??o d??y, g??ng tay v?? cho??ng len. U???ng nhi???u n?????c ???m.',
      };
    if (temp > 20 && temp <= 25)
      return {
        title: 'Cool',
        image: {
          uri: 'https://i.pinimg.com/564x/58/16/76/5816764c8263592980816f911e6540d0.jpg',
        },
        msg: 'Th???i ti???t m??t m??? v?? d??? ch???u. B???n n??n ra ngo??i tr???i v???n ?????ng, l??m vi???c ho???c vui ch??i thay v?? n???m ng??? c??? ng??y ??? nh??.',
      };
    if (temp > 25 && temp <= 35)
      return {
        title: 'Warm',
        image: {
          uri: 'https://i.pinimg.com/564x/0f/1f/07/0f1f0735d1180ea44839191fbd20e2f2.jpg',
        },
        msg: 'Th???i ti???t kh?? ph?? h???p v???i vi???c ho???t ?????ng ngo??i tr???i c??ng nh?? trong nh??. Tuy nhi??n b???n c??ng c???n b??? sung n?????c v?? th???c ??n, th???c u???ng gi???i nhi???t cho c?? th??? (ph??ng khi ho???t ?????ng ho???c ??? ngo??i tr???i qu?? l??u).',
      };
    if (temp > 35 && temp < 40)
      return {
        title: 'Kinda Hot',
        image: {
          uri: 'https://i.pinimg.com/564x/c5/24/59/c52459c8bea20f1f31de8a7b59a75915.jpg',
        },
        msg: 'Nhi???t ????? cao khi???n c?? th??? d??? b??? m???t n?????c. B???n n??n ??? nh?? tr??nh n??ng ho???c ??? nh???ng n??i ??i???u h??a kh?? h???u, u???ng nhi???u n?????c v?? vitamin C t??ng s???c ????? kh??ng cho c?? th???. Tr??nh ti???p x??c tr???c ti???p v???i ??nh n???ng m???t tr???i.',
      };
    if (temp >= 40)
      return {
        title: 'Burning Hot',
        image: {
          uri: 'https://i.pinimg.com/564x/cd/95/6e/cd956ebaa10e2d6a6779e2db942d6ec3.jpg',
        },
        msg: 'C??? g???ng t??m n??i tr??nh n??ng. Th???i ti???t kh??ng th??ch h???p ????? ??i ra ngo??i nhi???u, tr??nh ti???p x??c v???i ??nh n???ng m???t tr???i qu?? l??u. B??? sung th??m nhi???u n?????c v?? vitaminC cho c?? th???. .',
      };
    else
      return {
        title: 'Feeling Here',
        image: cold_img,
        msg: 'Ch??c b???n may m???n.',
      };
  };

  useEffect(() => {
    findGreet();
    //getUserInformation();
    getSensorInformation();
    const timeOutId = setTimeout(() => {
      getSensorInformation();
    }, 60000);

    return () => clearTimeout(timeOutId);
  }, []);

  // Set the greeting by hours
  const findGreet = () => {
    const hours = new Date().getHours();
    if (hours === 0 || hours < 12) return setGreet('bu???i s??ng');
    if (hours === 12 || hours < 18) return setGreet('bu???i chi???u');
    else return setGreet('bu???i t???i');
  };

  const [hot_accessory, setHotAccessory] = useState([
    {
      name: 'Kh???u trang ch???ng n???ng & UV',
      image: facemask,
      detail: 'B???o v??? khu??n m???t c???a b???n kh???i ??nh n???ng tr???c ti???p m???t tr???i.',
      id: '1',
    },
    {
      name: 'V??y ch???ng n???ng',
      image: sundress,
      detail:
        'B???o v??? ch??n b???n kh???i n???ng n??ng, ti???n l???i cho ng?????i th?????ng xuy??n di chuy???n b???ng xe m??y.',
      id: '2',
    },
    {
      name: 'Kem ch???ng n???ng',
      image: sunscreen,
      detail:
        'B???o v??? da b???n kh???i n???ng n??ng, tia UV, ch???ng kh?? da, d?????ng tr???ng...',
      id: '3',
    },
    {
      name: 'K??nh r??m',
      image: sunglasses,
      detail:
        'B???o v??? ????i m???t c???a b???n kh???i s??? ti???p x??c tr???c ti???p v???i ??nh n???ng m???t tr???i, tia UV, kh??i b???i,...',
      id: '4',
    },
  ]);
  const [comfort_accessory, setComfortAccessory] = useState([
    {
      name: 'Qu???n ??o th??? thao',
      image: sport_clothes,
      detail: 'Ph?? h???p cho c??c ho???t ?????ng th??? d???c th??? thao ngo??i tr???i.',
      id: '1',
    },
    {
      name: 'B??? g???y Golf',
      image: golf,
      detail: 'Ngo??i ra c??n c?? th??? ch??i c???u l??ng, ???? b??ng, b??i l???i,...',
      id: '2',
    },
    {
      name: 'Qu???n ??o th???i trang',
      image: fashion_clothes,
      detail:
        'S??? th??ch h???p cho nh???ng chuy???n du l???ch hay th??m v??o album c???a b???n nh???ng chi???c ???nh chanh s??? v??o ng??y ?????p tr???i.',
      id: '3',
    },
    {
      name: 'M??y ???nh',
      image: camera,
      detail: 'C??ng c??? kh??ng th??? thi???u khi b???n mu???n c?? m???t b??? ???nh xinh ?????p. ',
      id: '4',
    },
  ]);
  const [cold_accessory, setColdAccessory] = useState([
    {
      name: '??o len, ??o kho??c d??y',
      image: sweater,
      detail: 'Gi??? ???m cho c?? th??? b???n. ',
      id: '1',
    },
    {
      name: 'B??t t???t, g??ng tay',
      image: sock_gloves,
      detail: 'Gi??p tay ch??n kh??ng b??? l???nh c??ng c??? khi ??? nh?? v?? ra ngo??i tr???i.',
      id: '2',
    },
    {
      name: 'Kh??n qu??ng c???',
      image: scarf,
      detail:
        'Ph??? ki???n gi??? ???m c?? th??? ??i k??m v???i qu???n ??o m??a ????ng. Ngo??i ra c??n c?? m?? len, ch???p tai,...',
      id: '3',
    },
    {
      name: 'Gi??y ??i tuy???t',
      image: snow_shoes,
      detail:
        'Gi??y ??i tuy???t s??? c???n thi???t khi b???n c???n ra ngo??i khi tr???i c?? tuy???t. ',
      id: '4',
    },
  ]);

  // Set accessories by temperature
  const getAccessory = temp => {
    if (temp < 15)
      return cold_accessory.map(item => (
        <AccessoryItem
          item={item}
          image={item.image}
          detail={item.detail}
          key={item.id}
        />
      ));
    if (temp >= 15 && temp <= 20)
      return cold_accessory.map(item => (
        <AccessoryItem
          item={item}
          image={item.image}
          detail={item.detail}
          key={item.id}
        />
      ));
    if (temp > 20 && temp <= 26)
      return comfort_accessory.map(item => (
        <AccessoryItem
          item={item}
          image={item.image}
          detail={item.detail}
          key={item.id}
        />
      ));
    if (temp > 26 && temp <= 34)
      return comfort_accessory.map(item => (
        <AccessoryItem
          item={item}
          image={item.image}
          detail={item.detail}
          key={item.id}
        />
      ));
    if (temp > 34 && temp < 50)
      return hot_accessory.map(item => (
        <AccessoryItem
          item={item}
          image={item.image}
          detail={item.detail}
          key={item.id}
        />
      ));
    if (temp >= 50)
      return hot_accessory.map(item => (
        <AccessoryItem
          item={item}
          image={item.image}
          detail={item.detail}
          key={item.id}
        />
      ));
    else
      return cold_accessory.map(item => (
        <AccessoryItem
          item={item}
          image={item.image}
          detail={item.detail}
          key={item.id}
        />
      ));
  };

  // const getBackground = temp => {
  //   if (temp <= 30)
  //     return {uri: 'https://wallpaperaccess.com/full/2443178.jpg'};
  //   else if (temp > 30) return hot_bg_img;
  //   else return cold_bg_img;
  // };

  return (
    <ImageBackground
      style={styles.background}
      source={{
        uri: 'https://i.pinimg.com/236x/c1/d2/ec/c1d2ec676e3dccdc8719f9bc9161be88.jpg',
      }}
      //resizeMode="stretch"
    >
      <SafeAreaView style={styles.container}>
        <ScrollView nestedScrollEnabled={true}>
          {/* greeting to user */}
          <View style={styles.greetingView}>
            <Image
              style={styles.avatar}
              source={{
                uri: 'https://avatars.githubusercontent.com/u/59441604?v=4',
              }}
            />
            <Text style={styles.greeting}>{` Xin ch??o ${greet}, `}</Text>
            <Text style={styles.fullname}>Duy T??ng</Text>
          </View>
          <View style={styles.childContainer}>
            {/* temperature */}
            <View style={styles.progressCircleView}>
              <CircularProgress
                value={sensorData?.temp}
                maxValue={40}
                valueSuffix={'??C'}
                progressValueStyle={{fontSize: 26, fontWeight: '700'}}
                titleColor={'#424B5A'}
                radius={105}
                progressValueColor={'#424B5A'}
                inActiveStrokeOpacity={0.5}
                inActiveStrokeWidth={30}
                activeStrokeWidth={20}
                activeStrokeColor={'#424B5A'}
                activeStrokeSecondaryColor={'#990000'}
              />
            </View>

            {/* feeling by temp */}
            <Text style={styles.feeling}>{`${
              getFeelingByTemp(sensorData?.temp).title
            }`}</Text>

            {/* button navigates view_detail screen */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                getSensorInformation(),
                  handleNotification(
                    sensorData?.temp,
                    sensorData?.humid,
                    sensorData?.uv,
                    sensorData?.light,
                  );
              }}>
              <Text style={styles.buttonName}>refresh d??? li???u</Text>
            </TouchableOpacity>

            {/* info about the weather */}
            <View style={styles.infoView}>
              <Text style={styles.infoTitle}>{`${
                getFeelingByTemp(sensorData?.temp).ad_title
              }`}</Text>
              <Image
                style={styles.infoImage}
                source={getFeeling(sensorData?.temp).image}
              />
              <Text style={styles.infoContent}>{`${
                getFeeling(sensorData?.temp).msg
              }`}</Text>
            </View>

            {/* accessories for weather */}
            <Text style={styles.accessoryTitle}>Ph??? ki???n h??m nay cho b???n</Text>
            <SafeAreaView style={styles.square}>
              {getAccessory(sensorData?.temp)}
            </SafeAreaView>
          </View>
        </ScrollView>

        {/* navigation_bottom_bar */}
        <View style={styles.navigationBar}>
          <TouchableOpacity
            style={styles.navigationIcon}
            onPress={() => navigation.navigate('UnconnectedDevice')}>
            <MaterialCommunityIcons
              name="text-box-search-outline"
              size={35}
              resizeMode={'center'}
              color={'rgba(0,0,0,0.6)'}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navigationIcon}
            onPress={() => navigation.navigate('Login')}>
            <MaterialIcons
              name="logout"
              size={35}
              resizeMode={'center'}
              color={'rgba(0,0,0,0.6)'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationIcon}
            onPress={() => navigation.navigate('ConnectedDevice')}>
            <Feather
              name="home"
              size={47}
              resizeMode={'center'}
              color={'rgba(0,0,0,1)'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationIcon}
            onPress={() => navigation.navigate('ViewDetail')}>
            <MaterialCommunityIcons
              name="link-variant"
              size={35}
              resizeMode={'center'}
              color={'rgba(0,0,0,0.6)'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationIcon}
            onPress={() => navigation.navigate('Credits')}>
            <AntDesign
              name="user"
              size={35}
              resizeMode={'center'}
              color={'rgba(0,0,0,0.6)'}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'relative',
    width: windowWidth,
    height: windowHeight,
    background: '#FFFFFF',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  childContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: windowWidth,
    height: 3 * windowHeight,
    justifyContent: 'flex-start',
    padding: 5,
    alignItems: 'center',
    paddingBottom: '25%',
  },
  greetingView: {
    flexDirection: 'row',
    //flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 0.095 * windowHeight,
    padding: 5,
  },
  avatar: {
    width: '15%',
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 50,
  },
  fullname: {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    color: '#000000',
  },
  greeting: {
    //marginTop: '5%',
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    justifyContent: 'flex-start',
    //alignItems: 'center',
    color: '#000000',
  },
  progressCircleView: {
    //top: 85,
    marginTop: '10%',
    width: '100%',
    height: 222,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircleView: {
    width: 200,
    height: 200,
    //left: 10,
    //right: 10,
    //padding: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerCircle: {
    width: 150,
    height: 150,
  },
  feeling: {
    marginTop: '5%',
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 26,
    lineHeight: 35,
    /* identical to box height, or 135% */

    textAlign: 'center',

    color: '#505D68',
  },
  button: {
    marginTop: '5%',
    //position: 'absolute',
    width: '100%',
    height: 0.08 * windowHeight,
    backgroundColor: '#424B5A',
    //top: 394,
    //left: 36,
    //right: 16,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonName: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
  infoView: {
    marginTop: '10%',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255,0.2)',
    borderWidth: 1,
    borderColor: '#DCE8F5',
    width: '100%',
    height: 0.7 * windowHeight,
    padding: 7,
    borderRadius: 10,
  },
  infoTitle: {
    //position: 'absolute',
    width: '100%',
    //height: 45,
    padding: 5,
    fontSize: 20,
    //justifyContent: 'center',
    textAlign: 'left',
    alignItems: 'center',
    color: '#000',
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'Ubuntu',
    lineHeight: 24,
  },
  infoImage: {
    width: '100%',
    height: '40%',
    backgroundColor: 'pink',
    alignItems: 'center',
    borderRadius: 10,
  },
  infoContent: {
    marginTop: '2%',
    width: '100%',
    //height: '60%',
    padding: 10,
    fontSize: 14,
    color: '#000',
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: 'normal',
    lineHeight: 24,
    display: 'flex',
    textAlign: 'justify',
    //backgroundColor: '#fff',
    borderRadius: 10,
  },
  accessoryTitle: {
    marginTop: '13%',
    //marginLeft: '5%',
    //position: 'absolute',
    width: '100%',
    fontSize: 23,
    //justifyContent: 'center',
    textAlign: 'left',
    //alignItems: 'center',
    color: '#fff',
    fontWeight: '700',
    fontStyle: 'normal',
    fontFamily: 'Ubuntu',
    lineHeight: 25,
  },
  square: {
    flex: 1,
    width: '100%',
    marginTop: '7%',
    alignItems: 'center',
  },
  navigationBar: {
    position: 'absolute',
    //flex: 1,
    width: '95%',
    height: '10%',
    marginTop: 0.85 * windowHeight,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#F4F2F2',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navigationIcon: {
    flex: 1,
    width: '20%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
});

export default ConnectedDevice;
