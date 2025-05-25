export default class APIServiceError {
  response: {
    status: number;
    data: {
      message: string;
      error: string;
      data: null;
    };
  };

  constructor(response: {
    status: number;
    data: { message: string; error: string; data: null };
  }) {
    this.response = response;
  }
}
