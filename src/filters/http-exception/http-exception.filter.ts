import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException, Error)
export class HttpExceptionFilter implements ExceptionFilter<HttpException | Error> {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : 'Internal server error';

    let message: string | string[];

    if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
      const resObj = exceptionResponse as { message?: string | string[] };
      message = resObj.message || JSON.stringify(exceptionResponse);
    } else {
      message = exceptionResponse;
    }

    this.logger.error(
      `[${request.method}] ${request.url} | Status: ${status} | Error: ${JSON.stringify(message)}`,
      exception instanceof Error && status >= 500 ? exception.stack : '',
    );

    response.status(status).json({
      statusCode: status,
      message: message,
      error: exception.name || 'Error',
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }
}
