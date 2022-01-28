/* eslint-disable no-eval */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  List,
  RadioButton,
  Subheading,
  TextInput,
} from 'react-native-paper';
import RNFS from 'react-native-fs';

const ExecKb = ({kb, setResult}) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const answs = [];
    kb?.knowledgebase?.questions?.question.forEach(q => {
      answs.push({id: q['@_id'], value: q.item[0]['@_value']});
    });
    setAnswers(answs);
  }, [kb]);

  const changeAnswer = (id, value) => {
    const newAnswers = [...answers];
    newAnswers.find(a => a.id === id).value = value;
    setAnswers(newAnswers);
  };

  const getValue = id => {
    const answ = answers.find(a => a.id === id);
    return answ ? answ.value.trim() : null;
  };

  const questions = kb?.knowledgebase?.questions?.question.map(q => {
    let img = null;
    let answ = null;
    if (q['@_picture'] && q['@_picture'] !== '') {
      img = (
        <Image
          source={{
            uri: 'file://' + RNFS.ExternalDirectoryPath + '/' + q['@_picture'],
          }}
          style={{width: 150, height: 150}}
        />
      );
    }
    switch (q['@_type']) {
      case 'radio':
        answ = q.item.map(item => (
          <List.Item
            key={item['@_id']}
            title={item['#text']}
            titleNumberOfLines={10}
            left={props => <RadioButton {...props} value={item['@_value']} />}
          />
        ));
        answ = (
          <RadioButton.Group
            onValueChange={newValue => changeAnswer(q['@_id'], newValue)}
            value={getValue(q['@_id'])}>
            {answ}
          </RadioButton.Group>
        );
        break;

      default:
        answ = (
          <TextInput
            label="Nick"
            value={getValue(q['@_id'])}
            onChangeText={newValue => changeAnswer(q['@_id'], newValue)}
            mode="outlined"
            placeholder="Nick"
            error={getValue(q['@_id']) === ''}
          />
        );
        break;
    }
    return (
      <Card key={q['@_id']} style={{marginTop: 10}}>
        <Card.Content>
          <Subheading>{`${q['@_id']}- ${q['@_text']}`}</Subheading>
          {img}
          {answ}
        </Card.Content>
      </Card>
    );
  });

  const evaluate = () => {
    kb.knowledgebase.properties.expression.item.forEach(item => {
      const tmpExp = {};
      tmpExp.expression = item['#text'];
      answers.forEach(ans => {
        const re = new RegExp('\\b' + ans.id + '\\b', 'gi');
        tmpExp.expression = tmpExp.expression.replace(re, ans.value);
      });
      tmpExp.operator = item['@_operator']
        .replace(/&gt;/gi, '>')
        .replace(/&lt;/gi, '<');
      if (tmpExp.operator === 'between') {
        tmpExp.value1 = item['@_value1'];
        tmpExp.value2 = item['@_value2'];
      } else {
        tmpExp.value = item['@_value'];
      }
      tmpExp.label = item['@_label'];
      tmpExp.reference = item['@_reference'];

      const result = eval(tmpExp.expression).toString();
      let sentence = `${result} ${tmpExp.operator} ${tmpExp.value}`;
      if (tmpExp.operator === 'between') {
        sentence = `(${result} >= ${tmpExp.value1}) && (${result} <= ${tmpExp.value2})`;
      }

      const lastResult = eval(sentence);
      if (lastResult) {
        setResult({answers, result: {value: result, text: tmpExp.label}});
      }
    });
  };

  return (
    <View style={styles.form}>
      <ScrollView style={styles.scroll}>
        {questions}
        <Button
          icon="account-plus"
          mode="contained"
          onPress={evaluate}
          style={{
            width: '60%',
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
          Evaluar
        </Button>
      </ScrollView>
    </View>
  );
};

export default ExecKb;

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
});
