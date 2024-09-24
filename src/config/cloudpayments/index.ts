import ClientService, { TaxationSystem } from 'cloudpayments';

export const client = new ClientService({
  privateKey: process.env.CLOUDPAYMENTS_PRIVATE_KEY,
  publicId: process.env.CLOUDPAYMENTS_PUBLIC_ID,
  org: {
    inn: parseInt(process.env.CLOUDPAYMENTS_INN),
    taxationSystem: TaxationSystem.GENERAL,
  },
});
