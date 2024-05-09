// Vendors
const request = require("request");
const soap = require("soap");
const fs = require("fs");

function webServiceRequestREST(xmlData, object) {
  try {
    return new Promise((resolve, reject) => {
      try {
        const xmlEnveloped = xmlData.soapEnvelop;
        const url = xmlData.url;
        const soapAction = xmlData.soapAction;
        const certificatePath = object.config.diretorioDoCertificado;
        const certificatePassword = object.config.senhaDoCertificado;
        const webserviceRetry = object.config.insistirNoWebservice;

        var options = {
          method: "POST",
          url: url,
          agentOptions: {
            pfx: fs.readFileSync(certificatePath),
            passphrase: certificatePassword,
          },
          headers: {
            Accept: "text/xml",
            "Content-Type": "text/xml;charset=UTF-8",
          },
          body: xmlEnveloped,
          pool: { maxSockets: Infinity },
        };

        if (soapAction) {
          options.headers = {
            Accept: "text/xml",
            "Content-Type": "text/xml;charset=UTF-8",
            SOAPAction: soapAction,
          };
        }

        request(options, function (error, response, body) {
          if (response && response.statusCode === 404) {
            const result = {
              message: "Webservice não foi encontrado",
              error: response.statusCode + " - " + response.statusMessage,
            };

            reject(result);
          }
          if (error) {
            const result = {
              message: "Verifique se o webservice está online: " + url,
              error: error["message"],
            };

            if (result.error.code === "ECONNRESET") {
              setTimeout(() => {
                if (webserviceRetry) {
                  webServiceRequest(
                    xmlEnveloped,
                    url,
                    soapAction,
                    certificatePath,
                    certificatePassword
                  );
                } else {
                  resolve(result);
                }
              }, 20000);
            } else {
              reject(result);
            }
          }
          resolve(response);
        });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

function webServiceRequestSOAP(xmlData, object) {
  try {
    return new Promise((resolve, reject) => {
      try {
        const xmlEnveloped = xmlData.soapEnvelop;
        const url = xmlData.url;
        const soapAction = xmlData.soapAction;
        const certificatePath = object.config.diretorioDoCertificado;
        const certificatePassword = object.config.senhaDoCertificado;
        const webserviceRetry = object.config.insistirNoWebservice;

        var args = { xml: xmlEnveloped };
        soap.createClient(url, {}, function (err, client) {
          switch (object.config.acao) {
            case 'enviarLoteRps':
              client.AbrasfService.AbrasfPort.RecepcionarLoteRps(
                args,
                function (err, result) {
                  if (err !== null) {
                    reject(err);
                  }

                  if (result.RecepcionarLoteRpsResult) {
                    resolve(result.RecepcionarLoteRpsResult);
                  } else {
                    resolve({ error: 'Erro no servidor' });
                  }
                }
              );
              break;
              case 'enviarLoteRpsSincrono':
                client.AbrasfService.AbrasfPort.RecepcionarLoteRpsSincrono(
                  args,
                  function (err, result) {
                    if (err !== null) {
                      reject(err);
                    }

                    console.log(result);
  
                    if (result.RecepcionarLoteRpsSincronoResult) {
                      resolve(result.RecepcionarLoteRpsSincronoResult);
                    } else {
                      resolve({ error: 'Erro no servidor' });
                    }
                  }
                );
                break;
            case 'gerarNfse':
              client.AbrasfService.AbrasfPort.GerarNfse(
                args,
                function (err, result) {
                  if (err !== null) {
                    reject(err);
                  }

                  if (result.GerarNfseResult) {
                    resolve(result.GerarNfseResult);
                  } else {
                    resolve({ error: 'Erro no servidor' });
                  }
                }
              );
              break;
            case 'consultarLoteRps':
              client.AbrasfService.AbrasfPort.ConsultarLoteRps(
                args,
                function (err, result) {
                  if (err !== null) {
                    reject(err);
                  }
        
                  if (result.ConsultarLoteRpsResult) {
                    resolve(result.ConsultarLoteRpsResult);
                  } else {
                    resolve({ error: 'Erro no servidor' });
                  }
                }
              );
              break;
            default:
              console.log(object.config.acao);
              const result = {
                message: 'Ação não configurada para envio de SOAP',
                error: 'Ação não configurada para envio de SOAP'
              };
              reject(result);
              break;
          }
        });
      } catch (error) {
        console.error(error);
        reject(error);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  webServiceRequestREST,
  webServiceRequestSOAP,
};
