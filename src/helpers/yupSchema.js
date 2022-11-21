import { setLocale } from 'yup';
import * as yup from 'yup';

yup.addMethod(yup.array, 'unique', function check(message) {
  return this.test('unique', message, (list) => list.length === new Set(list).size);
});

setLocale({
  mixed: {
    default: 'Enter your RSS link',
  },
  string: {
    url: 'Enter valid url',
  },
});

const schema = yup.object().shape(
  {
    links: yup.array().unique('Url must be unique'),
    link: yup.string().required().url(),
  },
);

export default schema;
