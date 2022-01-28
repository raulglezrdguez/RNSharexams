import React from 'react';
import {BottomNavigation} from 'react-native-paper';

import NewExpedient from '../components/NewExpedient';
import ShowExams from '../components/ShowExams';
import ShowExpedients from '../components/ShowExpedients';

const RootExpedients = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'create', title: 'Crear', icon: 'account-multiple-plus'},
    {key: 'edit', title: 'Editar', icon: 'account-multiple-check'},
    {key: 'exams', title: 'Exámenes', icon: 'page-next'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    create: NewExpedient,
    edit: ShowExpedients,
    exams: ShowExams,
  });

  return (
    <BottomNavigation
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={true}
      sceneAnimationEnabled={true}
      labeled={false}
    />
  );
};

export default RootExpedients;
