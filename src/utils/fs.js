import RNFS from 'react-native-fs';

export const saveExpedients = async newExpedients => {
  let exp = JSON.stringify(newExpedients);
  let expedientsFile = RNFS.ExternalDirectoryPath + '/expedients.db';

  return RNFS.writeFile(expedientsFile, exp, 'utf8')
    .then(success => {
      return true;
    })
    .catch(err => {
      console.log(err.message);
      return false;
    });
};
