import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class ExceptionsLogger implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
