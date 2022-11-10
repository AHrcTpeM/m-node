import { genSalt, hash }  from 'bcrypt';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Factory, Seeder } from 'typeorm-seeding';

import { Users } from '../../users/entities/user.entity';
import { Role } from '../../auth/roles/role.enum';

const SALT_ROUNDS = 12;

@Injectable()
export default class FilmsSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const users = [{ username: 'john', password: await hash('changeme', await genSalt()) },
                   { username: 'chris', password: await hash('secret', await genSalt()) },
                   { username: 'maria', password: await hash('guess', await genSalt()) },
                   { username: 'admin', password: await hash('admin', await genSalt()), roles: Role.Admin }];
    await connection
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values(users)
      .execute();
  }
}
