/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React,{useState,useEffect} from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { Question, RootTabScreenProps } from '../types';
import { Image, FlatList } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { reviews } from '../components/reviews';
import { questions } from '../components/questions';
import { reportData } from '../components/reportData';
import { atsros } from '../components/astro';
import { horoscopeData } from '../components/horoscopeData';

const HomeScreen=({navigation}: RootTabScreenProps<'Home'>)=>{
  const [category, setCategory] = useState<string>('');
  const [question, setQuestion] = useState<Question>();

  const images = {
    'Taurus' : require('../assets/images/taurus.png'),
    'Gemini': require('../assets/images/gemini.png'),
    'Aries':require('../assets/images/aries.png'),
  }

  const getFullName =(firstName:string,lastName:string)=>{
    return (`${firstName.toUpperCase()} ${lastName.toUpperCase()}`)
  }

  const ImagePath = (url:string)=>{
    return {
      'uri':url
    }
  }

  useEffect(() => {
    // dispatch({type:GET_ALL_ASTRO})
  }, [])

  const categoryChangeHandler =(val:string) =>{
    if(val!='none'){
      const question = questions.find((item)=>{
        return item.name===val
      })
      setQuestion(question);
    } else{
      setQuestion(undefined);
    }
    setCategory(val)
  }


  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.quoteContainer}>
          <Image
            source={require('../assets/images/quote.png')}
            style={{resizeMode: 'contain', width:'100%'}}
          />
        </View>
        <View style={styles.ParaContainer}>
          <View style={styles.TitleSeeAll}>
            <Text style={styles.Title}>Daily Horoscopes</Text>
            <Text style={styles.seeAll}>See All &gt; </Text>
          </View>
          <Text style={styles.paraText}>
          Read the latest Daily Horoscope based on your sunsign, select your
          zodiac sign and give the right start to your day.
          </Text>
          <FlatList
            data={horoscopeData}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.zodiacContainer}>
                <View style={styles.zodiacSign}>
                  <Image source={images[item.name]} style={{width:48,height:48}}/>
                </View>
                <Text style={styles.zodiacTitle}>{item.name}</Text>
                <Text style={styles.zodiacDate}>{item.date}</Text>
              </View>
            )}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginTop:10}}
          />
        </View>
        <View style={styles.ParaContainer}>
          <View style={styles.TitleSeeAll}>
            <Text style={styles.Title}>Talk to an Astrologers</Text>
            <Text style={styles.seeAll}>See All &gt;</Text>
          </View>
          <Text style={styles.paraText}>
          Leading astrologers of India are just one phone call away. Our pannels of astrologers are not just provide not just provide solutions to your life problems but guide you so that you can take the right path towards growth and prosperity.
          </Text>
          <FlatList
            data={atsros.slice(0,4)}
            renderItem={({ item, index }) => (
              <View key={index} style={styles.astrologerContainer}>
                <View style={styles.astrologerImage}>
                  <Image source={ImagePath(item.images.medium.imageUrl)} style={{width:150,height:150}}/>
                </View>
                <View style={styles.nameRating}>
                  <Text style={styles.astroTitle}>{getFullName(item.firstName,item.lastName)}</Text>
                  <Text style={styles.seeAll}>{item.rating}</Text>
                </View>
                <Text style={styles.astroSkills}>{item.skills[0].name}</Text>
                <View style={styles.astroPriceBtn}>
                  <Text>{`₹ ${item.additionalPerMinuteCharges} / min`}</Text>
                  <TouchableOpacity style={styles.defaultBtn}>
                    <Text style={styles.defaultBtnText}>Talk Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(item) => String(item.id)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginVertical:20}}
          />
        </View>
        <View style={styles.ParaContainer}>
          <View style={styles.TitleSeeAll}>
            <Text style={styles.Title}>Reports</Text>
          </View>
          <Text style={styles.paraText}>
          Leading astrologers of India are just one phone call away. Our pannels of astrologers are not just provide not just provide solutions to your life problems but guide you so that you can take the right path towards growth and prosperity.
          </Text>
          <FlatList
            data={reportData}
            renderItem={({ item, index }) => (
              <ImageBackground 
                source={ImagePath(item.images.medium.imageUrl)} 
                resizeMode="stretch" 
                style={styles.reportImage}
                imageStyle={{ borderRadius: 8}}
              >
                <View style={styles.buyPriceBar}>
                  <Text style={styles.defaultBtnText}>{`₹ ${item.offerPrice} / min`}</Text>
                  <TouchableOpacity style={styles.defaultBtn}>
                    <Text style={styles.defaultBtnText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            )}
            keyExtractor={(item) => String(item.productCode)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginVertical:20}}
          />
        </View>
        <View style={styles.ParaContainer}>
          <View style={styles.TitleSeeAll}>
            <Text style={styles.Title}>Ask a Question</Text>
          </View>
          <Text style={styles.paraText}>
              Leading astrologers of India are just one phone call away. Our pannels of astrologers are not just provide not just provide solutions to your life problems but guide you so that you can take the right path towards growth and prosperity.
          </Text>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Choose Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue:string) =>
                categoryChangeHandler(itemValue)
              }
              itemStyle={{padding:50}}
              style={{backgroundColor: 'white',height:40,marginHorizontal:10,marginVertical:20}}
            >
              <Picker.Item label="None" value="none" />
              <Picker.Item label="Love" value="Love" />
              <Picker.Item label="Business" value="Business" />
              <Picker.Item label="Education" value="Education" />
              <Picker.Item label="Work" value="Work" />
              <Picker.Item label="Self" value="Self" />
              <Picker.Item label="Life" value="Life" />
              <Picker.Item label="Money" value="Money" />
            </Picker>
            <View style={styles.priceAsk}>
              <Text style={styles.paraSmallText}>
                <Text style={styles.boldText}>
                  ₹ {question?.price?question.price:0}</Text> ( including GST )
              </Text>
              <View style={styles.suggestionBtnContainer}>
                <Text style={styles.suggestion}>Ideas what to ask</Text>
                <TouchableOpacity style={styles.defaultBtnLarge}>
                  <Text style={styles.defaultBtnTextSmall}>Ask a Question</Text>
                </TouchableOpacity>
              </View>
            </View>
            {question &&
              question.suggestions?.map((item,index)=>(
                <View style={{flexDirection: 'row',backgroundColor:'transparent',marginHorizontal:10}} key={index}>
                  <Text>{'\u2022'}</Text>
                  <Text style={{flex: 1, paddingLeft: 5}}>{item}</Text>
                </View>
              ))
            }
          </View>
        </View>
        <View style={styles.ParaContainer}>
          <Text style={styles.Title}>
              Hear from our Happy Customers!
          </Text>
          <FlatList
            data={reviews}
            renderItem={({ item, index }) => (
              <View style={styles.reviewCard} key={index}>
                <View style={styles.customerReview}>
                  <Text style={styles.purpleQuote}>&quot;</Text>
                  <Text style={styles.reviewText}>{item.message}</Text>
                </View>
                <View style={styles.customerDetails}>
                  <Image 
                    source={require('../assets/icons/account-circle.png')} 
                    style={styles.customerImage}
                  />
                  <View style={styles.customerNameCity}>
                    <Text>{item.name}</Text>
                    <Text style={styles.paraSmallText}>{item.city}</Text>
                  </View>
                </View>
              </View>
            )}
            keyExtractor={(item) => String(item.id)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{marginVertical:20}}
          />
          
        </View>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  quoteContainer: {
    height: 200,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ParaContainer: {
    marginHorizontal:20,
    marginVertical:10,
  },
  TitleSeeAll: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom:10,
  },
  Title: {
    fontSize:20,
    fontWeight:'700',
  },
  paraText:{
    color:'rgba(0,0,0,0.7)',
  },
  seeAll: {
    color:'#FF8F00',
    fontWeight:'700',
    fontSize:16
  },
  zodiacSign:{
    backgroundColor:'#E8EAF6',
    borderRadius:50,
    height:100,
    width:100,
    justifyContent:'center',
    alignItems:'center',
    marginHorizontal:10
  },
  zodiacContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  zodiacDate:{
    color:'#9E9E9E'
  },
  zodiacTitle:{
    fontWeight:'700',
    marginTop:8,
  },
  astrologerContainer:{
    height:250,
    width:170,
    margin:10
  },
  astrologerImage:{
    justifyContent:'center',
    flexDirection:'column',
    alignItems:'center'
  },
  astroTitle:{
    fontWeight:'700'
  },
  astroSkills:{
    color:'#9E9E9E'
  },
  nameRating:{
    justifyContent:'space-between',
    flexDirection:'row',
    marginTop:8
  },
  astroPriceBtn:{
    justifyContent:'space-between',
    flexDirection:'row'
  },
  defaultBtn:{
    backgroundColor:'#FF944D',
    width:80,
    height:30,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  defaultBtnLarge:{
    backgroundColor:'#FF944D',
    width:90,
    height:30,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
  },
  defaultBtnTextSmall:{
    color:'white',
    fontWeight:'500',
    fontSize:11,
  },
  defaultBtnText:{
    color:'white',
    fontWeight:'700'
  },
  reportContainerImage:{
    borderRadius:50,
  },
  reportImage:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'flex-end',
    margin:10,
    height:200,
    width:250,
  },
  buyPriceBar:{
    backgroundColor:'rgba(0,0,0,0.2)',
    justifyContent:'space-between',
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:10,
    width:'100%',
    height:50,
    borderBottomEndRadius:14.5,
    borderBottomStartRadius:14.5
  },
  categoryContainer:{
    backgroundColor:'#F1F2FA',
    paddingVertical:20,
    marginVertical:10
  },
  categoryTitle:{
    marginLeft:10,
    fontWeight:'700',
    fontSize:18
  },
  priceAsk:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'transparent',
    paddingHorizontal:10,
    marginBottom:20,
  },
  suggestionBtnContainer:{
    flexDirection:'row',
    backgroundColor:'transparent',
    alignItems:'center'
  },
  paraSmallText:{
    color:'rgba(0,0,0,0.7)',
    fontSize:12
  },
  boldText:{
    fontWeight:'700',
    color:'black',
    fontSize:16,
  },
  suggestion:{
    fontWeight:'700',
    marginRight:4,
    fontSize:12,
  },
  askBtn:{},
  customerReview:{},
  reviewTitle:{},
  purpleQuote:{
    color:'#3342C3',
    fontSize:36,
    fontStyle:'italic',
    marginBottom:-12,
    marginLeft:10,
  },
  reviewText:{
    padding:10,
    color:'rgba(0,0,0,0.7)',
  },
  reviewCard:{
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width:250,
    marginHorizontal:10,
    elevation: 5,
    marginVertical:20,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  customerDetails:{
    justifyContent:'center',
    width:'100%',
    alignItems:'center',
  },
  customerNameCity:{
    backgroundColor:'#F1F2FA',
    width:'100%',
    alignItems:'center',
    justifyContent:'flex-end',
    padding:10,
    height:70,
    marginTop:-30
  },
  customerImage:{
    height:64,
    width:64,
    zIndex:1
  },
});
