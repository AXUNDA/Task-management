export interface createTask {
  title: string;

  description: string;
  tag: TAG;
  email?: string;
  userId?: string;
}

enum TAG {
  BUG = "BUG",
  URGENT = "URGENT",
  FEATURE = "FEATURE",
}
