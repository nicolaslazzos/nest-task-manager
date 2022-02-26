import { NestInterceptor, ExecutionContext, Injectable, CallHandler } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { map } from 'rxjs/operators';

// this interceptor is for applying the class-transformer transformations decorators

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(map(data => instanceToPlain(data)));
  }
}