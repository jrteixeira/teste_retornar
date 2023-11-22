import { object, string, number, array } from 'zod';

export default object({
    stepOne: object({
      size: string().min(2).max(20).refine((value) => !!value, {
        message: 'Escolha um tamanho',
      }),
      price: number(),
    }),
    stepTwo: object({
      flavor: string().min(2).max(20).refine((value) => !!value, {
        message: 'Escolha um sabor',
      }),
      price: number(),
    }),
    stepThree: object({
      options: array(string()),
      price: number(),
    }),
  });