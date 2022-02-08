const nfse = require("./");

const consultarLoteRps = {
  config: {
    diretorioDoCertificado: "/home/jonas/nfse/CLUBF.pfx",
    senhaDoCertificado: "12345678",
    producaoHomologacao: "homologacao",
    codigoMunicipio: "4204202",
    acao: "consultarLoteRps",
  },
  prestador: {
    cpfCnpj: "22402320000100",
    inscricaoMunicipal: "00000",
  },
  protocolo: "ODs0MDc0Nzs0MzYxOzMxOzg7NDA3NDc7NDM2MTszMTs4OzQwNz",
};

const consultarNfseRps = {
  config: {
    diretorioDoCertificado: "/home/jonas/nfse/CLUBF.pfx",
    senhaDoCertificado: "12345678",
    producaoHomologacao: "homologacao",
    codigoMunicipio: "4204202",
    acao: "consultarNfsePorRps",
  },
  rps: {
    numero: "9037",
    serie: "2",
    tipo: "1",
  },
  prestador: {
    cpfCnpj: "22402320000100",
    inscricaoMunicipal: "00000",
  },
};

const cancelarNfse = {
  config: {
    diretorioDoCertificado: "/home/jonas/nfse/CLUBF.pfx",
    senhaDoCertificado: "12345678",
    producaoHomologacao: "producao",
    codigoMunicipio: "4204202",
    acao: "cancelarNfse",
  },
  prestador: {
    cpfCnpj: "22402320000100",
    inscricaoMunicipal: "00000",
  },
  numeroNfse: "000000000000092",
  codigoCancelamento: 1,
};

const enviarLoteRps = {
  config: {
    diretorioDoCertificado: "/home/jonas/nfse/CLUBF.pfx",
    senhaDoCertificado: "12345678",
    producaoHomologacao: "homologacao",
    codigoMunicipio: "4204202",
    acao: "enviarLoteRps",
    numeroLote: 31,
  },
  emissor: { cpfCnpj: "22402320000100", inscricaoMunicipal: "74189" },
  rps: [
    {
      numero: "9173",
      serie: 2,
      tipo: 1,
      dataEmissao: "2021-11-09T14:53:19",
      naturezaOperacao: "107",
      optanteSimplesNacional: "1",
      incentivadorCultural: "2",
      incentivoFiscal: "",
      status: "1",
      competencia: "",
      servico: {
        valorServicos: 11.83,
        valorDeducoes: 0,
        valorPis: 0,
        valorCofins: 0,
        valorInss: 0,
        valorIr: 0,
        valorCsll: 0,
        outrasRetencoes: "",
        issRetido: 2,
        valorIss: 0,
        valorIssRetido: "",
        baseCalculo: 11.83,
        aliquota: 0.02,
        descontoIncondicionado: "",
        descontoCondicionado: "",
        responsavelRetencao: "",
        valorLiquidoNfse: 11.83,
        itemListaServico: "1706",
        codigoCnae: "",
        discriminacao:
          "Referente as taxas de utilização do aplicativo utilizando PIX",
        codigoMunicipio: "4204202",
        codigoPais: "",
        exigibilidadeIss: "",
        municipioIncidencia: "",
        numeroProcesso: "",
      },
      prestador: {
        cpfCnpj: "22402320000100",
        inscricaoMunicipal: "74189",
        codigoMunicipio: "4204202",
      },
      tomador: {
        cpfCnpj: "22402320000100",
        razaoSocial: "Medianeira",
        endereco: {
          endereco: "Rua Paraná",
          numero: "1910",
          bairro: "Centro",
          codigoMunicipio: "4115804",
          uf: "PR",
          codigoPais: "",
          cep: "85884970",
        },
        contato: { telefone: "", email: "jonash@clubfood.com.br" },
      },
    },
    {
      numero: "9173",
      serie: 3,
      tipo: 1,
      dataEmissao: "2021-11-09T14:53:19",
      naturezaOperacao: "107",
      optanteSimplesNacional: "1",
      incentivadorCultural: "2",
      incentivoFiscal: "",
      status: "1",
      competencia: "",
      servico: {
        valorServicos: 114.74,
        valorDeducoes: 0,
        valorPis: 0,
        valorCofins: 0,
        valorInss: 0,
        valorIr: 0,
        valorCsll: 0,
        outrasRetencoes: "",
        issRetido: 2,
        valorIss: 0,
        valorIssRetido: "",
        baseCalculo: 114.74,
        aliquota: 0.02,
        descontoIncondicionado: "",
        descontoCondicionado: "",
        responsavelRetencao: "",
        valorLiquidoNfse: 114.74,
        itemListaServico: "1706",
        codigoCnae: "",
        discriminacao:
          "Referente as taxas de utilização do aplicativo utilizando PIX",
        codigoMunicipio: "4204202",
        codigoPais: "",
        exigibilidadeIss: "",
        municipioIncidencia: "",
        numeroProcesso: "",
      },
      prestador: {
        cpfCnpj: "22402320000100",
        inscricaoMunicipal: "74189",
        codigoMunicipio: "4204202",
      },
      tomador: {
        cpfCnpj: "22402320000100",
        razaoSocial: "club",
        endereco: {
          endereco: "Rua Paraná",
          numero: "1910",
          bairro: "Centro",
          codigoMunicipio: "4115804",
          uf: "PR",
          codigoPais: "",
          cep: "85884970",
        },
        contato: { telefone: "", email: "jonash@clubfood.com.br" },
      },
    },
  ],
};

const teste = async () => {
  console.log(JSON.stringify(await nfse.nfse(enviarLoteRps)));
};

teste();
