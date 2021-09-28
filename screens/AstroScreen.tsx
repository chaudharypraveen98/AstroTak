/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { SkillEntity } from '../types';
import { useState } from 'react';
import { atsros } from '../components/astro';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';  

const Search = require('../assets/icons/search.png');
const Filter = require('../assets/icons/filter.png');
const Sort = require('../assets/icons/sort.png');
const Close = require('../assets/icons/close.png');
const Skill = require('../assets/icons/skills.png');
const Rate = require('../assets/icons/rate.png');

const AstroScreen= () => {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredList, setFilteredList] = useState(atsros);

  const onChangeText= (val:string) =>{
    setSearchText(val);
    const tempList = atsros.filter((item)=>{
      const fullName = (item.firstName+item.lastName).toLowerCase()
      const search = val.replace(' ','').toLowerCase()
      return fullName.includes(search)
    })
    setFilteredList(tempList)
  }

  const resetSearchText=()=>{
    setSearchText('');
    setFilteredList(atsros);
  }

  const getSkillsString =(skills:(SkillEntity)[])=>{
    const skillArray: string[] =[];
    skills.forEach((skill:SkillEntity) => {
      skillArray.push(skill.name)
    });
    return skillArray.join(', ')
  }

  const ImagePath = (url:string)=>{
    return {
      'uri':url
    }
  }

  const getFullName =(firstName:string,lastName:string)=>{
    return (`${firstName.toUpperCase()} ${lastName.toUpperCase()}`)
  }

  const getLanguageString =(languages:{id:number,name:string}[])=>{
    const languageArray: string[] =[];
    languages.forEach((skill:{id:number,name:string}) => {
      languageArray.push(skill.name)
    });
    return languageArray.join(', ')
  }

  const experienceHandler = (ascending:boolean)=> {
    const tempList = filteredList.sort((a,b)=>a.experience-b.experience)
    setFilteredList(tempList);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleFilterBar}>
        <Text style={styles.title}>Talk to an Astrologers</Text>
        <View style={styles.filtersOption}>
          <TouchableOpacity>
            <Image source = {Search}  style={{height:24,width:24,marginLeft:10}}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source = {Filter}  style={{height:24,width:24,marginLeft:10}}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Menu>
              <MenuTrigger>
                <Image source = {Sort}  style={{height:24,width:24,marginLeft:10,marginRight:10}}/>
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{marginTop:30}}>
                <View style={{padding:10}}>
                  <Text style={styles.sortingText}>Sort By</Text>
                  <MenuOption onSelect={() => experienceHandler(true)} text='Experience Low to High' />
                  <MenuOption onSelect={() => alert('Delete')} >
                    <Text style={{color: 'red'}}>Delete</Text>
                  </MenuOption>
                  <MenuOption onSelect={() => alert('Not called')} disabled={true} text='Disabled' />
                </View>
              </MenuOptions>
            </Menu>
          </TouchableOpacity>        
        </View>
      </View>
      <View style={styles.searchBar}>
        <Image source = {Search}  style={styles.searchBarLeftIcon}/>
        <TextInput
          style={styles.searchInput}
          onChangeText={(val:string)=>{onChangeText(val)}}
          value={searchText}
          placeholder="Search Astrologers"    
        />
        {searchText.length>0 &&
          <TouchableOpacity onPress={()=>resetSearchText()} style={styles.searchBarRightIcon}>
            <Image source = {Close} style={{height:28, width:28}}/>
          </TouchableOpacity>
        }
      </View>
      <FlatList
        data={filteredList}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.astroContainer}>
            <Image 
              source={ImagePath(item.images.medium.imageUrl)} 
              style={{height:120, width:120}}
            />
            <View style={styles.detailContainer}>
              <View style={styles.nameYearContainer}>
                <Text style={styles.name}>{getFullName(item.firstName,item.lastName)}</Text>
                <Text style={styles.year}>{`${item.experience} Years`}</Text>
              </View>
              <View style={styles.iconTextContainer}>
                <Image 
                  source = {Skill}  
                  style={{height:24,width:24,marginLeft:5,marginRight:10}}
                />
                <Text style={styles.text}>{getSkillsString(item.skills)}</Text>
              </View>
              <View style={styles.iconTextContainer}>
                <FontAwesome 
                  name="language" 
                  size={24} 
                  color="#FF8F00" 
                  style={{height:24,width:24,marginLeft:5,marginRight:10}}
                />
                <Text style={styles.text}>{getLanguageString(item.languages)}</Text>
              </View>
              <View style={styles.iconTextContainer}>
                <Image source = {Rate}  style={{height:24,width:24,marginLeft:5,marginRight:10}}/>
                <Text style={styles.title}>{`₹ ${item.additionalPerMinuteCharges} / min`}</Text>
              </View>
              <TouchableOpacity style={styles.defaultBtnContainer}>
                <Feather name="phone" size={24} color="white" />
                <Text style={styles.defaultBtnText}>Talk on Call</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        style={{margin:10,flex:1}}
      />
    </View>
  );
}
export default AstroScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleFilterBar:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    padding:10
  },
  title:{
    fontWeight:'700',
    fontSize:18
  },
  filtersOption:{
    flexDirection:'row',
    justifyContent:'center'
  },
  searchInput:{
    height:50,
    width:'100%',
    paddingLeft:40,
    borderRadius:8,
  },
  searchBarLeftIcon:{
    height:18,
    width:18,
    position:'absolute',
    left:20
  },
  searchBar:{
    flexDirection:'row',
    paddingHorizontal:10,
    alignItems:'center',
    borderRadius:8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginHorizontal:15,
  },
  searchBarRightIcon:{
    paddingLeft:-25,
    zIndex:2,
    display:'flex',
    height:50,
    width:50,
    justifyContent:'center'
  },
  astroContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
    marginVertical:20,
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
  sortingText:{
    color:'#FF944D',
    fontSize:16,
    paddingVertical:5,
    borderBottomWidth:1,
    borderBottomColor:'rgba(0,0,0,0.4)',

  },
  defaultBtnContainer:{
    flexDirection:'row',
    backgroundColor:'#FF944D',
    width:120,
    height:40,
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
    marginTop:20,
    marginLeft:10,
  },
  defaultBtnText:{
    color:'white',
    fontWeight:'700',
  },
  detailContainer:{
    flexDirection:'column',
    justifyContent:'flex-end',
    alignItems:'flex-start',
    marginLeft:10,
  },
  nameYearContainer:{
    flexDirection:'row',
    alignItems:'center',
    flex:1
  },
  // year:{
  //   position:'absolute',
  //   right:10
  // },
  iconTextContainer:{
    flexDirection:'row',
    marginVertical:2
  },
  name:{
    fontWeight:'700',
    fontSize:14,
  },
  text:{
    flexWrap:'wrap',
    flex:1
  },
});
