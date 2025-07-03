export interface Tag {
    id: number;
    name: string;
    priority: 'baixo' | 'médio' | 'alto';
    createdAt: Date;
    updatedAt: Date;
  }