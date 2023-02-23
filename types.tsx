/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  HomeTab: undefined;
  CompassTab: undefined;
  LoginTab: undefined;
  SignUpTab: undefined;
  ForgotTab: undefined;
  ForumTab: undefined;
  QuranTab: undefined;
  AlarmTab: undefined;
  EventTab: undefined;
  MapTab: undefined;
  HijriTab: undefined;
  ChatTab: undefined;
  MessageTab: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  HomeTab: undefined;
  CompassTab: undefined;
  LoginTab: undefined;
  SignUpTab: undefined;
  ForgotTab: undefined;
  ForumTab: undefined;
  QuranTab: undefined;
  AlarmTab: undefined;
  EventTab: undefined;
  MapTab: undefined;
  HijriTab: undefined;
  ChatTab: undefined;
  MessageTab: undefined;

};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type ChatMessage = {
  chatRoomId: number;
  userId: number;
  message: string;
  createdAt: Date;
};

export type ChatRoom = {
  id: string;
  name: string;
  chatMessages: ChatMessage[];
};

