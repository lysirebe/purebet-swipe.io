export default function hasMoneyLine(data){
  if (data && typeof data === 'object') {
    for (const key in data) {
      if (key === 'moneyline') {
        return 'moneyline';
      } else if (key === 'full_time_result') {
        return 'full_time_result';
      } else if (typeof data[key] === 'object') {
        const result = hasMoneyLine(data[key]);
        if (result) {
          return result;
        }
      }
    }
  }
  return null;
};
