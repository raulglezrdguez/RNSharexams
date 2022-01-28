/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-eval */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, List, Paragraph, useTheme} from 'react-native-paper';

import {usePreferencesState} from '../context/preferences';

const ShowExamDetails = ({exam, setDetail2Show}) => {
  const {colors} = useTheme();
  const {kbs} = usePreferencesState();
  const [detailsView, setDetailsView] = useState(null);

  console.log(kbs);
  console.log(exam);

  useEffect(() => {
    const kb = kbs.find(k => k.filename === exam.kb);
    const reValue = new RegExp('\\bvalue\\b', 'gi');
    const dView = kb?.knowledgebase?.questions?.question?.map(quest => {
      const res = exam.answers.find(ans => ans.id === quest['@_id']);
      let userAns = res?.value;
      if (res) {
        if (quest['@_type'] === 'radio') {
          const item = quest.item.find(it => it['@_value'] === res.value);
          if (item) {
            userAns = item['#text'];
          }
        }
      }
      let expression = quest['@_expression'];
      if (expression) {
        expression = expression.replace(reValue, res?.value);
      }
      const resultEval = eval(expression).toString();

      return (
        <Card key={quest['@_id']} style={{marginTop: 10, marginBottom: 10}}>
          <Card.Content>
            <Paragraph>{`${quest['@_id']}- ${quest['@_text']}`}</Paragraph>
            <Paragraph
              style={{
                color: resultEval !== 'true' ? colors.error : colors.text,
              }}>
              Respuesta: {userAns}
            </Paragraph>
          </Card.Content>
        </Card>
      );
    });
    setDetailsView(dView);
  }, [exam]);

  return (
    <View style={styles.form}>
      <ScrollView style={styles.scroll}>
        <List.Section>
          <List.Item
            title={exam?.filename}
            titleNumberOfLines={2}
            left={() => (
              <Button
                icon="close"
                color={colors.error}
                onPress={() => setDetail2Show(null)}
              />
            )}
          />
        </List.Section>

        <Paragraph>Resultado: {exam?.result.text}</Paragraph>
        {detailsView}
      </ScrollView>
    </View>
  );
};

export default ShowExamDetails;

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
  row_around: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
