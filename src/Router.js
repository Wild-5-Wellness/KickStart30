import React from 'react';
import {View} from 'react-native'
import {Scene, Router, Actions, ActionConst} from 'react-native-router-flux';
import Landing from './screens/Landing';
import ExerciseTracking from './screens/trackingscreens/ExerciseTracking';
import MindfulnessTracking from './screens/trackingscreens/MindfulnessTracking';
import SleepTracking from './screens/trackingscreens/SleepTracking';
import SocialTracking from './screens/trackingscreens/SocialTracking';
import NutritionTracking from './screens/trackingscreens/NutritionTracking';
import HeroTracking from './screens/trackingscreens/HeroTracking';
import Settings from './screens/Settings';
import Statistics from './screens/Statistics';
import Help from './screens/accountmenu/Help';
import Herointro from './screens/HERO/Herointro';
import {
  HeroEnth,
  HeroHappy,
  HeroMent,
  HeroOpt,
  HeroRes,
  HeroScore,
} from './screens/HERO';
import NewLogin from './screens/NewLoginScreen';
import RegisterPage from './screens/RegisterPage';
import Loading from './components/common/Loading'

const Routercomponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="newlogin" component={NewLogin} header={null} duration={0} drawerLockMode='locked-closed' gesturesEnabled={false}/>
        <Scene
          key="registerpage"
          component={RegisterPage}
          title="Register"
          backTitle="Back to Login"
        />
        <Scene
          key="landing"
          component={Landing}
          title="Welcome to Wellness"
          header={null}
        />
        <Scene key="about" component={Help} header={null} title="About" />
        <Scene
          key="statistics"
          component={Statistics}
          header={null}
          title="Statistics"
        />
        <Scene
          key="settings"
          backTitle="Back"
          title="Settings"
          header={null}
          component={Settings}
        />
        <Scene
          key="exercisetracking"
          backTitle="Back"
          title="Exercise Tracking"
          component={ExerciseTracking}
        />
        <Scene
          key="mindfulnesstracking"
          backTitle="Back"
          title="Mindfulness Tracking"
          component={MindfulnessTracking}
        />
        <Scene
          key="sleeptracking"
          backTitle="Back"
          title="Sleep Tracking"
          component={SleepTracking}
        />
        <Scene
          key="socialtracking"
          backTitle="Back"
          title="Social Tracking"
          component={SocialTracking}
        />
        <Scene
          key="nutritiontracking"
          backTitle="Back"
          title="Nutrition Tracking"
          component={NutritionTracking}
        />
        <Scene
          key="herotracking"
          backTitle="Back"
          title="HERO Tracking"
          component={HeroTracking}
        />
        <Scene
          key="herointro"
          component={Herointro}
          renderBackButton={()=><View/>}
          hideNavBar
        />
        <Scene
          gesturesEnabled={false}
          key="herohappy"
          component={HeroHappy}
          backTitle="Back"
          title="Happiness"
        />
        <Scene
          gesturesEnabled={false}
          key="heroenth"
          component={HeroEnth}
          backTitle="Back"
          title="Enthusiasm"
        />
        <Scene
          gesturesEnabled={false}
          key="herores"
          component={HeroRes}
          backTitle="Back"
          title="Resilience"
        />
        <Scene
          gesturesEnabled={false}
          key="heroopt"
          component={HeroOpt}
          backTitle="Back"
          title="Optimism"
        />
        <Scene
          gesturesEnabled={false}
          key="heroment"
          component={HeroMent}
          backTitle="Back"
          title="Mental Wellness"
        />
        <Scene key="heroscore" component={HeroScore} header={null} />
        <Scene key="loading" component={Loading} header={null} />
      </Scene>
    </Router>
  );
};

export default Routercomponent;
