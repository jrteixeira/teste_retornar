type Tamanho = 'pequeno' | 'medio' | 'grande';
type Fruta = 'morango' | 'banana' | 'kiwi';

type Precos = {
  [fruta in Fruta]: {
    [tamanho in Tamanho]: number;
  };
};

type PrazosEntrega = {
  [tamanho in Tamanho]: number;
};

export function calculateShipping(tamanho: Tamanho, fruta: Fruta): number {
  const precos: Precos = {
    morango: { pequeno: 10, medio: 12, grande: 15 },
    banana: { pequeno: 10, medio: 12, grande: 15 },
    kiwi: { pequeno: 10, medio: 12, grande: 15 },
  };

  if (!precos[fruta] || !precos[fruta][tamanho]) {
    return 0;
  }

  const valorTotal = precos[fruta][tamanho]
  return valorTotal;
}

export function calculateDeadline(tamanho: Tamanho): number {
  const prazosEntrega: PrazosEntrega = {
    pequeno: 5,
    medio: 7,
    grande: 9,
  };

  if (!prazosEntrega[tamanho]) {
    return 0;
  }

  return prazosEntrega[tamanho];
}

