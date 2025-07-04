export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    userId: number;
    tagIds: number[];
    createdAt: Date;
    updatedAt: Date;
  }