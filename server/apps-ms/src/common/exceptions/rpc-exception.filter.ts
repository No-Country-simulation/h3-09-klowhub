import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { isNumber } from 'class-validator';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const rpcError = exception.getError();

    // Si rpcError es un objeto que contiene 'status' y 'message', manejarlo adecuadamente
    if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {
      const { status, message } = rpcError;
      if (isNumber(status)) {
        return response.status(status).json({ status, message });
      } else {
        console.error('El valor del statusno es un número');
      }
     
    }

    // Si el error no es un objeto esperado, se devuelve un mensaje genérico
    console.log(rpcError); // Aquí puedes ver el detalle del error en el servidor
    response.status(500).json({
      status: 'error',
      message: rpcError || 'Internal Server Error',
    });
  }
}
