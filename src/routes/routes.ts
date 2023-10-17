import { RouteNamesEnum } from 'localConstants';
import { Dashboard, Disclaimer, Home } from 'pages';
import { CreateProfile } from 'pages/CreateProfile';
import { CreatorProfile } from 'pages/CreatorProfile';
import { RouteType } from 'types';

interface RouteWithTitleType extends RouteType {
  title: string;
}

export const routes: RouteWithTitleType[] = [
  {
    path: RouteNamesEnum.home,
    title: 'Home',
    component: Home
  },
  {
    path: RouteNamesEnum.dashboard,
    title: 'Dashboard',
    component: Dashboard
  },
  {
    path: RouteNamesEnum.disclaimer,
    title: 'Disclaimer',
    component: Disclaimer
  },
  {
    path: RouteNamesEnum.createProfile,
    title: 'Create profile',
    component: CreateProfile
  },
  {
    path: RouteNamesEnum.creatorProfile,
    title: 'Creator Profile',
    component: CreatorProfile
  }
];
