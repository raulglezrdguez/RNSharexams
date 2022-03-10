/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, IconButton, List, Title, useTheme} from 'react-native-paper';

import {usePreferencesState} from '../context/preferences';
import ShowExamsDetails from './ShowExamsDetails';

const ShowExams = () => {
  const {colors} = useTheme();
  const {expedients} = usePreferencesState();

  const [id2Show, setId2Show] = useState(null);

  const expList = expedients.map(exp =>
    id2Show && id2Show === exp.id ? (
      <ShowExamsDetails
        key={exp.id}
        expedientId={exp.id}
        setId2Show={setId2Show}
      />
    ) : (
      <Card key={exp.id} style={{marginVertical: 5}}>
        <List.Item
          title={`${exp.name} - ${exp.identifier}`}
          titleNumberOfLines={2}
          right={() => (
            <IconButton
              icon="page-next"
              color={colors.primary}
              size={38}
              onPress={() => setId2Show(exp.id)}
            />
          )}
        />
      </Card>
    ),
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Title style={{marginTop: 10}}>Exámenes</Title>
        <ScrollView style={styles.scroll}>
          <List.Section>{expList}</List.Section>
        </ScrollView>
      </View>
    </View>
  );
};

export default ShowExams;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  scroll: {
    width: '100%',
    padding: 2,
    marginBottom: 10,
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
