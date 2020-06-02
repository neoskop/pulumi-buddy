import { ReadResponse } from '@pulumi-utils/grpc';

const DELETE_RESPONSE = new ReadResponse();
DELETE_RESPONSE.setId('');

export { DELETE_RESPONSE };
