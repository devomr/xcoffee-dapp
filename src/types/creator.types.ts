export type Creator = {
  address: string;
  firstName: string;
  lastName: string;
  description: string;
  active: boolean;
  createdAt: string;
};

export type AddCreator = Omit<Creator, 'createdAt'>;
export type UpdateCreator = Omit<Creator, 'active' | 'createdAt'>;
