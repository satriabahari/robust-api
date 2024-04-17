import { Module } from '@nestjs/common';
import { MerchandiseService } from './merchandise.service';
import { MerchandiseController } from './merchandise.controller';

@Module({
  providers: [MerchandiseService],
  controllers: [MerchandiseController],
})
export class MerchandiseModule {}
