/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-eval */
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Card, Paragraph, useTheme, List} from 'react-native-paper';

const ShowResult = ({kb, result, saveExam}) => {
  const {colors} = useTheme();
  const [details, setDetails] = useState(false);

  let detailsView = null;
  if (details) {
    const reValue = new RegExp('\\bvalue\\b', 'gi');
    detailsView = kb?.knowledgebase?.questions?.question?.map(quest => {
      const res = result.answers.find(ans => ans.id === quest['@_id']);
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
  }

  return (
    <View style={styles.form}>
      <ScrollView style={styles.scroll}>
        <List.Section>
          <List.Item
            title={`Resultado: ${result?.result.text}`}
            titleNumberOfLines={4}
            right={() => (
              <Button
                icon={details ? 'page-next-outline' : 'page-next'}
                onPress={() => setDetails(!details)}
              />
            )}
          />
        </List.Section>
        {detailsView}
        <Button
          icon="account-plus"
          mode="contained"
          onPress={saveExam}
          style={{width: '60%', alignSelf: 'center'}}>
          Guardar
        </Button>
      </ScrollView>
    </View>
  );
};

export default ShowResult;

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
});
