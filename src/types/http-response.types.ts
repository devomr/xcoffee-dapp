export type HttpResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};
