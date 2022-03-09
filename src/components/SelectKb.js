import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  IconButton,
  List,
  Paragraph,
  Title,
  useTheme,
} from 'react-native-paper';

import {usePreferencesState} from '../context/preferences';

const SelectKb = ({setKb}) => {
  const {colors} = useTheme();
  const {kbs} = usePreferencesState();
  const [detailsKb, setDetailsKb] = useState(null);

  const kbsList = kbs.map(kb => (
    <View key={kb.knowledgebase.properties.title}>
      <List.Item
        title={kb.knowledgebase.properties.title}
        right={() => (
          <IconButton
            icon="play"
            size={38}
            color={colors.primary}
            onPress={() => {
              setKb(kb);
            }}
          />
        )}
        left={() => (
          <IconButton
            icon={
              detailsKb && detailsKb === kb.knowledgebase.properties.title
                ? 'dots-vertical'
                : 'dots-horizontal'
            }
            size={38}
            color={colors.accent}
            onPress={() => {
              detailsKb && detailsKb === kb.knowledgebase.properties.title
                ? setDetailsKb(null)
                : setDetailsKb(kb.knowledgebase.properties.title);
            }}
          />
        )}
      />
      {detailsKb === kb.knowledgebase.properties.title && (
        <Card>
          <Card.Content>
            <Paragraph>{kb.knowledgebase.properties.subtitle}</Paragraph>
            <Paragraph>
              Instrucciones: {kb.knowledgebase.properties.instructions}
            </Paragraph>
            <Paragraph>
              Descripción: {kb.knowledgebase.properties.description}
            </Paragraph>
            <Paragraph>Autor: {kb.knowledgebase.properties.author}</Paragraph>
          </Card.Content>
        </Card>
      )}
    </View>
  ));

  return (
    <View style={styles.form}>
      <Title>Exámenes</Title>
      <ScrollView style={styles.scroll}>
        <List.Section>{kbsList}</List.Section>
      </ScrollView>
    </View>
  );
};

export default SelectKb;

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
