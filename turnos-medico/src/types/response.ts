type response<T> = {
  data: T[] | T;
  message: string;
  error: boolean;
};
