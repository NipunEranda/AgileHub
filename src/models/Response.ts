export interface Response {
  status: number;
  body: JSON;
  message: string;
}

// const responseHandler = (status: number, data: Object, message: string) => {
//     return {
//       status: status,
//       body: JSON.stringify(data),
//       message: message,
//     };
//   };
