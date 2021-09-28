/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-var-requires */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable,Image } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AskAQuestion from '../screens/AskAQuestion';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import ReportsScreen from '../screens/Reports';
import HomeScreen from '../screens/HomeScreen';
import AstroScreen from '../screens/AstroScreen';
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

const Profile = require('../assets/icons/profile.png');
const AppLogo = require('../assets/icons/logo.png');
const Menu = require('../assets/icons/hamburger.png');

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          headerTitleAlign:'center',
          tabBarIcon: () =>  
            <Image 
              source={require('../assets/icons/home.png')}
              style={{height:24,width:24}}
            />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Image source = {Profile}  style={{height:36,width:36,marginRight:10}}/>
            </Pressable>
          ),
          headerTitle:()=>(
            <Image source={AppLogo}
              style={{height:54,width:74}}
            />
          ),
          headerLeft:()=>(
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Image source={Menu}  style={{height:28,width:28,marginLeft:10}}/>
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="TalkToAstrologer"
        component={AstroScreen}
        options={({ navigation }: RootTabScreenProps<'TalkToAstrologer'>) => ({
          tabBarLabel: 'Talk to Astrologer',
          headerTitleAlign:'center',
          tabBarIcon: () => 
            <Image 
              source={require('../assets/icons/talk.png')} 
              style={{height:24,width:28}}
            />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Image source = {Profile}  style={{height:36,width:36,marginRight:10}}/>
            </Pressable>
          ),
          headerTitle:()=>(
            <Image source={AppLogo}
              style={{height:54,width:74}}
            />
          ),
          headerLeft:()=>(
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Image source = {Menu}  style={{height:28,width:28,marginLeft:10}}/>
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="AskQuestion"
        component={AskAQuestion}
        options={({ navigation }: RootTabScreenProps<'AskQuestion'>) => ({
          tabBarLabel: 'Ask Question',
          headerTitleAlign:'center',
          tabBarIcon: () => 
            <Image 
              source={require('../assets/icons/ask.png')} 
              style={{height:24,width:24}}
            />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Image source = {Profile}  style={{height:36,width:36,marginRight:10}}/>
            </Pressable>
          ),
          headerTitle:()=>(
            <Image source={AppLogo}
              style={{height:54,width:74}}
            />
          ),
          headerLeft:()=>(
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Image source = {Menu}  style={{height:28,width:28,marginLeft:10}}/>
            </Pressable>
          )
        })}
      />
      <BottomTab.Screen
        name="Report"
        component={ReportsScreen}
        options={({ navigation }: RootTabScreenProps<'Report'>) => ({
          tabBarLabel: 'Reports',
          headerTitleAlign:'center',
          tabBarIcon: () => 
            <Image 
              source={require('../assets/icons/reports.png')} 
              style={{height:24,width:20}}
            />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Image source = {Profile}  style={{height:36,width:36,marginRight:10}}/>
            </Pressable>
          ),
          headerTitle:()=>(
            <Image source={AppLogo}
              style={{height:54,width:74}}
            />
          ),
          headerLeft:()=>(
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <Image source = {Menu}  style={{height:28,width:28,marginLeft:10}}/>
            </Pressable>
          )
        })}
      />
    </BottomTab.Navigator>
  );
}
