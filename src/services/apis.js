// import { useContext } from 'react';
// import context from '../Context/Context';

// const errorMessage = 'Sorry, we haven\'t found any recipes for these filters.';

// const useSetHandleData = (data) => {
//   const { setResult } = useContext(context);
//   if (!data.length) {
//     global.alert(errorMessage);
//   }
//   setResult(data);
// };

// function api(url, input) {
//   try {
//     const apiFetch = fetch(url);
//     const json = apiFetch.then((response) => response.json());
//     if (input) {
//       json.then((data) => useSetHandleData(data));
//     } else {
//       return json;
//     }
//   } catch {
//     global.alert(errorMessage);
//   }
// }

// export default api;
