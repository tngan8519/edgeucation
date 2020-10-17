export const createResultMajorLimitCost = (response, major, cost) => {
  let found = response.data.results;
  let result = [];
  for (let i = 0; i < found.length; i++) {
    for (let key in found[i]) {
      if (
        key === `2018.academics.program_percentage.${major}` &&
        found[i][key] > 0 &&
        found[i]["2018.cost.tuition.in_state"] <= cost
      ) {
        result.push(found[i]);
      }
    }
  }
  return result;
};
export const createResultLimitCost = (response, cost) => {
  let found = response.data.results;
  let result = [];
  for (let i = 0; i < found.length; i++) {
    if (found[i]["2018.cost.tuition.in_state"] <= cost) {
      result.push(found[i]);
    }
  }
  return result;
};
export const createResultMajorAnyCost = (response, major) => {
  let found = response.data.results;
  let result = [];
  for (let i = 0; i < found.length; i++) {
    for (let key in found[i]) {
      if (
        key === `2018.academics.program_percentage.${major}` &&
        found[i][key] > 0
      ) {
        result.push(found[i]);
      }
    }
  }
  return result;
};
