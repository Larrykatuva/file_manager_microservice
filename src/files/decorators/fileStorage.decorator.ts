import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const FileStorageDecorator = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.headers['fileStorage'];
  },
);
