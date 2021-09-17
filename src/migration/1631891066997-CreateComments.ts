import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateComments1631891066997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'comments',
            columns: [
                { name: 'id', isGenerated: true, type: 'int', generationStrategy: 'increment', isPrimary: true },
                { name: 'userId', type: 'int' },
                { name: 'postId', type: 'int' },
                { name: 'content', type: 'text' }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('comments')
    }

}
