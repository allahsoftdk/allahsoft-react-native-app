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
  ForumTabs: undefined;
  SearchTab: undefined;
  UserProfileTab: undefined;
  QuranChapterTab: undefined;
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
  ForumTabs: undefined;
  SearchTab: undefined;
  UserProfileTab: undefined;
  QuranChapterTab: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type TranslatedName = {
  language_name: string;
  name: string;
}

export type Chapter = {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: TranslatedName;
}

export type QuranChapters = {
  chapters: Chapter[];
}

export type Ayah = {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export type Edition = {
  identifier: string;
  language: string;
  name: string;
  englishName: string;
  format: string;
  type: string;
  direction: string;
}

export type Data = {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: string;
  numberOfAyahs: number;
  ayahs: Ayah[];
  edition: Edition;
}

export type QuranVerse = {
  code: number;
  status: string;
  data: Data;
}

export type PrayerTimes = {
  city: string;
  date: string;
  today: [string, string][];
  tomorrow: [string, string][];
};

export type ChatMessage = {
  chatRoomId: number;
  userId: number;
  message: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ChatRoom = {
  id: string;
  name: string;
  chatMessages: ChatMessage[];
  chatRoomParticipants: User[];
};

export type PostComment = {
  id: Number;
  comment: string;
  postId: Number;
  userId: Number;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: Number;
  name: string;
  email: string;
  password: string;
  token: string;
  createdAt: Date;
  updatedAt: Date;
  roleId: Number;
  role: Role;
};

export type Post = {
  id: Number;
  description: string;
  resources: string;
  userId: Number;
  likedBy: User[];
  postComments: PostComment[];
  user: User;
  createdAt: Date;
  updatedAt: Date;
  isUpdated: Boolean;
};

export type Role = {
  id: Number;
  name: string;
};
