import { RouteNamesEnum } from 'localConstants';
import { Dashboard, Disclaimer, Home } from 'pages';
import { SetupProfile } from 'pages/SetupProfile';
import { CreatorProfile } from 'pages/CreatorProfile';
import { Settings } from 'pages/Settings';
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
    path: RouteNamesEnum.setupProfile,
    title: 'Setup profile',
    component: SetupProfile
  },
  {
    path: RouteNamesEnum.creatorProfile,
    title: 'Creator Profile',
    component: CreatorProfile
  },
  {
    path: RouteNamesEnum.settings,
    title: 'Settings',
    component: Settings
  }
];
