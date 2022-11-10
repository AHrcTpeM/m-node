import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginateType } from '../people/interfaces/interface';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: {
            allOf: [
              { $ref: getSchemaPath(PaginateType) },
              {
                properties: {
                  results: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            ],
          },
        },
      },
    }),
  );
};
