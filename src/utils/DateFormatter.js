import moment from 'moment';

export const formatCommentDate = (date) => {
  return moment(date).format('MMMM D, YYYY [at] h:mm A');
};

export const formatPostDate = (date) => {
  return moment(date).format('D MMMM, YYYY');
}