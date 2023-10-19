export type Creator = {
  address: string;
  firstName: string;
  lastName: string;
  description: string;
  active: boolean;
  createdAt: string;
};

export type UpdateCreator = Omit<Creator, 'address'>;
