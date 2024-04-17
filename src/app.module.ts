import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { MembershipModule } from './membership/membership.module';
import { MerchandiseModule } from './merchandise/merchandise.module';
import { TrainingModule } from './training/training.module';

@Module({
  imports: [
    CommonModule,
    UserModule,
    MembershipModule,
    MerchandiseModule,
    TrainingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
