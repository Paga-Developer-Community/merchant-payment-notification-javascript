const IntegrationService = require("./integrationService.model");

exports.createIntegrationService = async function(data) {
  try {
    const { service } = data;
    const newIntegrationService = new IntegrationService({
      service
    });
    const validIntegrationService = await IntegrationService.exists({
      service
    });

    if (validIntegrationService) {
      return {
        error: true,
        msg: `Integration service ${service} already exist`
      };
    }
    // newIntegrationService.setService(service);
    await newIntegrationService.save();
    return {
      error: false,
      message: `${service} successfully created `
    };
  } catch (error) {
    throw new Error(error);
  }
};

exports.getIntegrationServices = async function(data) {
  try {
    const { isTest } = data;

    const integrationServices = await IntegrationService.find(
      { isTest },
      "service"
    );
    const listOfIntegrationServices = integrationServices.map(
      ({ service }) => service
    );
    return {
      error: false,
      message: listOfIntegrationServices
    };
  } catch (error) {
    throw new Error(error);
  }
};
