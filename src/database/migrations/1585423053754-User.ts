import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class User1585423053754 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
        isNullable: false
      },
      {
        name: 'email',
        type: 'varchar',
        length: '100',
        isNullable: false,
        isUnique: true
      },
      {
        name: 'password',
        type: 'varchar',
        length: '100',
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'datetime',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'datetime',
        isNullable: false,
        default: 'now()',
      },
    ]
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table.name);
  }
}
