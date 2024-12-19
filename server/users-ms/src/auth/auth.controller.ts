import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login-user.dto';
import { User } from '@prisma/client';

@Controller()
export class AuthController {
  httpService: any;
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() { email, password }: LoginDto) {
    // console.log('Microservicio: Procesando login para:', email);
    return this.authService.login(email, password);
  }
  @MessagePattern('validate_token')
  async validateToken(@Payload() token: string): Promise<User | null> {
    // console.log('Microservicio: Validando token');
    return this.authService.validateToken(token);
  }

  
    // @Post('callback/:provider')
    // async callbackProvider(
    //   @Param('provider') provider: string,
    //   @Req() req: Request,
    //   @Res() res: Response,
    // ) {
    //   try {
    //     const { code } = req.body;
  
    //     if (!code) {
    //       throw new HttpException('Code not provided', HttpStatus.BAD_REQUEST);
    //     }
  
    //     let accessToken: string;
    //     let userInfo: any;
  
    //     switch (provider) {
    //       case 'google':
    //         accessToken = await this.exchangeCodeForAccessTokenGoogle(code);
    //         userInfo = await this.getUserInfoGoogle(accessToken);
    //         break;
  
    //       case 'github':
    //         accessToken = await this.exchangeCodeForAccessTokenGitHub(code);
    //         userInfo = await this.getUserInfoGitHub(accessToken);
    //         break;
  
    //       case 'facebook':
    //         accessToken = await this.exchangeCodeForAccessTokenFacebook(code);
    //         userInfo = await this.getUserInfoFacebook(accessToken);
    //         break;
  
    //       default:
    //         throw new HttpException('Provider not supported', HttpStatus.BAD_REQUEST);
    //     }
  
    //     const user = await this.handleUser(userInfo);
  
    //     return res.status(HttpStatus.OK).json({ user });
    //   } catch (error) {
    //     console.error(error);
    //     return res
    //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //       .json({ error: error.message });
    //   }
    // }
  
    // private async exchangeCodeForAccessTokenGoogle(code: string): Promise<string> {
    //   const { data } = await axios.post('https://oauth2.googleapis.com/token', {
    //     code,
    //     client_id: process.env.GOOGLE_CLIENT_ID,
    //     client_secret: process.env.GOOGLE_CLIENT_SECRET,
    //     redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    //     grant_type: 'authorization_code',
    //   });
    //   return data.access_token;
    // }
  
    // private async getUserInfoGoogle(accessToken: string): Promise<any> {
    //   const { data } = await axios.get(
    //     'https://www.googleapis.com/oauth2/v3/userinfo',
    //     {
    //       headers: { Authorization: `Bearer ${accessToken}` },
    //     },
    //   );
    //   return data;
    // }
  
    // private async exchangeCodeForAccessTokenGitHub(code: string): Promise<string> {
    //   const { data } = await axios.post(
    //     'https://github.com/login/oauth/access_token',
    //     {
    //       code,
    //       client_id: process.env.GITHUB_CLIENT_ID,
    //       client_secret: process.env.GITHUB_CLIENT_SECRET,
    //     },
    //     { headers: { Accept: 'application/json' } },
    //   );
    //   return data.access_token;
    // }
  
    // private async getUserInfoGitHub(accessToken: string): Promise<any> {
    //   const { data } = await axios.get('https://api.github.com/user', {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   });
    //   return data;
    // }
  
    // private async exchangeCodeForAccessTokenFacebook(code: string): Promise<string> {
    //   const { data } = await axios.get(
    //     `https://graph.facebook.com/v12.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`,
    //   );
    //   return data.access_token;
    // }
  
    // private async getUserInfoFacebook(accessToken: string): Promise<any> {
    //   const { data } = await axios.get(
    //     `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`,
    //   );
    //   return data;
    // }
  
    // private async handleUser(userInfo: any): Promise<any> {
    //   // manejar el usuario:
    //   // - Buscarlo en la base de datos.
    //   // - Registrarlo si no existe.
    //   // - Actualizar datos si es necesario.
    //   // Retorna un objeto de usuario
    //   return {
    //     id: userInfo.id,
    //     email: userInfo.email,
    //     name: userInfo.name,
    //   };
    // }
}
