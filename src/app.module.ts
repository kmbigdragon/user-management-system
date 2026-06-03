import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { CorsMiddleware } from './middlewares/cors/cors.middleware';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';

import databaseConfig from './config/database.config';

@Module({
  imports: [ConfigModule.forRoot({ load: [databaseConfig] }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
