import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Card, IconButton, List, Title, useTheme} from 'react-native-paper';

import {usePreferencesState} from '../context/preferences';

const SelectExpedients = ({setExpedient}) => {
  const {colors} = useTheme();
  const {expedients} = usePreferencesState();

  const expList = expedients.map(exp => (
    <Card key={exp.identifier}>
      <List.Item
        title={`${exp.name} - ${exp.identifier}`}
        right={() => (
          <IconButton
            icon="play"
            size={38}
            color={colors.primary}
            onPress={() => {
              setExpedient(exp);
            }}
          />
        )}
      />
    </Card>
  ));

  return (
    <View style={styles.form}>
      <Title>Expedientes</Title>
      <ScrollView style={styles.scroll}>
        <List.Section>{expList}</List.Section>
      </ScrollView>
    </View>
  );
};

export default SelectExpedients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
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
