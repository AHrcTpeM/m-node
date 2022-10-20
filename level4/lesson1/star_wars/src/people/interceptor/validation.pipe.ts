import { PipeTransform, Injectable, ArgumentMetadata, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ValidationPipeMy implements PipeTransform {
    private type: string;

    constructor(type) {
        this.type = type;
    }
    
  transform(value: string, metadata: ArgumentMetadata) {
    const url = this.type === 's3' ?
                `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` :
                `http://${process.env.HOST}:${process.env.PORT}/`;
     
    const regexp = new RegExp(url);
    const bool = value === '' ? true: regexp.test(value); //при пустой строке не делать валидацию
    if (!bool) throw new HttpException("Wrong image address", HttpStatus.BAD_REQUEST);
    return value;
  }
}