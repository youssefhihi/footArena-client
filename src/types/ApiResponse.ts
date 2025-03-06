export interface ApiResponse<T> {
    data?: T 
    message: string,
    statusCode?: number,
    success: boolean,
    errors: Record<string, string>;
  }