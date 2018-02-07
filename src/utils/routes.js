import MainPage from '../client/components/main/main-page.jsx';
import CreateTournament from '../client/components/tournament/create.jsx';
import JoinTournament from '../client/components/tournament/join.jsx';
import LoginPage from '../client/components/login/login.jsx';
import SignUp from '../client/components/login/sign-up.jsx';

const routes = [
  {
    path: '/',
    exact: true,
    component: MainPage
  },
  {
    path: '/create/tournament',
    exact: true,
    component: CreateTournament,
  },
  {
    path: '/join/tournament',
    exact: true,
    component: JoinTournament,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/sign-up',
    exact: true,
    component: SignUp,
  }
];

export default routes;