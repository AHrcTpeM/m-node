import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ValidationPipeMy implements PipeTransform {
    private type;
    constructor(type: any);
    transform(value: string, metadata: ArgumentMetadata): string;
}
