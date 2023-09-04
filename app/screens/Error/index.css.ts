import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    backgroundColor: '#2c395f',
    minHeight: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: 20,
    height: 20,
  },
  statusCode: {
    fontSize: 112.5,
    fontWeight: 'bold',
  },
  description: {
    color: '#474747',
    fontSize: 18,
    fontWeight: 'bold',

    textAlign: 'center',
  },
  subDescription: {
    width: 300,
    color: '#828282',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  padding: {
    //paddingHorizontal: 5,
  },
  button: {
    textAlign: 'center',
    fontSize: 12,

    paddingVertical: 1,
    marginTop: 0.8,
  },
});
export default styles;
