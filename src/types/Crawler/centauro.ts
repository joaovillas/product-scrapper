interface CentauroImages {
  urls: CentauroImage[];
}

interface CentauroImage {
  url: string;
}

export interface CentauroPrice {
  valor: string;
  valorPadrao: string;
  codigoModelo: string;
}

export interface CentauroResponse {
  informacoes: {
    nome: string;
    fichaTecnicaLimpa: string;
    descricao: string;
  };
  imagens: CentauroImages[];
  precos: CentauroPrice[];
}
