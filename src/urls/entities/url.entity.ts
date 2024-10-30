import { Column, Entity, JoinColumn, PrimaryColumn } from 'typeorm';
import { DefaultEntity } from '../../common/entities/default.entity';

@Entity('urls')
export class Url extends DefaultEntity {
  @PrimaryColumn()
  @JoinColumn({ name: 'short_url_id' })
  shortUrlId: string;

  @Column()
  @JoinColumn({ name: 'original_url' })
  originalUrl: string;

  @Column({ nullable: true })
  @JoinColumn({ name: 'password' })
  password: string;

  @Column()
  @JoinColumn({ name: 'expired_at' })
  expiredAt: Date;
}
