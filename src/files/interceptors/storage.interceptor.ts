import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

/**
 * This interceptor get the file storage configuration from env (cloud or local)
 * then adds the value to the post request body.
 */
@Injectable()
export class StorageInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    request.headers['fileStorage'] =
      this.configService.get<string>('FILE_STORAGE');
    return next.handle();
  }
}
